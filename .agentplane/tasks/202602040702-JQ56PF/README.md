---
id: "202602040702-JQ56PF"
title: "Fix monitor fetch and remove UI shadows"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build", "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:4173"]
commit: { hash: "1270ed44daecfc46146127c89ef5c1d8b7b2e99f", message: "🎨 JQ56PF fix monitor fetch and remove shadows" }
comments:
  - { author: "CODER", body: "Start: remove frontend shadows and fix Monitor API fetch failures." }
  - { author: "CODER", body: "Verified: frontend loads without shadows and Monitor API requests succeed with CORS enabled." }
doc_version: 2
doc_updated_at: "2026-02-04T07:09:50.524Z"
doc_updated_by: "CODER"
description: "Remove drop shadows from frontend UI and fix Monitor API fetch errors."
id_source: "generated"
---
## Summary

Removed UI shadows and enabled CORS to fix Monitor API fetch failures.

## Scope

Updated frontend styles to remove box shadows, enabled CORS in backend, and added CORS_ORIGIN to docker-compose.yml.

Updated frontend styles to remove box shadows, enabled CORS in backend, and added CORS_ORIGIN to docker-compose.yml.

## Risks

Allowing '*' for CORS may be too permissive for production; set CORS_ORIGIN to the deployed frontend domain in production.

## Verify Steps

1) docker compose up -d --build\n2) open http://localhost:4173/monitor\n3) confirm Monitor loads without 'Failed to fetch'

## Rollback Plan

Revert frontend/src/styles.css, backend/src/main.ts, and docker-compose.yml; rebuild containers.
