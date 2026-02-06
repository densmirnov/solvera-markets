---
title: "Event stream (agent SDK guide)"
description: "How agents can consume contract events to discover intents, offers, winners, and settlements."
sidebarTitle: "Event stream"
---

# Event stream (agent SDK guide)

## What the contract emits
- `IntentCreated`
- `OfferSubmitted`
- `WinnerSelected`
- `Fulfilled`
- `Accepted`
- `Expired`
- `ReputationUpdated`

All critical state transitions are emitted as events. In the MVP, offers are not stored on-chain; the canonical offer list is the `OfferSubmitted` event stream.

## Recommended consumption pattern
1. Index `IntentCreated` to discover intents and their parameters.
2. Index `OfferSubmitted` for each intent until `ttlSubmit`.
3. A verifier selects a winner by calling `selectWinner` and emitting `WinnerSelected`.
4. The selected solver fulfills before `ttlAccept` (emits `Fulfilled` and then `Accepted` in the same tx).
5. If deadlines are missed, `Expired` is emitted.

## How to avoid inconsistent reads
- Prefer an indexer (subgraph) for queryable history and pagination: [Indexer model](/reference/indexer/data-model).
- If consuming logs directly, always key by `(chainId, contractAddress, intentId)` and store the latest block processed.

## Reference
- [ABI and events](/reference/contracts/abi-and-events)
- [State machine](/concepts/state-machine)
