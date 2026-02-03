# Test plan and invariants

## Scenario tests (minimum)
- Happy path.
- No offers → `expire` from `OPEN`.
- Winner does not fulfill → `expire` from `SELECTED`.
- Wrong caller for `selectWinner`/`fulfill`.
- `fulfill` after `ttlAccept`.
- `selectWinner` after `ttlSubmit`.
- Edge: `rewardAmount < fixedFeeOnExpire`.

## Property/invariant tests
1. No double reward payout.
2. Balance conservation per branch.
3. Monotonic state transitions.

## Protocol invariants
1. Reward can be paid exactly once.
2. On `ACCEPTED`:
- initiator received `winnerAmountOut` `tokenOut`.
- winner received `rewardAmount - fee`.
- `feeRecipient` received `fee`.
- bond returned.
3. On `EXPIRED`:
- payer received `rewardAmount - fee_exp`.
- `feeRecipient` received `fee_exp`.
- on winner timeout bond is slashed.
4. No `selectWinner/fulfill/expire` calls from final states.
5. `rep` changes only in `_accept` (+1) and `expire` branch B (‑1).
