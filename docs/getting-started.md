---
title: "Getting started"
description: "How to explore the demo and run the stack locally (frontend, backend, indexer)."
sidebarTitle: "Getting started"
---

# Getting started

## Quick demo (no local setup)
- UI: https://solvera.markets
- API: https://solvera.markets/api
- Subgraph: https://api.studio.thegraph.com/query/17884/solvera/version/latest

## Run with Docker Compose

This repository's `docker-compose.yml` is optimized for Dokploy-style deployments and uses `expose` (not host `ports`). For local access from your machine, add `ports` mappings for `frontend` and `backend`, or run the services with local dev commands.

### Build and run
```bash
docker compose up --build
```

### Local access note
If you keep `expose` only, containers are reachable from the Docker network but not from your host browser. A minimal local mapping is:

```yaml
services:
  backend:
    ports:
      - "3000:3000"
  frontend:
    ports:
      - "8080:80"
```

## Verify the repo
```bash
make check
```

## Next pages
- Contracts: [Contract spec](/reference/contracts/contract-spec) and [ABI and events](/reference/contracts/abi-and-events)
- APIs: [Backend HTTP API](/reference/backend/http-api) and [Indexer model](/reference/indexer/data-model)
- Ops: [Deployments and addresses](/operations/deployments-and-addresses)

