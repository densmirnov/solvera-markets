---
title: "Subgraph endpoints"
description: "Production subgraph URL and how to point the backend to local/dev Graph endpoints."
sidebarTitle: "Endpoints"
---

# Subgraph endpoints

## Production (default)
- https://api.studio.thegraph.com/query/17884/solvera/version/latest

This is the default `SUBGRAPH_URL` used by the backend when not configured explicitly.

## Local / Dev

The backend reads from the subgraph only. To use a local Graph Node deployment:
1. Deploy the subgraph to your Graph Node.
2. Set `SUBGRAPH_URL` to the GraphQL endpoint for that deployment.

Common Graph Node services (from `env.example`):
- `GRAPH_NODE_URL`: `http://localhost:8020`
- `GRAPH_IPFS_URL`: `http://localhost:5001`

## Related
- [Indexer data model](/reference/indexer/data-model)
- [Backend HTTP API](/reference/backend/http-api)

