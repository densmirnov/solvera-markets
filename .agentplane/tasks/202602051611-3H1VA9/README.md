---
id: "202602051611-3H1VA9"
title: "Adjust hero spacing + Mintlify index"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "manual:docs-route"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:34:09.360Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: home hero spacing adjusted and docs index updated (commit 3e52538)."
commit:
  hash: "3e52538447fa3f3ce1ffc42dd6396b037066a0e4"
  message: "✨ 3H1VA9 fix docs index and hero spacing"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: tighten layout top padding before hero and switch docs root to index.md for Mintlify routes."
  -
    author: "ORCHESTRATOR"
    body: "Verified: hero spacing adjusted and docs index updated per task scope."
events:
  -
    type: "verify"
    at: "2026-02-07T08:34:09.360Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: home hero spacing adjusted and docs index updated (commit 3e52538)."
  -
    type: "status"
    at: "2026-02-07T08:34:14.254Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: hero spacing adjusted and docs index updated per task scope."
doc_version: 2
doc_updated_at: "2026-02-07T08:34:14.254Z"
doc_updated_by: "ORCHESTRATOR"
description: "Reduce top padding before hero and fix Mintlify root route by using index.md instead of README.md."
id_source: "generated"
---
## Summary

Reduced top padding before hero and moved docs root to index.md to fix Mintlify routing.

## Scope

Update frontend/src/components/Layout.tsx, move docs/README.md to docs/index.md, and adjust docs/docs.json navigation.

## Risks

External links to /README will now 404; ensure any references use / or /index instead.

## Verify Steps

manual: open site root to confirm hero spacing; open https://docs.solvera.markets/ to confirm index loads without /README 404.

## Rollback Plan

Restore main padding values and rename docs/index.md back to docs/README.md, reverting docs/docs.json navigation.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:34:09.360Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: home hero spacing adjusted and docs index updated (commit 3e52538).

<!-- END VERIFICATION RESULTS -->
