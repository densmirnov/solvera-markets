# Intent Marketplace — SPEC v0.1 (Stage 1, Base)

> Goal: unambiguous behavior specification for contract implementation and tests.

---

## 1. Terms
- **Intent**: request for on-chain outcome delivery (tokens) with escrow reward.
- **Offer**: solver’s offer to deliver `amountOut` of `tokenOut`.
- **Winner**: solver selected by verifier agent.
- **Bond**: refundable winner deposit, slashed on winner timeout.
- **Fee**:
  - `feeBpsOnAccept`: fee in bps taken from reward on success.
  - `fixedFeeOnExpire`: fixed fee taken on EXPIRED (anti-spam).

---

## 2. Roles
- `payer`: locks reward and receives refund on EXPIRED.
- `initiator`: recipient of delivered `tokenOut`.
- `verifier`: can select winner (`selectWinner`).
- `solver`: executor.

In MVP:
- `selectWinner` — only `verifier`.
- `fulfill` — only `winner`.
- `expire` — permissionless.

---

## 3. MVP constraints
- Network: **Base**.
- ERC-20 only.
- `TRANSFER_OUTCOME` only.
- Single-chain only (no cross-chain).
- No calldata, no off-chain deliverables, no arbitration.

---

## 4. States and transitions

### 4.1 States
- `OPEN`
- `SELECTED`
- `FULFILLED`
- `ACCEPTED`
- `EXPIRED`

### 4.2 Transitions
- `OPEN → SELECTED` via `selectWinner`
- `SELECTED → FULFILLED` via `fulfill`
- `FULFILLED → ACCEPTED` via internal `_accept` (called inside `fulfill`)
- `OPEN → EXPIRED` via `expire` (by `ttlSubmit`)
- `SELECTED → EXPIRED` via `expire` (by `ttlAccept` if not `FULFILLED`)

### 4.3 Forbidden transitions
- Any transition from `ACCEPTED` or `EXPIRED`.
- `OPEN → FULFILLED/ACCEPTED`.
- `SELECTED → ACCEPTED` without `FULFILLED`.

---

## 5. Time

- `ttlSubmit`: deadline for offers and winner selection.
- `ttlAccept`: deadline for winner fulfillment.

Rules:
- At creation: `now < ttlSubmit < ttlAccept`.
- `submitOffer` only if `now <= ttlSubmit`.
- `selectWinner` only if `now <= ttlSubmit`.
- `fulfill` only if `now <= ttlAccept`.

---

## 6. Economics (MVP)

### 6.1 Fee
- On `ACCEPTED`: take `feeBpsOnAccept` from `rewardAmount` to `feeRecipient`.
- On `EXPIRED` from `OPEN`: take `fixedFeeOnExpire` and refund rest to payer.
- On `EXPIRED` from `SELECTED`: take `fixedFeeOnExpire` and refund rest to payer.

Edge:
- If `rewardAmount < fixedFeeOnExpire`, cap `fixedFeeOnExpire` to `rewardAmount` (refund 0).

### 6.2 Bond
- Bond is locked **only for winner** at `selectWinner`.
- Bond size:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`
  - In MVP bond is paid in `rewardToken`.
- On success (`ACCEPTED`): bond returned to winner.
- On winner timeout (`SELECTED → EXPIRED`): bond slashed to `feeRecipient`.

---

## 7. Events (MVP)

- `IntentCreated`
- `OfferSubmitted`
- `WinnerSelected`
- `Fulfilled`
- `Accepted`
- `Expired`
- `ReputationUpdated`

---

## 8. Functions

### 8.1 `createIntent(...)`
Requirements:
- validate time: `now < ttlSubmit < ttlAccept`.
- validate addresses: `payer != 0`, `initiator != 0`, `verifier != 0`, `tokenOut != 0`, `rewardToken != 0`.
- `rewardAmount > 0`, `minAmountOut > 0`.

Actions:
- `transferFrom(payer, this, rewardAmount)`.
- create `id` (e.g., keccak256(payer, initiator, nonce, block.chainid)).
- state = `OPEN`.
- emit `IntentCreated`.

### 8.2 `submitOffer(id, amountOut)`
Requirements:
- state == `OPEN`.
- `now <= ttlSubmit`.
- `amountOut > 0`.

Actions:
- emit `OfferSubmitted`.

Note:
- In MVP offers need not be stored (events only). Winner selection is off-chain.

### 8.3 `selectWinner(id, solver, amountOut)`
Requirements:
- `msg.sender == verifier`.
- state == `OPEN`.
- `now <= ttlSubmit`.
- `solver != 0`, `amountOut > 0`.

Actions:
- compute `bondAmount`.
- if `bondAmount > 0`: `transferFrom(solver, this, bondAmount)`.
- store `winner = solver`, `winnerAmountOut = amountOut`, `bondAmount`.
- state = `SELECTED`.
- emit `WinnerSelected`.

### 8.4 `fulfill(id)`
Requirements:
- state == `SELECTED`.
- `msg.sender == winner`.
- `now <= ttlAccept`.
- `winnerAmountOut >= minAmountOut`.

Actions:
- `transferFrom(winner, this, winnerAmountOut)` in `tokenOut`.
- `transfer(initiator, winnerAmountOut)` in `tokenOut`.
- state = `FULFILLED`.
- emit `Fulfilled`.
- call `_accept(id)`.

### 8.5 `_accept(id)` (internal)
Requirements:
- state == `FULFILLED`.

Actions:
- fee = `rewardAmount * feeBpsOnAccept / 10_000`.
- pay = `rewardAmount - fee`.
- `transfer(winner, pay)` in `rewardToken`.
- `transfer(feeRecipient, fee)` in `rewardToken`.
- return bond (if >0): `transfer(winner, bondAmount)` in `rewardToken`.
- `rep[winner] += 1`.
- emit `ReputationUpdated(... reason=ACCEPTED)`.
- state = `ACCEPTED`.
- emit `Accepted`.

### 8.6 `expire(id)`
Requirements:
- state ∈ {`OPEN`, `SELECTED`}.

Branch A: expire from `OPEN`
- condition: `now > ttlSubmit` and `winner == 0`.
- fee = `min(fixedFeeOnExpire, rewardAmount)`.
- refund = `rewardAmount - fee`.
- fee → `feeRecipient`, refund → `payer`.
- state = `EXPIRED`.
- emit `Expired`.

Branch B: expire from `SELECTED` (winner timeout)
- condition: `now > ttlAccept` and state != `FULFILLED`.
- fee = `min(fixedFeeOnExpire, rewardAmount)`.
- refund = `rewardAmount - fee`.
- fee → `feeRecipient`, refund → `payer`.
- if bond>0: bond slashed → `feeRecipient`.
- reputation winner: `rep[winner] -= 1`.
- emit `ReputationUpdated(... reason=WINNER_TIMEOUT)`.
- state = `EXPIRED`.
- emit `Expired`.

---

## 9. Invariants (test-oriented)

1. Reward can be paid exactly once.
2. On `ACCEPTED`:
   - initiator received `winnerAmountOut` `tokenOut`.
   - winner received `rewardAmount - fee`.
   - feeRecipient received `fee`.
   - bond returned.
3. On `EXPIRED`:
   - payer received `rewardAmount - fee_exp`.
   - feeRecipient received `fee_exp`.
   - if winner timeout: bond slashed.
4. `selectWinner/fulfill/expire` cannot be called from final states.
5. `rep` changes only in `_accept` (+1) and `expire` branch B (-1).

---

## 10. Open parameters (config)

- `feeRecipient`
- `feeBpsOnAccept` (e.g., 20–50 bps)
- `fixedFeeOnExpire` (e.g., 0.10 USDC)
- `bondBpsOfReward` (e.g., 200 bps = 2%)
- `bondMin` (e.g., 1 USDC)

All parameters should be either:
- immutable (constructor)
- or owner-adjustable (not required for MVP).

---

## 11. Test plan (minimum)

Scenario tests:
- happy path
- no offers → expire from OPEN
- selected winner doesn’t fulfill → expire from SELECTED
- wrong caller for selectWinner/fulfill
- fulfill after ttlAccept
- selectWinner after ttlSubmit
- fee edge: reward < fixedFee

Property/invariant tests:
- no double payout
- balance conservation per branch
- monotonic state transitions
