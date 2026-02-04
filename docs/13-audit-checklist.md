# Audit checklist (MVP)

## Contract
- State machine matches specification.
- Access control for `selectWinner` and `fulfill`.
- Time validation (`ttlSubmit`, `ttlAccept`).
- Economics: fee, fixed fee, bond, correct payouts.
- Reputation changes only per rules.
- No double payout.
- Forbidden transitions prevented.

## Tokens
- Safe handling of `transfer`/`transferFrom` results.
- No assumptions on non-standard ERC-20 behavior.

## Economic risks
- Fee/bond values are fixed and reviewed.
- Edge case: `rewardAmount < fixedFeeOnExpire`.

## Tests
- Happy path.
- No offers → expire.
- Winner timeout → expire.
- Wrong callers.
- TTL violations.
- Fee edge cases.

## Invariants
- Reward paid exactly once.
- Balances correct in all branches.
- Reputation changes only in `_accept` and `expire`.

## Dependency Audit
- `npm audit --audit-level=high` must pass for backend, frontend, and indexer.
- Moderate-only indexer warnings are documented in `docs/20-engineering-standards.md`.
