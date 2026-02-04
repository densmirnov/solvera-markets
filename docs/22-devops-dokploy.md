# DevOps: Dokploy and Docker Compose

## Deployment model
- Deployment uses Dokploy with GitHub auto-build.
- The project must boot with one command: `docker compose up`.

## Containers
- `backend` container serves API (reads from subgraph only).
- `indexer` container builds subgraph artifacts (codegen/build).

## Environment
- `SUBGRAPH_URL` is required for backend.
- Default production `SUBGRAPH_URL` points to the deployed subgraph:
  `https://api.studio.thegraph.com/query/17884/solvera/version/latest`
- Caching and rate limits are configurable via env.

## Reliability
- Use minimal base images.
- Pin dependencies via lockfiles.
- Avoid external runtime mutations inside containers.

## Dokploy isolation and ports
- For Dokploy Compose services, prefer `expose` over host `ports` to avoid port binding conflicts.
- If using Dokploy Domains, set the domain in Dokploy and redeploy for changes to take effect.
- For manual routing, add services to the `dokploy-network` and configure Traefik labels.
- Isolated Deployments can be enabled to place each app in its own network and avoid naming conflicts.
