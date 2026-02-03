# Ops: индексатор и backend

## Индексатор (The Graph)
- Запускать локально для dev и self‑hosted в проде.
- `startBlock` в `subgraph.yaml` выставлен на блок деплоя, чтобы минимизировать RPC‑нагрузку.
- Включить health‑checks Graph Node и мониторинг lag.

## Backend
- Backend читает только из subgraph (`SUBGRAPH_URL`).
- Прямые RPC‑вызовы запрещены.
- Кэш включён (`SUBGRAPH_CACHE_TTL_MS`), rate‑limit на IP.

## Нагрузка на RPC
- Использовать только индексатор для всех read‑операций.
- Уменьшить частоту codegen/build в CI.
- Ограничить частоту запросов backend по ключам/IP.

## Мониторинг
- Метрики:
  - lag индексации
  - p95 latency backend
  - cache hit ratio
  - rate‑limit rejects
- Алерты при превышении lag и росте ошибок.
