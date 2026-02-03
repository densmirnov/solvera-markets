# Backend API (MVP)

## Principles
- Backend reads only from the indexer (The Graph). No direct RPC calls.
- All requests support pagination and `limit`.

## Base parameters
- `limit` (default 50, max 200)
- `cursor` (base64)
- `sort` (default `desc`)

## Endpoints

### GET /intents
List of intents.

Filters:
- `state` (OPEN|SELECTED|FULFILLED|ACCEPTED|EXPIRED)
- `tokenOut`
- `rewardToken`
- `initiator`
- `payer`
- `verifier`
- `winner`

### GET /intents/{id}
Intent details.

### GET /intents/{id}/offers
Offers for an intent.

### GET /reputation/{address}
Solver reputation.

### GET /events
Event log.

Filters:
- `intentId`
- `eventType`
- `solver`
- `fromBlock` / `toBlock`

## Responses
- All responses include `data` and `pageInfo`.
- Errors use `{ code, message }`.

## RPC minimization
- Backend caches responses with short TTL.
- Fields are sourced from subgraph only.
