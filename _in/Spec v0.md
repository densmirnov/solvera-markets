# Intent Marketplace — SPEC v0.1 (Этап 1, Base)

> Цель: однозначная спецификация поведения для реализации контракта и тестов.

---

## 1. Термины
- **Intent**: запрос на доставку on-chain результата (токенов) с escrow вознаграждения.
- **Offer**: предложение solver-а доставить `amountOut` токена `tokenOut`.
- **Winner**: solver, выбранный verifier-агентом.
- **Bond**: возвратный залог победителя, слэшится при winner-timeout.
- **Fee**:
  - `feeBpsOnAccept`: комиссия в bps, удерживаемая из reward при успехе.
  - `fixedFeeOnExpire`: фиксированная комиссия, удерживаемая при EXPIRED (anti-spam).

---

## 2. Роли
- `payer`: адрес, который лочит reward и получает рефанд при EXPIRED.
- `initiator`: адрес получателя доставленного `tokenOut`.
- `verifier`: адрес, который имеет право выбирать победителя (`selectWinner`).
- `solver`: адрес исполнителя.

В MVP:
- `selectWinner` — только `verifier`.
- `fulfill` — только `winner`.
- `expire` — permissionless.

---

## 3. Ограничения MVP
- Сеть: **Base**.
- Только ERC-20.
- Только `TRANSFER_OUTCOME`.
- Только single-chain (без кроссчейна).
- Без calldata, без оффчейн deliverables, без арбитража.

---

## 4. Состояния и переходы

### 4.1 Состояния
- `OPEN`
- `SELECTED`
- `FULFILLED`
- `ACCEPTED`
- `EXPIRED`

### 4.2 Переходы
- `OPEN → SELECTED` via `selectWinner`
- `SELECTED → FULFILLED` via `fulfill`
- `FULFILLED → ACCEPTED` via internal `_accept` (вызывается внутри `fulfill`)
- `OPEN → EXPIRED` via `expire` (по `ttlSubmit`)
- `SELECTED → EXPIRED` via `expire` (по `ttlAccept`, если не `FULFILLED`)

### 4.3 Запрещённые переходы
- Любые переходы из `ACCEPTED` и `EXPIRED`.
- `OPEN → FULFILLED/ACCEPTED`.
- `SELECTED → ACCEPTED` без `FULFILLED`.

---

## 5. Время

- `ttlSubmit`: дедлайн подачи офферов и выбора победителя.
- `ttlAccept`: дедлайн исполнения победителем.

Правила:
- При создании: `now < ttlSubmit < ttlAccept`.
- `submitOffer` допустим только если `now <= ttlSubmit`.
- `selectWinner` допустим только если `now <= ttlSubmit`.
- `fulfill` допустим только если `now <= ttlAccept`.

---

## 6. Экономика (MVP)

### 6.1 Fee
- При `ACCEPTED`: удержать `feeBpsOnAccept` из `rewardAmount` и перевести в `feeRecipient`.
- При `EXPIRED` из `OPEN` (нет winner): удержать `fixedFeeOnExpire` из `rewardAmount` и вернуть остаток payer.
- При `EXPIRED` из `SELECTED` (winner timeout): удержать `fixedFeeOnExpire` из `rewardAmount` и вернуть остаток payer.

Edge:
- Если `rewardAmount < fixedFeeOnExpire`, то `fixedFeeOnExpire` ограничивается `rewardAmount` (т.е. вернуть 0).

### 6.2 Bond
- Bond лочится **только у победителя** в момент `selectWinner`.
- Размер bond:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`
  - в MVP bond вносится в `rewardToken` (для простоты).
- При успехе (`ACCEPTED`): bond возвращается winner.
- При winner-timeout (`SELECTED → EXPIRED`): bond слэшится и переводится в `feeRecipient` (или отдельный `slashRecipient`, если появится).

---

## 7. Данные интента

Поля `Intent`:
- `id: bytes32`
- `payer: address`
- `initiator: address`
- `verifier: address`
- `tokenOut: address`
- `minAmountOut: uint256`
- `rewardToken: address`
- `rewardAmount: uint256`
- `ttlSubmit: uint64`
- `ttlAccept: uint64`
- `state: IntentState`
- `winner: address`
- `winnerAmountOut: uint256`
- `bondAmount: uint256`

---

## 8. Функции и требования

### 8.1 `createIntent(p)`
Вход:
- все поля из раздела 7, кроме `id/state/winner/*`.

Требования:
- валидировать времена: `now < ttlSubmit < ttlAccept`.
- валидировать адреса: `payer != 0`, `initiator != 0`, `verifier != 0`, `tokenOut != 0`, `rewardToken != 0`.
- `rewardAmount > 0`, `minAmountOut > 0`.

Действия:
- `transferFrom(payer, this, rewardAmount)`.
- создать `id` (например, keccak256(payer, initiator, nonce, block.chainid)).
- state = `OPEN`.
- эмит `IntentCreated`.

### 8.2 `submitOffer(id, amountOut)`
Требования:
- state == `OPEN`.
- `now <= ttlSubmit`.
- `amountOut > 0`.

Действия:
- эмит `OfferSubmitted`.

Примечание:
- В MVP офферы можно не хранить в storage (только events). Выбор победителя делает verifier оффчейн.

### 8.3 `selectWinner(id, solver, amountOut)`
Требования:
- `msg.sender == verifier`.
- state == `OPEN`.
- `now <= ttlSubmit`.
- `solver != 0`, `amountOut > 0`.

Действия:
- вычислить `bondAmount`.
- если `bondAmount > 0`: `transferFrom(solver, this, bondAmount)`.
- записать `winner = solver`, `winnerAmountOut = amountOut`, `bondAmount`.
- state = `SELECTED`.
- эмит `WinnerSelected`.

### 8.4 `fulfill(id)`
Требования:
- state == `SELECTED`.
- `msg.sender == winner`.
- `now <= ttlAccept`.
- `winnerAmountOut >= minAmountOut`.

Действия:
- `transferFrom(winner, this, winnerAmountOut)` по `tokenOut`.
- `transfer(initiator, winnerAmountOut)` по `tokenOut`.
- state = `FULFILLED`.
- эмит `Fulfilled`.
- вызвать `_accept(id)`.

### 8.5 `_accept(id)` (internal)
Требования:
- state == `FULFILLED`.

Действия:
- fee = `rewardAmount * feeBpsOnAccept / 10_000`.
- pay = `rewardAmount - fee`.
- `transfer(winner, pay)` по `rewardToken`.
- `transfer(feeRecipient, fee)` по `rewardToken`.
- вернуть bond (если >0): `transfer(winner, bondAmount)` по `rewardToken`.
- обновить репутацию: `rep[winner] += 1`.
- эмит `ReputationUpdated(... reason=ACCEPTED)`.
- state = `ACCEPTED`.
- эмит `Accepted`.

### 8.6 `expire(id)`
Требования:
- state ∈ {`OPEN`, `SELECTED`}.

Ветка A: истечение из `OPEN`
- условие: `now > ttlSubmit` и `winner == 0`.
- fee = `min(fixedFeeOnExpire, rewardAmount)`.
- refund = `rewardAmount - fee`.
- перевести fee в `feeRecipient`, refund в `payer`.
- state = `EXPIRED`.
- эмит `Expired`.

Ветка B: истечение из `SELECTED` (winner timeout)
- условие: `now > ttlAccept` и state != `FULFILLED`.
- fee_exp = `min(fixedFeeOnExpire, rewardAmount)`.
- refund = `rewardAmount - fee_exp`.
- fee_exp → `feeRecipient`, refund → `payer`.
- если bond>0: bond слэшится → `feeRecipient`.
- репутация winner: `rep[winner] -= 1`.
- эмит `ReputationUpdated(... reason=WINNER_TIMEOUT)`.
- state = `EXPIRED`.
- эмит `Expired`.

---

## 9. Инварианты (тест-ориентированные)

1. Reward может быть выплачен ровно один раз.
2. При `ACCEPTED`:
   - инициатор получил `winnerAmountOut` `tokenOut`.
   - winner получил `rewardAmount - fee`.
   - feeRecipient получил `fee`.
   - bond возвращён.
3. При `EXPIRED`:
   - payer получил `rewardAmount - fee_exp`.
   - feeRecipient получил `fee_exp`.
   - если winner timeout: bond слэшен.
4. Невозможны вызовы `selectWinner/fulfill/expire` из финальных состояний.
5. `rep` меняется только в `_accept` (+1) и `expire` ветка B (-1).

---

## 10. Открытые параметры (конфиг)

- `feeRecipient`
- `feeBpsOnAccept` (например 20–50 bps)
- `fixedFeeOnExpire` (например 0.10 USDC)
- `bondBpsOfReward` (например 200 bps = 2%)
- `bondMin` (например 1 USDC)

Все параметры должны быть:
- либо immutable (конструктор)
- либо изменяемы через owner, но **не требуется для MVP**.

---

## 11. Тест-план (минимум)

Сценарные тесты:
- happy path
- no offers → expire from OPEN
- selected winner doesn’t fulfill → expire from SELECTED
- wrong caller for selectWinner/fulfill
- fulfill after ttlAccept
- selectWinner after ttlSubmit
- fee edge: reward < fixedFee

Property/invariant tests:
- no double payout
- balances conservation per branch
- monotonic state transitions

