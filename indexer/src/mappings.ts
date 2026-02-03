import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  Accepted as AcceptedEvent,
  Expired as ExpiredEvent,
  Fulfilled as FulfilledEvent,
  IntentCreated as IntentCreatedEvent,
  OfferSubmitted as OfferSubmittedEvent,
  ReputationUpdated as ReputationUpdatedEvent,
  WinnerSelected as WinnerSelectedEvent,
} from "../generated/IntentMarketplace/IntentMarketplace";
import { EventLog, Intent, Offer, Reputation } from "../generated/schema";

function stateToString(state: i32): string {
  if (state == 0) return "OPEN";
  if (state == 1) return "SELECTED";
  if (state == 2) return "FULFILLED";
  if (state == 3) return "ACCEPTED";
  if (state == 4) return "EXPIRED";
  return "UNKNOWN";
}

function reputationReasonToString(reason: i32): string {
  if (reason == 0) return "ACCEPTED";
  if (reason == 1) return "WINNER_TIMEOUT";
  return "UNKNOWN";
}

function eventId(txHash: Bytes, logIndex: BigInt): string {
  return txHash.toHexString() + "-" + logIndex.toString();
}

function touchIntent(intent: Intent, timestamp: BigInt, txHash: Bytes): void {
  intent.updatedAt = timestamp;
  intent.txHash = txHash;
}

export function handleIntentCreated(event: IntentCreatedEvent): void {
  let id = event.params.id.toHexString();
  let intent = new Intent(id);

  intent.tokenOut = event.params.tokenOut;
  intent.minAmountOut = event.params.minAmountOut;
  intent.rewardToken = event.params.rewardToken;
  intent.rewardAmount = event.params.rewardAmount;
  intent.payer = event.params.payer;
  intent.initiator = event.params.initiator;
  intent.verifier = event.params.verifier;
  intent.ttlSubmit = BigInt.fromU64(event.params.ttlSubmit);
  intent.ttlAccept = BigInt.fromU64(event.params.ttlAccept);
  intent.state = "OPEN";
  intent.createdAt = event.block.timestamp;
  intent.updatedAt = event.block.timestamp;
  intent.txHash = event.transaction.hash;
  intent.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = id;
  log.eventType = "IntentCreated";
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleOfferSubmitted(event: OfferSubmittedEvent): void {
  let intentId = event.params.id.toHexString();
  let offerId =
    intentId +
    "-" +
    event.transaction.hash.toHexString() +
    "-" +
    event.logIndex.toString();

  let offer = new Offer(offerId);
  offer.intent = intentId;
  offer.solver = event.params.solver;
  offer.amountOut = event.params.amountOut;
  offer.timestamp = event.params.timestamp;
  offer.txHash = event.transaction.hash;
  offer.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = intentId;
  log.eventType = "OfferSubmitted";
  log.solver = event.params.solver;
  log.amountOut = event.params.amountOut;
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleWinnerSelected(event: WinnerSelectedEvent): void {
  let id = event.params.id.toHexString();
  let intent = Intent.load(id);
  if (intent == null) {
    intent = new Intent(id);
    intent.state = "SELECTED";
    intent.createdAt = event.block.timestamp;
  }

  intent.winner = event.params.solver;
  intent.winnerAmountOut = event.params.amountOut;
  intent.bondAmount = event.params.bondAmount;
  intent.state = "SELECTED";
  touchIntent(intent, event.block.timestamp, event.transaction.hash);
  intent.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = id;
  log.eventType = "WinnerSelected";
  log.solver = event.params.solver;
  log.amountOut = event.params.amountOut;
  log.bondAmount = event.params.bondAmount;
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleFulfilled(event: FulfilledEvent): void {
  let id = event.params.id.toHexString();
  let intent = Intent.load(id);
  if (intent == null) {
    intent = new Intent(id);
    intent.state = "FULFILLED";
    intent.createdAt = event.block.timestamp;
  }

  intent.state = "FULFILLED";
  touchIntent(intent, event.block.timestamp, event.transaction.hash);
  intent.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = id;
  log.eventType = "Fulfilled";
  log.solver = event.params.solver;
  log.amountOut = event.params.amountOut;
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleAccepted(event: AcceptedEvent): void {
  let id = event.params.id.toHexString();
  let intent = Intent.load(id);
  if (intent == null) {
    intent = new Intent(id);
    intent.state = "ACCEPTED";
    intent.createdAt = event.block.timestamp;
  }

  intent.state = "ACCEPTED";
  touchIntent(intent, event.block.timestamp, event.transaction.hash);
  intent.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = id;
  log.eventType = "Accepted";
  log.solver = event.params.solver;
  log.rewardAmount = event.params.rewardAmount;
  log.feeAmount = event.params.feeAmount;
  log.bondAmount = event.params.bondAmount;
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleExpired(event: ExpiredEvent): void {
  let id = event.params.id.toHexString();
  let intent = Intent.load(id);
  if (intent == null) {
    intent = new Intent(id);
    intent.state = "EXPIRED";
    intent.createdAt = event.block.timestamp;
  }

  intent.state = "EXPIRED";
  touchIntent(intent, event.block.timestamp, event.transaction.hash);
  intent.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.intent = id;
  log.eventType = "Expired";
  log.reason = stateToString(event.params.fromState);
  log.feeAmount = event.params.feeAmount;
  log.refundAmount = event.params.refundAmount;
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}

export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  let id = event.params.solver.toHexString();
  let rep = Reputation.load(id);
  if (rep == null) {
    rep = new Reputation(id);
    rep.value = BigInt.fromI32(0);
  }
  rep.value = event.params.newValue;
  rep.updatedAt = event.block.timestamp;
  rep.txHash = event.transaction.hash;
  rep.save();

  let log = new EventLog(eventId(event.transaction.hash, event.logIndex));
  log.eventType = "ReputationUpdated";
  log.solver = event.params.solver;
  log.reason = reputationReasonToString(event.params.reason);
  log.blockNumber = event.block.number;
  log.blockTimestamp = event.block.timestamp;
  log.txHash = event.transaction.hash;
  log.save();
}
