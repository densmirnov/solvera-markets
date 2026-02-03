# Модель индексатора

## Сущности

### Intent
- `id`: bytes32 интента.
- `tokenOut`, `rewardToken`: адреса токенов.
- `minAmountOut`, `rewardAmount`: числовые параметры.
- `payer`, `initiator`, `verifier`: адреса ролей.
- `ttlSubmit`, `ttlAccept`: дедлайны.
- `state`: строковое состояние (`OPEN`, `SELECTED`, `FULFILLED`, `ACCEPTED`, `EXPIRED`).
- `winner`, `winnerAmountOut`, `bondAmount`.
- `createdAt`, `updatedAt`, `txHash`.

### Offer
- `id`: `${intentId}-${txHash}`.
- `intent`: ссылка на Intent.
- `solver`, `amountOut`, `timestamp`, `txHash`.

### Reputation
- `id`: адрес solver.
- `value`: текущее значение.
- `updatedAt`, `txHash`.

### EventLog
- `id`: `${txHash}-${logIndex}`.
- `intent`: ссылка на Intent.
- `eventType`: тип события.
- `solver`, `amountOut`, `feeAmount`, `refundAmount`, `bondAmount`, `rewardAmount`, `reason`.
- `blockNumber`, `blockTimestamp`, `txHash`.

## Принципы
- Индексатор не выполняет RPC‑чтений состояния контракта.
- Все поля строятся детерминированно из событий.
- Backend читает только индексатор, не обращаясь к RPC.
