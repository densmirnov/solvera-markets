# Event‑based API для SDK

## События (факт из spec)
- `IntentCreated`
- `OfferSubmitted`
- `WinnerSelected`
- `Fulfilled`
- `Accepted`
- `Expired`
- `ReputationUpdated`

## Семантика
- Все критические переходы фиксируются событиями.
- В MVP офферы могут быть доступными только через `OfferSubmitted`.

## Режим работы SDK (вывод)
- SDK слушает события и строит off‑chain индекс интентов.
- Verifier‑агент выбирает победителя, ориентируясь на событийный поток.
