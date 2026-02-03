# Ops: indexer and backend

## Indexer (The Graph)
- Run locally for dev and self-host in prod.
- `startBlock` in `subgraph.yaml` is set to deployment block to minimize RPC load.
- Enable Graph Node health checks and lag monitoring.

## Backend
- Backend reads only from subgraph (`SUBGRAPH_URL`).
- Direct RPC calls are forbidden.
- Cache enabled (`SUBGRAPH_CACHE_TTL_MS`), rate-limiting by IP.
- Healthcheck: `GET /api/health` returns status and timestamp for deployment probes.

## RPC load minimization
- Use indexer for all read operations.
- Reduce frequency of codegen/build in CI.
- Limit backend query rate by keys/IP.

## Monitoring
- Metrics:
  - indexer lag
  - backend p95 latency
  - cache hit ratio
  - rate-limit rejects
- Alerts on lag and error growth.
