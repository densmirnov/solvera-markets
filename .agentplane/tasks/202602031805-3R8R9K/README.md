---
id: "202602031805-3R8R9K"
title: "Stage 2.12 containerization"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify:
  - "docker compose up"
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
  hash: "8f327f33085f136469f760222851a2a782923581"
  message: "✨ 3R8R9K add docker compose and Dockerfiles"
comments:
  -
    author: "CODER"
    body: "Start: Add docker compose and Dockerfiles for Dokploy deployment."
  -
    author: "CODER"
    body: "Verified: Added docker compose and Dockerfiles for Dokploy; backend starts via compose."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:10:34.890Z"
doc_updated_by: "CODER"
description: "Add docker compose and Dockerfiles for one-command startup via Dokploy."
id_source: "generated"
---
## Summary

Add docker compose and Dockerfiles for one-command startup.

## Scope

Add docker-compose.yml, backend Dockerfile, and dockerignore; ensure docker compose up boots backend.

## Risks

Risk of broken builds in Dokploy. Mitigation: minimal images, explicit env vars, healthcheck.

## Verify Steps

1. docker compose config validates. 2. Backend container builds and starts with SUBGRAPH_URL.

## Rollback Plan

Revert the commit to remove docker compose and Dockerfiles.
