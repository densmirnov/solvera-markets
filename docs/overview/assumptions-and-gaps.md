---
title: "Assumptions and gaps"
description: "Explicit assumptions, missing details, and current weak points in the MVP design."
sidebarTitle: "Assumptions"
---

# Assumptions and gaps

## Explicit assumptions
1. Verifier agent can select winners off-chain from event data and call `selectWinner`.
2. Solver agents can react to `WinnerSelected` and fulfill before `ttlAccept`.
3. Fee/bond parameters can be tuned empirically without core logic changes.

## Missing details
- Event payload schemas and types (see [ABI and events](/reference/contracts/abi-and-events)).
- Deterministic `id` scheme is described by example but not surfaced as a normative API contract (see [Contract spec](/reference/contracts/contract-spec)).
- No anti-fraud mechanics for verifier agent.
- No offer rate limits or quotas specified.

## Weak points
- If verifier agent degrades, the market stalls at `OPEN`.
- Incorrect `fixedFeeOnExpire` can either allow spam or block legitimate intents.
- Low `bondMin` may enable systematic non-fulfillment by winners.

## Failure modes to watch
- Misconfigured backend env can mislead clients (backend exposes config from env, not from chain).
- If indexer lags, the UI/API may show stale state (see [Indexer model](/reference/indexer/data-model)).
