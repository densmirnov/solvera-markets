---
id: "202602040653-D35R4Q"
title: "Switch compose to prod subgraph and validate frontend"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["docker compose up -d --build", "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:4173", "curl -s http://localhost:3000/api/health"]
commit: { hash: "eafd7b70d0478ae718cb1616fcc7fe684edc31c4", message: "🚀 D35R4Q set prod subgraph in compose" }
comments:
  - { author: "CODER", body: "Start: switch docker-compose to production subgraph endpoint and validate frontend/API availability." }
  - { author: "CODER", body: "Verified: docker compose up uses production subgraph URL; frontend returns 200 and backend health responds." }
doc_version: 2
doc_updated_at: "2026-02-04T06:57:15.048Z"
doc_updated_by: "CODER"
description: "Remove mock subgraph from compose, set production SUBGRAPH_URL, update ops docs, and verify frontend/API availability."
id_source: "generated"
---
## Summary

Switched docker-compose to production subgraph endpoint and documented the default URL.

## Scope

Updated docker-compose.yml to remove mock-subgraph and default SUBGRAPH_URL to the deployed subgraph; updated docs/22-devops-dokploy.md.

## Risks

If the subgraph endpoint changes or is rate-limited, backend API availability will degrade until SUBGRAPH_URL is updated.

## Verify Steps

1) docker compose up -d --build\n2) curl -s -o /dev/null -w "%{http_code}" http://localhost:4173\n3) curl -s http://localhost:3000/api/health

## Rollback Plan

Revert docker-compose.yml and docs/22-devops-dokploy.md; re-run docker compose up -d --build.
