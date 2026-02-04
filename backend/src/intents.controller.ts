import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { SubgraphService } from "./subgraph.service.js";
import { TxBuilderService } from "./tx-builder.service.js";

interface NextStep {
  role?: "solver" | "verifier" | "payer";
  action: string;
  description?: string;
  deadline?: number;
  network?: string;
}

interface PageInfo {
  cursor: string | null;
  hasNext: boolean;
}

@Controller("api")
export class IntentsController {
  constructor(
    private readonly subgraph: SubgraphService,
    private readonly txBuilder: TxBuilderService,
  ) {}

  @Get()
  async apiRoot() {
    return {
      status: "ok",
      message: "Solvera API v0.1",
      endpoints: [
        "/api/intents",
        "/api/intents/:id",
        "/api/intents/:id/offers",
        "/api/events",
        "/api/config",
        "/api/health",
      ],
    };
  }

  @Get("/intents")
  async listIntents(@Query() query: Record<string, string>) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const where: Record<string, string> = {};
    [
      "state",
      "tokenOut",
      "rewardToken",
      "initiator",
      "payer",
      "verifier",
      "winner",
    ].forEach((key) => {
      if (query[key]) where[key] = query[key];
    });

    const gql = `
      query Intents($limit: Int!, $where: Intent_filter) {
        intents(first: $limit, orderBy: updatedAt, orderDirection: desc, where: $where) {
          id
          state
          tokenOut
          rewardToken
          minAmountOut
          rewardAmount
          payer
          initiator
          verifier
          winner
          winnerAmountOut
          bondAmount
          updatedAt
          txHash
        }
      }
    `;

    const payload = await this.subgraph.query<{
      intents: Record<string, unknown>[];
    }>(gql, {
      limit,
      where,
    });
    const intents = payload.intents || [];
    const pageInfo: PageInfo = {
      cursor: intents.length ? String(intents[intents.length - 1].id) : null,
      hasNext: intents.length === limit,
    };
    const nextSteps: NextStep[] = [
      {
        role: "solver",
        action: "submit_offer",
        description: "Submit an offer if you can deliver tokenOut.",
      },
    ];
    return { data: intents, pageInfo, next_steps: nextSteps };
  }

  @Get("/intents/:id")
  async getIntent(@Param("id") id: string) {
    const gql = `
      query Intent($id: ID!) {
        intent(id: $id) {
          id
          state
          tokenOut
          rewardToken
          minAmountOut
          rewardAmount
          payer
          initiator
          verifier
          winner
          winnerAmountOut
          bondAmount
          createdAt
          updatedAt
          txHash
        }
      }
    `;
    const payload = await this.subgraph.query<{
      intent: Record<string, unknown> | null;
    }>(gql, {
      id,
    });
    const intent = payload.intent;
    const nextSteps = this.nextStepsForIntent(intent);
    return { data: intent, next_steps: nextSteps };
  }

  @Get("/intents/:id/offers")
  async getOffers(
    @Param("id") id: string,
    @Query() query: Record<string, string>,
  ) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const gql = `
      query Offers($intent: ID!, $limit: Int!) {
        offers(first: $limit, orderBy: timestamp, orderDirection: desc, where: { intent: $intent }) {
          id
          solver
          amountOut
          timestamp
          txHash
        }
      }
    `;
    const payload = await this.subgraph.query<{
      offers: Record<string, unknown>[];
    }>(gql, {
      intent: id,
      limit,
    });
    const offers = payload.offers || [];
    const pageInfo: PageInfo = {
      cursor: offers.length ? String(offers[offers.length - 1].id) : null,
      hasNext: offers.length === limit,
    };
    const nextSteps: NextStep[] = [
      {
        role: "verifier",
        action: "select_winner",
        description: "Pick a solver before ttlSubmit.",
      },
    ];
    return { data: offers, pageInfo, next_steps: nextSteps };
  }

  @Get("/reputation/:address")
  async getReputation(@Param("address") address: string) {
    const gql = `
      query Reputation($id: ID!) {
        reputation(id: $id) {
          id
          value
          updatedAt
          txHash
        }
      }
    `;
    const payload = await this.subgraph.query<{
      reputation: Record<string, unknown> | null;
    }>(gql, {
      id: address.toLowerCase(),
    });
    return {
      data: payload.reputation,
      next_steps: [
        {
          role: "solver",
          action: "submit_offer",
          description: "Improve reputation by winning and fulfilling intents.",
        },
      ],
    };
  }

  @Get("/events")
  async getEvents(@Query() query: Record<string, string>) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const where: Record<string, string> = {};
    if (query.intentId) where.intent = query.intentId;
    if (query.eventType) where.eventType = query.eventType;
    if (query.solver) where.solver = query.solver;

    const gql = `
      query Events($limit: Int!, $where: EventLog_filter) {
        eventLogs(first: $limit, orderBy: blockTimestamp, orderDirection: desc, where: $where) {
          id
          eventType
          intent { id }
          solver
          amountOut
          feeAmount
          refundAmount
          bondAmount
          rewardAmount
          reason
          blockNumber
          blockTimestamp
          txHash
        }
      }
    `;
    const payload = await this.subgraph.query<{
      eventLogs: Record<string, unknown>[];
    }>(gql, {
      limit,
      where,
    });
    const events = payload.eventLogs || [];
    const pageInfo: PageInfo = {
      cursor: events.length ? String(events[events.length - 1].id) : null,
      hasNext: events.length === limit,
    };
    return { data: events, pageInfo, next_steps: [] };
  }

  @Get("/config")
  async getConfig() {
    return {
      data: {
        contractAddress: process.env.CONTRACT_ADDRESS || null,
        network: process.env.NETWORK_NAME || null,
        chainId: process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : null,
        feeBpsOnAccept: process.env.FEE_BPS_ON_ACCEPT || null,
        fixedFeeOnExpire: process.env.FIXED_FEE_ON_EXPIRE || null,
        bondBpsOfReward: process.env.BOND_BPS_OF_REWARD || null,
        bondMin: process.env.BOND_MIN || null,
      },
      next_steps: [],
    };
  }

  @Get("/health")
  async getHealth() {
    return {
      data: {
        status: "ok",
        subgraphUrl: process.env.SUBGRAPH_URL || null,
        timestamp: new Date().toISOString(),
      },
      next_steps: [],
    };
  }

  @Post("/intents")
  async buildCreateIntent(@Body() body: Record<string, unknown>) {
    const required = [
      "tokenOut",
      "minAmountOut",
      "rewardToken",
      "rewardAmount",
      "payer",
      "initiator",
      "verifier",
      "ttlSubmit",
      "ttlAccept",
    ];
    this.requireFields(body, required);

    const data = this.txBuilder.buildCreateIntent({
      tokenOut: String(body.tokenOut),
      minAmountOut: String(body.minAmountOut),
      rewardToken: String(body.rewardToken),
      rewardAmount: String(body.rewardAmount),
      payer: String(body.payer),
      initiator: String(body.initiator),
      verifier: String(body.verifier),
      ttlSubmit: Number(body.ttlSubmit),
      ttlAccept: Number(body.ttlAccept),
    });
    return {
      data,
      next_steps: [
        {
          action: "sign_and_send",
          network: process.env.NETWORK_NAME || "base",
        },
      ],
    };
  }

  @Post("/intents/:id/offers")
  async buildSubmitOffer(
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    this.requireFields(body, ["amountOut"]);
    const data = this.txBuilder.buildSubmitOffer(id, String(body.amountOut));
    return {
      data,
      next_steps: [
        {
          action: "sign_and_send",
          network: process.env.NETWORK_NAME || "base",
        },
      ],
    };
  }

  @Post("/intents/:id/select-winner")
  async buildSelectWinner(
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    this.requireFields(body, ["solver", "amountOut"]);
    const data = this.txBuilder.buildSelectWinner(
      id,
      String(body.solver),
      String(body.amountOut),
    );
    return {
      data,
      next_steps: [
        {
          action: "sign_and_send",
          network: process.env.NETWORK_NAME || "base",
        },
      ],
    };
  }

  @Post("/intents/:id/fulfill")
  async buildFulfill(@Param("id") id: string) {
    const data = this.txBuilder.buildFulfill(id);
    return {
      data,
      next_steps: [
        {
          action: "sign_and_send",
          network: process.env.NETWORK_NAME || "base",
        },
      ],
    };
  }

  @Post("/intents/:id/expire")
  async buildExpire(@Param("id") id: string) {
    const data = this.txBuilder.buildExpire(id);
    return {
      data,
      next_steps: [
        {
          action: "sign_and_send",
          network: process.env.NETWORK_NAME || "base",
        },
      ],
    };
  }

  private nextStepsForIntent(
    intent: Record<string, unknown> | null,
  ): NextStep[] {
    const state = typeof intent?.state === "string" ? intent.state : "UNKNOWN";
    if (state === "OPEN") {
      return [
        {
          role: "solver",
          action: "submit_offer",
          description: "Submit an offer before ttlSubmit.",
        },
        {
          role: "verifier",
          action: "select_winner",
          description: "Select a solver before ttlSubmit.",
        },
      ];
    }
    if (state === "SELECTED") {
      return [
        {
          role: "solver",
          action: "fulfill",
          description: "Winner fulfills before ttlAccept.",
        },
      ];
    }
    if (state === "FULFILLED") {
      return [
        {
          role: "payer",
          action: "wait_accept",
          description: "Wait for acceptance on-chain.",
        },
      ];
    }
    return [];
  }

  private requireFields(body: Record<string, unknown>, fields: string[]) {
    const missing = fields.filter(
      (field) => body[field] === undefined || body[field] === null,
    );
    if (missing.length > 0) {
      throw new HttpException(
        {
          error: {
            code: "INVALID_REQUEST",
            message: `Missing fields: ${missing.join(", ")}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
