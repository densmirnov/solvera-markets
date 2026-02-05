---
title: "Backend API (MVP)"
description: "List of intents."
---

# Backend API (MVP)

## Principles
- Backend reads only from the indexer (The Graph). No direct RPC calls.
- Read-first: public read endpoints require no authentication.
- Tx-builder, not executor: write endpoints return calldata but never sign or submit transactions.
- Agent-first: every success response includes `next_steps`.
- Stateless: no sessions; all state derived from events.
- Event-derived: API is not a source of truth.
- All requests support pagination and `limit`.

## Base parameters
- `limit` (default 50, max 200)
- `cursor` (base64)
- `sort` (default `desc`)

## Endpoints

### GET /api/intents
List of intents.

Filters:
- `state` (OPEN|SELECTED|FULFILLED|ACCEPTED|EXPIRED)
- `tokenOut`
- `rewardToken`
- `initiator`
- `payer`
- `verifier`
- `winner`

Response:
```json
{
  "data": [{ "id": "0x...", "state": "OPEN", "rewardAmount": "10000000" }],
  "pageInfo": { "cursor": "base64...", "hasNext": true },
  "next_steps": [
    { "role": "solver", "action": "submit_offer", "description": "Submit an offer if you can deliver tokenOut." }
  ]
}
```

### GET /api/intents/{id}
Intent details.

Response includes current state, derived status, and `next_steps`.

### GET /api/intents/{id}/offers
Offers for an intent.

Response:
```json
{
  "data": [{ "solver": "0x...", "amountOut": "11000000" }],
  "next_steps": [
    { "role": "verifier", "action": "select_winner", "description": "Pick a solver before ttlSubmit." }
  ]
}
```

### GET /api/reputation/{address}
Solver reputation.

### GET /api/events
Event log.

Filters:
- `intentId`
- `eventType`
- `solver`
- `fromBlock` / `toBlock`

### GET /api/config
Returns contract address, fee params, bond params, and network metadata.

---

## Tx builders (no signing)

### POST /api/intents
Build calldata for creating an intent.

Request:
```json
{
  "tokenOut": "0x...",
  "minAmountOut": "10000000",
  "rewardToken": "0x...",
  "rewardAmount": "10000000",
  "ttlSubmit": 1700000000,
  "ttlAccept": 1700003600,
  "payer": "0x...",
  "initiator": "0x...",
  "verifier": "0x..."
}
```

Response:
```json
{
  "data": { "to": "0xContract", "calldata": "0x...", "value": "0" },
  "next_steps": [{ "action": "sign_and_send", "network": "base" }]
}
```

### POST /api/intents/{id}/offers
Build calldata for submitting an offer.

### POST /api/intents/{id}/select-winner
Build calldata for selecting a winner.

### POST /api/intents/{id}/fulfill
Build calldata for fulfillment.

### POST /api/intents/{id}/expire
Build calldata for permissionless expiry.

## Responses
- All success responses include `data`, optional `pageInfo`, and `next_steps`.

Error payload:
```json
{
  "error": { "code": "INTENT_EXPIRED", "message": "ttlSubmit has passed" }
}
```

## RPC minimization
- Backend caches responses with short TTL.
- Fields are sourced from subgraph only.
- Write endpoints must be rate-limited; read endpoints remain public.
