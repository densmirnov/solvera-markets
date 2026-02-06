---
title: "State Machine"
description: "Allowed intent state transitions enforced by the on-chain contract."
sidebarTitle: "State machine"
---

# State Machine

## States
1. `OPEN` — accepting offers.
2. `SELECTED` — winner selected.
3. `FULFILLED` — result delivered.
4. `ACCEPTED` — payout completed.
5. `EXPIRED` — terminated by timeout.

## Allowed transitions
- `OPEN → SELECTED` via `selectWinner`.
- `SELECTED → ACCEPTED` via `fulfill` (sets `FULFILLED`, emits `Fulfilled`, then settles and emits `Accepted` in the same tx).
- `OPEN → EXPIRED` via `expire` (by `ttlSubmit`).
- `SELECTED → EXPIRED` via `expire` (by `ttlAccept` if not fulfilled in time).

## Forbidden transitions
- Any transition from `ACCEPTED` or `EXPIRED`.
- `OPEN → FULFILLED` or `OPEN → ACCEPTED`.
- `SELECTED → ACCEPTED` without going through `fulfill`.

## Time constraints
- At creation: `now < ttlSubmit < ttlAccept`.
- `submitOffer`: only `now <= ttlSubmit`.
- `selectWinner`: only `now <= ttlSubmit`.
- `fulfill`: only `now <= ttlAccept`.

## Notes
- `FULFILLED` is an intermediate state inside `fulfill`. Externally, after the transaction completes, the stored state is `ACCEPTED`.
