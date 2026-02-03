# Спецификация контракта (MVP)

## createIntent(...)
Требования:
- `now < ttlSubmit < ttlAccept`.
- валидные адреса: `payer`, `initiator`, `verifier`, `tokenOut`, `rewardToken` не равны `0`.
- `rewardAmount > 0`, `minAmountOut > 0`.

Действия:
- `transferFrom(payer, this, rewardAmount)`.
- создать `id` (например, `keccak256(payer, initiator, nonce, block.chainid)`).
- `state = OPEN`.
- эмит `IntentCreated`.

## submitOffer(id, amountOut)
Требования:
- `state == OPEN`.
- `now <= ttlSubmit`.
- `amountOut > 0`.

Действия:
- эмит `OfferSubmitted`.

Примечание:
- В MVP офферы можно не хранить в storage, только events.

## selectWinner(id, solver, amountOut)
Требования:
- `msg.sender == verifier`.
- `state == OPEN`.
- `now <= ttlSubmit`.
- `solver != 0`, `amountOut > 0`.

Действия:
- вычислить `bondAmount`.
- если `bondAmount > 0`: `transferFrom(solver, this, bondAmount)`.
- записать `winner = solver`, `winnerAmountOut = amountOut`, `bondAmount`.
- `state = SELECTED`.
- эмит `WinnerSelected`.

## fulfill(id)
Требования:
- `state == SELECTED`.
- `msg.sender == winner`.
- `now <= ttlAccept`.
- `winnerAmountOut >= minAmountOut`.

Действия:
- `transferFrom(winner, this, winnerAmountOut)` по `tokenOut`.
- `transfer(initiator, winnerAmountOut)` по `tokenOut`.
- `state = FULFILLED`.
- эмит `Fulfilled`.
- вызвать `_accept(id)`.

## _accept(id) (internal)
Требования:
- `state == FULFILLED`.

Действия:
- `fee = rewardAmount * feeBpsOnAccept / 10_000`.
- `pay = rewardAmount - fee`.
- `transfer(winner, pay)` по `rewardToken`.
- `transfer(feeRecipient, fee)` по `rewardToken`.
- вернуть bond: `transfer(winner, bondAmount)` по `rewardToken`.
- `rep[winner] += 1`.
- эмит `ReputationUpdated(... reason=ACCEPTED)`.
- `state = ACCEPTED`.
- эмит `Accepted`.

## expire(id)
Требования:
- `state ∈ {OPEN, SELECTED}`.

Ветка A: истечение из `OPEN`
- условие: `now > ttlSubmit` и `winner == 0`.
- `fee_exp = min(fixedFeeOnExpire, rewardAmount)`.
- `refund = rewardAmount - fee_exp`.
- `fee_exp → feeRecipient`, `refund → payer`.
- `state = EXPIRED`.
- эмит `Expired`.

Ветка B: истечение из `SELECTED` (winner timeout)
- условие: `now > ttlAccept` и `state != FULFILLED`.
- `fee_exp = min(fixedFeeOnExpire, rewardAmount)`.
- `refund = rewardAmount - fee_exp`.
- `fee_exp → feeRecipient`, `refund → payer`.
- если `bond > 0`: bond слэшится → `feeRecipient`.
- `rep[winner] -= 1`.
- эмит `ReputationUpdated(... reason=WINNER_TIMEOUT)`.
- `state = EXPIRED`.
- эмит `Expired`.
