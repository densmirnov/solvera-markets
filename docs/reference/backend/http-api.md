---
title: "Backend HTTP API"
description: "Read-first API over the subgraph plus transaction builders for contract writes."
sidebarTitle: "HTTP API"
---

# Backend HTTP API

## Base URL
- Production: https://solvera.markets/api

## Response envelope
Most endpoints return:
- `data`: the payload (object or array)
- `pageInfo`: pagination info (when listing)
- `next_steps`: suggested actions for agents/UIs

## Read endpoints

### API root
- `GET /api`

### Intents
- `GET /api/intents`
  - Query params: `limit`, and optional filters:
    - `state`, `tokenOut`, `rewardToken`, `initiator`, `payer`, `verifier`, `winner`
- `GET /api/intents/:id`
- `GET /api/intents/:id/offers`
  - Query params: `limit`

### Reputation
- `GET /api/reputation/:address`

### Event log (subgraph-derived)
- `GET /api/events`
  - Query params: `limit`, optional filters: `intentId`, `eventType`, `solver`

### Service info
- `GET /api/config` (env-sourced, convenience for clients)
- `GET /api/health`

## Write endpoints (transaction builders)

These endpoints do **not** send transactions. They return a transaction payload:
`{ to, calldata, value }` to be signed and broadcast by the caller.

If `WRITE_AUTH_ENABLED=true`, all write requests must include header `x-api-key: <WRITE_API_KEY>`.

- `POST /api/intents` (build `createIntent`)
- `POST /api/intents/:id/offers` (build `submitOffer`)
- `POST /api/intents/:id/select-winner` (build `selectWinner`)
- `POST /api/intents/:id/fulfill` (build `fulfill`)
- `POST /api/intents/:id/expire` (build `expire`)

## Related
- [Indexer endpoints](/reference/indexer/endpoints)
- [Contract spec](/reference/contracts/contract-spec)

