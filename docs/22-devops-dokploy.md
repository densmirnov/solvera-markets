# DevOps: Dokploy and Docker Compose

## Deployment model
- Deployment uses Dokploy with GitHub auto-build.
- The project must boot with one command: `docker compose up`.

## Containers
- `backend` container serves API (reads from subgraph only).
- `indexer` container builds subgraph artifacts (codegen/build).

## Environment
- `SUBGRAPH_URL` is required for backend.
- Caching and rate limits are configurable via env.

## Reliability
- Use minimal base images.
- Pin dependencies via lockfiles.
- Avoid external runtime mutations inside containers.
