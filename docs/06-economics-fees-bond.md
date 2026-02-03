# Экономика, комиссии и bond

## Комиссии
- `feeBpsOnAccept`: удерживается из `rewardAmount` при успехе.
- `fixedFeeOnExpire`: удерживается при `EXPIRED` (anti‑spam).

Edge:
- если `rewardAmount < fixedFeeOnExpire`, то `fixedFeeOnExpire` ограничивается `rewardAmount`.

## Bond победителя
- Лочится только у победителя в момент `selectWinner`.
- Размер bond:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`.
- В MVP bond вносится в `rewardToken`.

## Возврат и слэш
- При `ACCEPTED`: bond возвращается winner.
- При winner‑timeout (`SELECTED → EXPIRED`): bond слэшится и переводится в `feeRecipient`.
