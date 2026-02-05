---
title: "Contract specification (MVP)"
description: "Requirements:"
---

# Contract specification (MVP)

## createIntent(...)
Requirements:
- `now < ttlSubmit < ttlAccept`.
- valid addresses: `payer`, `initiator`, `verifier`, `tokenOut`, `rewardToken` not zero.
- `rewardAmount > 0`, `minAmountOut > 0`.

Actions:
- `transferFrom(payer, this, rewardAmount)`.
- create `id` (e.g., `keccak256(payer, initiator, nonce, block.chainid)`).
- `state = OPEN`.
- emit `IntentCreated`.

## submitOffer(id, amountOut)
Requirements:
- `state == OPEN`.
- `now <= ttlSubmit`.
- `amountOut > 0`.

Actions:
- emit `OfferSubmitted`.

Note:
- In MVP offers may be event-only (no storage).

## selectWinner(id, solver, amountOut)
Requirements:
- `msg.sender == verifier`.
- `state == OPEN`.
- `now <= ttlSubmit`.
- `solver != 0`, `amountOut > 0`.

Actions:
- compute `bondAmount`.
- if `bondAmount > 0`: `transferFrom(solver, this, bondAmount)`.
- store `winner`, `winnerAmountOut`, `bondAmount`.
- `state = SELECTED`.
- emit `WinnerSelected`.

## fulfill(id)
Requirements:
- `state == SELECTED`.
- `msg.sender == winner`.
- `now <= ttlAccept`.
- `winnerAmountOut >= minAmountOut`.

Actions:
- `transferFrom(winner, this, winnerAmountOut)` in `tokenOut`.
- `transfer(initiator, winnerAmountOut)` in `tokenOut`.
- `state = FULFILLED`.
- emit `Fulfilled`.
- call `_accept(id)`.

## _accept(id) (internal)
Requirements:
- `state == FULFILLED`.

Actions:
- `fee = rewardAmount * feeBpsOnAccept / 10_000`.
- `pay = rewardAmount - fee`.
- `transfer(winner, pay)` in `rewardToken`.
- `transfer(feeRecipient, fee)` in `rewardToken`.
- return bond: `transfer(winner, bondAmount)` in `rewardToken`.
- `rep[winner] += 1`.
- emit `ReputationUpdated(... reason=ACCEPTED)`.
- `state = ACCEPTED`.
- emit `Accepted`.

## expire(id)
Requirements:
- `state ∈ {OPEN, SELECTED}`.

Branch A: expire from `OPEN`
- condition: `now > ttlSubmit` and `winner == 0`.
- `fee_exp = min(fixedFeeOnExpire, rewardAmount)`.
- `refund = rewardAmount - fee_exp`.
- `fee_exp → feeRecipient`, `refund → payer`.
- `state = EXPIRED`.
- emit `Expired`.

Branch B: expire from `SELECTED` (winner timeout)
- condition: `now > ttlAccept` and `state != FULFILLED`.
- `fee_exp = min(fixedFeeOnExpire, rewardAmount)`.
- `refund = rewardAmount - fee_exp`.
- `fee_exp → feeRecipient`, `refund → payer`.
- if bond>0: bond slashed → `feeRecipient`.
- `rep[winner] -= 1`.
- emit `ReputationUpdated(... reason=WINNER_TIMEOUT)`.
- `state = EXPIRED`.
- emit `Expired`.
