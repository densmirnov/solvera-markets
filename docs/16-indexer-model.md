---
title: "Indexer data model"
description: "Documentation for Indexer data model."
---

# Indexer data model

## Entities

### Intent
- `id`: intent bytes32.
- `tokenOut`, `rewardToken`: token addresses.
- `minAmountOut`, `rewardAmount`: numeric parameters.
- `payer`, `initiator`, `verifier`: role addresses.
- `ttlSubmit`, `ttlAccept`: deadlines.
- `state`: string state (`OPEN`, `SELECTED`, `FULFILLED`, `ACCEPTED`, `EXPIRED`).
- `winner`, `winnerAmountOut`, `bondAmount`.
- `createdAt`, `updatedAt`, `txHash`.

### Offer
- `id`: `${intentId}-${txHash}`.
- `intent`: link to Intent.
- `solver`, `amountOut`, `timestamp`, `txHash`.

### Reputation
- `id`: solver address.
- `value`: current value.
- `updatedAt`, `txHash`.

### EventLog
- `id`: `${txHash}-${logIndex}`.
- `intent`: link to Intent (nullable for events without intent).
- `eventType`: event type.
- `solver`, `amountOut`, `feeAmount`, `refundAmount`, `bondAmount`, `rewardAmount`, `reason`.
- `blockNumber`, `blockTimestamp`, `txHash`.

## Principles
- Indexer performs no RPC reads of contract state.
- All fields are derived deterministically from events.
- Backend reads only from the indexer, never from RPC.
