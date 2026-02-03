# Открытые параметры и конфиг

## Параметры
- `feeRecipient`.
- `feeBpsOnAccept` (например 20–50 bps).
- `fixedFeeOnExpire` (например 0.10 USDC).
- `bondBpsOfReward` (например 200 bps = 2%).
- `bondMin` (например 1 USDC).

## Управление параметрами
- Параметры могут быть immutable (конструктор) либо изменяемыми через owner.
- Для MVP изменения owner не обязательны.
