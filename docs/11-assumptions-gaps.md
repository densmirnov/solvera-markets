# Assumptions and gaps

## Explicit assumptions
1. Verifier agent can select winners off-chain from event data and call `selectWinner`.
2. Solver agents can react to `WinnerSelected` and fulfill before `ttlAccept`.
3. Fee/bond parameters can be tuned empirically without core logic changes.

## Missing details
- Event payload schemas (ABI) were initially unspecified.
- Deterministic `id` scheme is described by example but not normative.
- No anti-fraud mechanics for verifier agent.
- No offer rate limits or quotas specified.

## Weak points
- If verifier agent degrades, the market stalls at `OPEN`.
- Incorrect `fixedFeeOnExpire` can either allow spam or block legitimate intents.
- Low `bondMin` may enable systematic non-fulfillment by winners.
