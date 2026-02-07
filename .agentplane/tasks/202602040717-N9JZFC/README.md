---
id: "202602040717-N9JZFC"
title: "Dokploy port isolation and compose adjustments"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify:
  - "docker compose up -d --build"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "bf12ace282130a966b6e1c8acfafafc80484d1e2"
  message: "🧩 N9JZFC adjust compose for Dokploy isolation"
comments:
  -
    author: "CODER"
    body: "Start: adjust compose for Dokploy isolation and document port conflict avoidance."
  -
    author: "CODER"
    body: "Verified: compose uses internal ports and Dokploy isolation guidance documented; build succeeds without host port conflicts."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T07:22:21.706Z"
doc_updated_by: "CODER"
description: "Remove host port bindings in docker-compose for Dokploy isolation, document isolated deployments/Traefik routing, and avoid port conflicts."
id_source: "generated"
---
## Summary

Removed host port bindings in docker-compose and documented Dokploy isolation/routing to prevent port conflicts.

## Scope

Updated docker-compose.yml to use expose for backend/frontend and added Dokploy isolation guidance in docs/22-devops-dokploy.md.

## Risks

Removing host port bindings means local access requires explicit port publishing or a reverse proxy; ensure Dokploy domain routing is configured.

## Verify Steps

docker compose up -d --build

## Rollback Plan

Revert docker-compose.yml and docs/22-devops-dokploy.md to restore host port bindings.
