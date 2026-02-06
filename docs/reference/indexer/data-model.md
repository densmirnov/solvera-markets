---
title: "Indexer data model"
description: "Subgraph entities and fields produced from IntentMarketplace events (The Graph)."
sidebarTitle: "Data model"
---

# Indexer data model

The subgraph turns on-chain events into a queryable model for the UI and backend API.

## Network
- Network: `base`
- Data source: `IntentMarketplace` at `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A`

## Entities

### Intent
Mutable entity representing the current intent state.
- Key fields: `state`, `tokenOut`, `minAmountOut`, `rewardToken`, `rewardAmount`
- Roles: `payer`, `initiator`, `verifier`, `winner`
- Timing: `ttlSubmit`, `ttlAccept`, `createdAt`, `updatedAt`
- Execution metadata: `txHash`

### Offer
Immutable entity (append-only) derived from `OfferSubmitted`.
- Fields: `intent`, `solver`, `amountOut`, `timestamp`, `txHash`

### Reputation
Mutable reputation value per solver.
- Fields: `value`, `updatedAt`, `txHash`

### EventLog
Immutable normalized event stream for querying.
- Fields: `eventType`, `intent`, `solver`, `amountOut`, `feeAmount`, `refundAmount`, `bondAmount`, `rewardAmount`, `reason`
- Block metadata: `blockNumber`, `blockTimestamp`, `txHash`

## Example queries

### Latest intents
```graphql
query Intents($limit: Int!) {
  intents(first: $limit, orderBy: updatedAt, orderDirection: desc) {
    id
    state
    tokenOut
    minAmountOut
    rewardToken
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
```

### Offers for an intent
```graphql
query Offers($intent: ID!, $limit: Int!) {
  offers(first: $limit, orderBy: timestamp, orderDirection: desc, where: { intent: $intent }) {
    id
    solver
    amountOut
    timestamp
    txHash
  }
}
```

## Related
- [Subgraph endpoints](/reference/indexer/endpoints)
- [Backend HTTP API](/reference/backend/http-api)

