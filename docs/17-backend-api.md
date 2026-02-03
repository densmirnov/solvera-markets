# Backend API (MVP)

## Принципы
- Backend читает только из индексатора (The Graph). Прямых RPC‑вызовов к сети нет.
- Все запросы поддерживают пагинацию и ограничение `limit`.

## Базовые параметры
- `limit` (default 50, max 200)
- `cursor` (base64)
- `sort` (default `desc`)

## Эндпоинты

### GET /intents
Список интентов.

Поля фильтрации:
- `state` (OPEN|SELECTED|FULFILLED|ACCEPTED|EXPIRED)
- `tokenOut`
- `rewardToken`
- `initiator`
- `payer`
- `verifier`
- `winner`

### GET /intents/{id}
Детали интента.

### GET /intents/{id}/offers
Офферы по интенту.

### GET /reputation/{address}
Текущая репутация solver.

### GET /events
Событийный лог.

Фильтры:
- `intentId`
- `eventType`
- `solver`
- `fromBlock` / `toBlock`

## Ответы
- Все ответы включают `data` и `pageInfo`.
- Ошибки возвращаются в формате `{ code, message }`.

## RPC‑минимизация
- Backend кэширует ответы на короткий TTL.
- Поля берутся из subgraph, без обращения к RPC.
