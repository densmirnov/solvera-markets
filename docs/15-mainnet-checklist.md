# Mainnet деплой: чеклист

## Конфигурация
- Определены точные параметры: `feeRecipient`, `feeBpsOnAccept`, `fixedFeeOnExpire`, `bondBpsOfReward`, `bondMin`.
- Проверен RPC URL для Base mainnet.
- Указан `BASE_DEPLOYER_PRIVATE_KEY`.
- Подготовлен `ETHERSCAN_API_KEY` для верификации.

## Контракт
- Контракт скомпилирован без предупреждений.
- Хэш байткода совпадает с тестнет‑версией (если применимо).
- ABI согласован с `docs/12-abi-events.md`.

## Тесты и анализ
- `forge test` успешен.
- Статический анализ выполнен (solhint/slither).
- Все сценарные тесты закрывают MVP.

## Операционные проверки
- Адрес `feeRecipient` подтверждён.
- Балансы deployer‑адреса достаточны для газа.
- Подготовлен план post‑deploy проверки.

## Публикация
- Деплой выполнен через `DeployIntentMarketplace`.
- Контракт верифицирован в обозревателе.
- `docs/14-deployments.md` обновлён.
