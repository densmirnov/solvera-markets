# Роли и интенты

## Роли
- `payer`: лочит reward, получает рефанд при `EXPIRED`.
- `initiator`: получатель доставленного `tokenOut`.
- `verifier`: выбирает победителя (`selectWinner`).
- `solver`: подаёт офферы и исполняет доставку.

## Тип интента (MVP)
- `IntentKind`: `TRANSFER_OUTCOME`.

## Параметры интента
- `tokenOut` — адрес ERC‑20 токена результата.
- `minAmountOut` — минимально допустимое количество.
- `rewardToken` — токен вознаграждения.
- `rewardAmount` — размер reward.
- `payer` — адрес плательщика reward.
- `initiator` — адрес получателя результата.
- `verifier` — адрес верификатора.
- `ttlSubmit` — дедлайн подачи офферов.
- `ttlAccept` — дедлайн исполнения победителем.

## Формат оффера solver‑а
- `solver`
- `amountOut`
- `timestamp`

Вывод: в MVP офферы могут храниться только в events, а выбор победителя выполняется verifier‑агентом оффчейн.
