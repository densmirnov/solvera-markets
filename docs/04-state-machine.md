# State Machine

## Состояния
1. `OPEN` — приём офферов.
2. `SELECTED` — выбран победитель.
3. `FULFILLED` — результат доставлен.
4. `ACCEPTED` — выплата выполнена.
5. `EXPIRED` — завершён по таймауту.

## Разрешённые переходы
- `OPEN → SELECTED` через `selectWinner`.
- `SELECTED → FULFILLED` через `fulfill`.
- `FULFILLED → ACCEPTED` через `_accept` (internal).
- `OPEN → EXPIRED` через `expire` (по `ttlSubmit`).
- `SELECTED → EXPIRED` через `expire` (по `ttlAccept`, если не `FULFILLED`).

## Запрещённые переходы
- Любые переходы из `ACCEPTED` и `EXPIRED`.
- `OPEN → FULFILLED` или `OPEN → ACCEPTED`.
- `SELECTED → ACCEPTED` без `FULFILLED`.

## Временные ограничения
- При создании: `now < ttlSubmit < ttlAccept`.
- `submitOffer`: только `now <= ttlSubmit`.
- `selectWinner`: только `now <= ttlSubmit`.
- `fulfill`: только `now <= ttlAccept`.
