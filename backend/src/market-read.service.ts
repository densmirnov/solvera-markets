import { Injectable } from "@nestjs/common";
import {
  Contract,
  Interface,
  JsonRpcProvider,
  type LogDescription,
  type Log,
  type Result,
} from "ethers";

const DEFAULT_CACHE_TTL_MS = 5000;
const DEFAULT_STATUS_RPC_URL = "https://public.sepolia.rpc.status.network";
const DEFAULT_STATUS_START_BLOCK = 18800150;
const DEFAULT_LOG_BLOCK_SPAN = 2000;

const INTENT_STATE = ["OPEN", "SELECTED", "FULFILLED", "ACCEPTED", "EXPIRED"] as const;

const INTENT_MARKETPLACE_READ_ABI = [
  "function getIntent(bytes32 id) view returns ((address tokenOut,uint256 minAmountOut,address rewardToken,uint256 rewardAmount,address payer,address initiator,address verifier,uint64 ttlSubmit,uint64 ttlAccept,uint8 state,address winner,uint256 winnerAmountOut,uint256 bondAmount))",
  "function reputation(address solver) view returns (int256)",
  "event IntentCreated(bytes32 indexed id,address indexed payer,address indexed initiator,address verifier,address tokenOut,uint256 minAmountOut,address rewardToken,uint256 rewardAmount,uint64 ttlSubmit,uint64 ttlAccept)",
  "event OfferSubmitted(bytes32 indexed id,address indexed solver,uint256 amountOut,uint256 timestamp)",
  "event WinnerSelected(bytes32 indexed id,address indexed solver,uint256 amountOut,uint256 bondAmount)",
  "event Fulfilled(bytes32 indexed id,address indexed solver,uint256 amountOut)",
  "event Accepted(bytes32 indexed id,address indexed solver,uint256 rewardAmount,uint256 feeAmount,uint256 bondAmount)",
  "event Expired(bytes32 indexed id,uint8 indexed fromState,uint256 feeAmount,uint256 refundAmount)",
  "event ReputationUpdated(address indexed solver,int256 newValue,uint8 reason)",
] as const;

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export interface IntentRecord extends Record<string, unknown> {
  id: string;
  state: string;
  tokenOut: string;
  rewardToken: string;
  minAmountOut: string;
  rewardAmount: string;
  payer: string;
  initiator: string;
  verifier: string;
  winner: string;
  winnerAmountOut: string;
  bondAmount: string;
  createdAt: string;
  updatedAt: string;
  txHash: string;
}

export interface OfferRecord extends Record<string, unknown> {
  id: string;
  intent: string;
  solver: string;
  amountOut: string;
  timestamp: string;
  txHash: string;
}

export interface ReputationRecord extends Record<string, unknown> {
  id: string;
  value: string;
  updatedAt: string;
  txHash: string;
}

export interface EventRecord extends Record<string, unknown> {
  id: string;
  eventType: string;
  intent: { id: string } | null;
  solver: string | null;
  amountOut: string | null;
  feeAmount: string | null;
  refundAmount: string | null;
  bondAmount: string | null;
  rewardAmount: string | null;
  reason: string | null;
  blockNumber: string;
  blockTimestamp: string;
  txHash: string;
}

interface Snapshot {
  intents: IntentRecord[];
  offersByIntent: Map<string, OfferRecord[]>;
  reputations: Map<string, ReputationRecord>;
  events: EventRecord[];
}

type ParsedEventLog = LogDescription & {
  args: Result & Record<string, unknown>;
  blockNumber: number;
  index: number;
  transactionHash: string;
};

@Injectable()
export class MarketReadService {
  private readonly networkName: string;
  private readonly contractAddress: string;
  private readonly rpcUrl: string;
  private readonly startBlock: number;
  private readonly logBlockSpan: number;
  private readonly cache = new Map<string, CacheEntry<unknown>>();
  private readonly iface = new Interface(INTENT_MARKETPLACE_READ_ABI);
  private readonly provider: JsonRpcProvider | null;
  private readonly contract: Contract | null;

  constructor() {
    this.networkName = process.env.NETWORK_NAME || "";
    this.contractAddress = process.env.CONTRACT_ADDRESS || "";
    this.rpcUrl =
      process.env.RPC_URL ||
      (this.networkName === "status-sepolia" ? DEFAULT_STATUS_RPC_URL : "");
    this.startBlock = Number(
      process.env.CONTRACT_START_BLOCK ||
        (this.networkName === "status-sepolia" ? DEFAULT_STATUS_START_BLOCK : 0),
    );
    this.logBlockSpan = Number(
      process.env.RPC_LOG_BLOCK_SPAN || DEFAULT_LOG_BLOCK_SPAN,
    );
    this.provider =
      this.contractAddress && this.rpcUrl
        ? new JsonRpcProvider(this.rpcUrl)
        : null;
    this.contract =
      this.provider && this.contractAddress
        ? new Contract(
            this.contractAddress,
            INTENT_MARKETPLACE_READ_ABI,
            this.provider,
          )
        : null;
  }

  canServeFallback() {
    return Boolean(
      this.networkName === "status-sepolia" &&
        this.provider &&
        this.contract &&
        this.startBlock > 0,
    );
  }

  async listIntents(filters: Record<string, string>, limit: number) {
    const snapshot = await this.snapshot();
    const intents = snapshot.intents
      .filter((intent) => this.matchesIntentFilters(intent, filters))
      .slice(0, limit);
    return intents;
  }

  async getIntent(id: string) {
    const snapshot = await this.snapshot();
    return snapshot.intents.find((intent) => intent.id.toLowerCase() === id.toLowerCase()) || null;
  }

  async getOffers(intentId: string, limit: number) {
    const snapshot = await this.snapshot();
    return (snapshot.offersByIntent.get(intentId.toLowerCase()) || []).slice(0, limit);
  }

  async getReputation(address: string) {
    const snapshot = await this.snapshot();
    return snapshot.reputations.get(address.toLowerCase()) || null;
  }

  async getEvents(filters: Record<string, string>, limit: number) {
    const snapshot = await this.snapshot();
    return snapshot.events
      .filter((event) => {
        if (filters.intentId && event.intent?.id !== filters.intentId) return false;
        if (filters.eventType && event.eventType !== filters.eventType) return false;
        if (filters.solver && event.solver?.toLowerCase() !== filters.solver.toLowerCase()) {
          return false;
        }
        return true;
      })
      .slice(0, limit);
  }

  private async snapshot(): Promise<Snapshot> {
    return this.withCache("status-rpc-snapshot", async () => {
      if (!this.provider || !this.contract) {
        throw new Error("RPC fallback is not configured");
      }

      const logs = await this.loadAllLogs();
      const parsedLogs = logs
        .map((log) => this.tryParseLog(log))
        .filter((log): log is ParsedEventLog => log !== null)
        .sort((left, right) => {
          if (left.blockNumber !== right.blockNumber) {
            return Number(left.blockNumber) - Number(right.blockNumber);
          }
          return Number(left.index) - Number(right.index);
        });

      const blockTimestampCache = new Map<number, string>();
      const createdMeta = new Map<
        string,
        { createdAt: string; updatedAt: string; txHash: string }
      >();
      const offersByIntent = new Map<string, OfferRecord[]>();
      const reputations = new Map<string, ReputationRecord>();
      const events: EventRecord[] = [];

      for (const log of parsedLogs) {
        const timestamp = await this.blockTimestamp(log.blockNumber, blockTimestampCache);
        const event = this.toEventRecord(log, timestamp);
        if (event) {
          events.push(event);
        }

        if (log.fragment.name === "IntentCreated") {
          const id = String(log.args.id).toLowerCase();
          createdMeta.set(id, {
            createdAt: timestamp,
            updatedAt: timestamp,
            txHash: log.transactionHash,
          });
          continue;
        }

        if ("id" in log.args && typeof log.args.id === "string") {
          const id = log.args.id.toLowerCase();
          const meta = createdMeta.get(id);
          if (meta) {
            meta.updatedAt = timestamp;
            meta.txHash = log.transactionHash;
          }
        }

        if (log.fragment.name === "OfferSubmitted") {
          const intentId = String(log.args.id).toLowerCase();
          const offer: OfferRecord = {
            id: `${log.transactionHash}:${log.index}`,
            intent: intentId,
            solver: String(log.args.solver).toLowerCase(),
            amountOut: String(log.args.amountOut),
            timestamp: String(log.args.timestamp),
            txHash: log.transactionHash,
          };
          const bucket = offersByIntent.get(intentId) || [];
          bucket.push(offer);
          offersByIntent.set(intentId, bucket);
          continue;
        }

        if (log.fragment.name === "ReputationUpdated") {
          const solver = String(log.args.solver).toLowerCase();
          reputations.set(solver, {
            id: solver,
            value: String(log.args.newValue),
            updatedAt: timestamp,
            txHash: log.transactionHash,
          });
        }
      }

      const intents = await Promise.all(
        Array.from(createdMeta.entries()).map(async ([id, meta]) => {
          const intent = await this.contract!.getIntent(id);
          return {
            id,
            state: INTENT_STATE[Number(intent.state)] || String(intent.state),
            tokenOut: String(intent.tokenOut).toLowerCase(),
            rewardToken: String(intent.rewardToken).toLowerCase(),
            minAmountOut: String(intent.minAmountOut),
            rewardAmount: String(intent.rewardAmount),
            payer: String(intent.payer).toLowerCase(),
            initiator: String(intent.initiator).toLowerCase(),
            verifier: String(intent.verifier).toLowerCase(),
            winner: String(intent.winner).toLowerCase(),
            winnerAmountOut: String(intent.winnerAmountOut),
            bondAmount: String(intent.bondAmount),
            createdAt: meta.createdAt,
            updatedAt: meta.updatedAt,
            txHash: meta.txHash,
          } satisfies IntentRecord;
        }),
      );

      for (const offerBucket of offersByIntent.values()) {
        offerBucket.sort((left, right) => Number(right.timestamp) - Number(left.timestamp));
      }

      events.sort((left, right) => Number(right.blockTimestamp) - Number(left.blockTimestamp));
      intents.sort((left, right) => Number(right.updatedAt) - Number(left.updatedAt));

      return {
        intents,
        offersByIntent,
        reputations,
        events,
      };
    });
  }

  private async loadAllLogs(): Promise<Log[]> {
    const latestBlock = await this.provider!.getBlockNumber();
    const logs: Log[] = [];

    for (
      let fromBlock = this.startBlock;
      fromBlock <= latestBlock;
      fromBlock += this.logBlockSpan
    ) {
      const toBlock = Math.min(fromBlock + this.logBlockSpan - 1, latestBlock);
      const batch = await this.provider!.getLogs({
        address: this.contractAddress,
        fromBlock,
        toBlock,
      });
      logs.push(...batch);
    }

    return logs;
  }

  private tryParseLog(log: Log): ParsedEventLog | null {
    try {
      const parsed = this.iface.parseLog(log);
      if (!parsed) {
        return null;
      }
      return {
        ...parsed,
        args: parsed.args as Result & Record<string, unknown>,
        blockNumber: Number(log.blockNumber),
        index: Number(log.index),
        transactionHash: log.transactionHash,
      };
    } catch {
      return null;
    }
  }

  private async blockTimestamp(
    blockNumber: number,
    cache: Map<number, string>,
  ): Promise<string> {
    const cached = cache.get(blockNumber);
    if (cached) {
      return cached;
    }

    const block = await this.provider!.getBlock(blockNumber);
    const timestamp = block ? String(block.timestamp) : "0";
    cache.set(blockNumber, timestamp);
    return timestamp;
  }

  private toEventRecord(
    log: ParsedEventLog,
    timestamp: string,
  ): EventRecord | null {
    const eventType = log.fragment.name;
    const intentId = "id" in log.args ? String(log.args.id).toLowerCase() : null;
    const solver =
      "solver" in log.args && typeof log.args.solver === "string"
        ? log.args.solver.toLowerCase()
        : eventType === "ReputationUpdated" && typeof log.args.solver === "string"
          ? log.args.solver.toLowerCase()
          : null;

    return {
      id: `${log.transactionHash}:${log.index}`,
      eventType,
      intent: intentId ? { id: intentId } : null,
      solver,
      amountOut: "amountOut" in log.args ? String(log.args.amountOut) : null,
      feeAmount: "feeAmount" in log.args ? String(log.args.feeAmount) : null,
      refundAmount: "refundAmount" in log.args ? String(log.args.refundAmount) : null,
      bondAmount: "bondAmount" in log.args ? String(log.args.bondAmount) : null,
      rewardAmount: "rewardAmount" in log.args ? String(log.args.rewardAmount) : null,
      reason: "reason" in log.args ? String(log.args.reason) : null,
      blockNumber: String(log.blockNumber),
      blockTimestamp: timestamp,
      txHash: log.transactionHash,
    };
  }

  private matchesIntentFilters(intent: IntentRecord, filters: Record<string, string>) {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const field = intent[key as keyof IntentRecord];
      if (field == null) return false;
      return String(field).toLowerCase() === value.toLowerCase();
    });
  }

  private async withCache<T>(key: string, load: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();
    const ttl = Number(process.env.SUBGRAPH_CACHE_TTL_MS || DEFAULT_CACHE_TTL_MS);

    if (cached && cached.expiresAt > now) {
      return cached.value as T;
    }

    const value = await load();
    this.cache.set(key, { value, expiresAt: now + ttl });
    return value;
  }
}
