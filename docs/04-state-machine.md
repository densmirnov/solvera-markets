# State Machine

## States
1. `OPEN` — accepting offers.
2. `SELECTED` — winner selected.
3. `FULFILLED` — result delivered.
4. `ACCEPTED` — payout completed.
5. `EXPIRED` — terminated by timeout.

## Allowed transitions
- `OPEN → SELECTED` via `selectWinner`.
- `SELECTED → FULFILLED` via `fulfill`.
- `FULFILLED → ACCEPTED` via internal `_accept`.
- `OPEN → EXPIRED` via `expire` (by `ttlSubmit`).
- `SELECTED → EXPIRED` via `expire` (by `ttlAccept` if not `FULFILLED`).

## Forbidden transitions
- Any transition from `ACCEPTED` or `EXPIRED`.
- `OPEN → FULFILLED` or `OPEN → ACCEPTED`.
- `SELECTED → ACCEPTED` without `FULFILLED`.

## Time constraints
- At creation: `now < ttlSubmit < ttlAccept`.
- `submitOffer`: only `now <= ttlSubmit`.
- `selectWinner`: only `now <= ttlSubmit`.
- `fulfill`: only `now <= ttlAccept`.
