---
id: "202602040824-93GGTB"
title: "Fix frontend routing and API proxy"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "frontend"
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
  hash: "a6dd1ab2ad100d8df67db0d6a067f1e747f9b8b2"
  message: "🔧 93GGTB add SPA routing and /api proxy"
comments:
  -
    author: "CODER"
    body: "Start: Fix nginx config for SPA routes and /api proxy; set VITE_API_BASE to /api for same-origin calls."
  -
    author: "CODER"
    body: "Verified: docker compose up -d --build; nginx now serves SPA routes and proxies /api to backend."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T08:25:02.013Z"
doc_updated_by: "CODER"
description: "Add nginx SPA routing and /api reverse proxy so /monitor/intents works on solvera.markets and /skill,/docs routes are handled."
sections:
  Summary: ""
  Scope: ""
  Plan: |-
    1. Implement the change for "Fix frontend routing and API proxy".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: ""
  Verify Steps: ""
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: ""
  Findings: ""
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Implement the change for "Fix frontend routing and API proxy".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks


## Verify Steps


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings
