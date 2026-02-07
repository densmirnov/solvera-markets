---
id: "202602071124-71RZYQ"
title: "Marketplace HUD rail + pixel frames (Watch Dogs style)"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "make check"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T11:25:21.395Z"
  updated_by: "densmirnov"
  note: "Approved in chat on 2026-02-07: extend Watch Dogs HUD (mobile + Marketplace HUD rail + pixel frames)."
verification:
  state: "ok"
  updated_at: "2026-02-07T11:28:38.899Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran frontend build/lint/tests and make check. Verified: NET/API HUD renders on mobile + desktop header; Marketplace HUD rail shows state counters + UPDATED + signal meter; pixel frames applied to Marketplace filters/table and IntentDetails panel."
commit:
  hash: "29a54ff3afdfebed3b57deec49162c1bfbdbd878"
  message: "✨ 71RZYQ frontend: Marketplace HUD rail + pixel frames"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: extend HUD layer (mobile NET/API, Marketplace HUD rail with counters/updated-at/signal meter, reusable pixel frames) with minimal visual noise."
  -
    author: "ORCHESTRATOR"
    body: "Verified: HUD now shows on mobile header; Marketplace has a HUD rail (counters + updated-at + signal meter) and pixel-frame primitives are applied to key surfaces. Frontend build/lint/tests and make check passed."
events:
  -
    type: "status"
    at: "2026-02-07T11:25:25.576Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: extend HUD layer (mobile NET/API, Marketplace HUD rail with counters/updated-at/signal meter, reusable pixel frames) with minimal visual noise."
  -
    type: "verify"
    at: "2026-02-07T11:28:38.899Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Ran frontend build/lint/tests and make check. Verified: NET/API HUD renders on mobile + desktop header; Marketplace HUD rail shows state counters + UPDATED + signal meter; pixel frames applied to Marketplace filters/table and IntentDetails panel."
  -
    type: "status"
    at: "2026-02-07T11:28:43.919Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: HUD now shows on mobile header; Marketplace has a HUD rail (counters + updated-at + signal meter) and pixel-frame primitives are applied to key surfaces. Frontend build/lint/tests and make check passed."
doc_version: 2
doc_updated_at: "2026-02-07T11:28:43.919Z"
doc_updated_by: "ORCHESTRATOR"
description: "Extend Watch Dogs-inspired HUD layer: ensure NET/API HUD is visible on mobile, add Marketplace HUD rail (state counters + updated-at + signal meter), and add reusable pixel-frame primitives applied to key surfaces."
id_source: "generated"
---
## Summary

Make Watch Dogs-inspired HUD elements more pervasive: show NET/API HUD on mobile, add a Marketplace HUD rail (state counters + updated-at + signal meter), and introduce reusable pixel-frame primitives.

## Scope

- Frontend only.
- Layout header: make NET/API HUD visible on mobile (compact).
- Marketplace: add HUD rail with pixel counters by intent state, last successful refresh time, and a lightweight signal meter.
- CSS primitives: add reusable pixel-frame classes and apply to Marketplace filters/table and IntentDetails panel.

## Risks


## Verify Steps

1. `npm --prefix frontend run build`.
2. `npm --prefix frontend run lint`.
3. `npm --prefix frontend test`.
4. `make check` (task verify command).
5. Manual smoke: mobile + desktop header (NET/API visible), Marketplace (HUD rail renders + counters update), IntentDetails (pixel frame present).

## Rollback Plan


## Plan

1. Update Layout header to render HUD on mobile in a compact row.
2. Implement Marketplace HUD rail component (counters + updated-at + signal meter) and add it near filters.
3. Add pixel-frame CSS primitives and apply them to Marketplace + IntentDetails key containers.
4. Verify build/lint/tests and run `make check`.
5. Commit with tight allowlist (exclude unrelated working tree changes).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T11:28:38.899Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran frontend build/lint/tests and make check. Verified: NET/API HUD renders on mobile + desktop header; Marketplace HUD rail shows state counters + UPDATED + signal meter; pixel frames applied to Marketplace filters/table and IntentDetails panel.

<!-- END VERIFICATION RESULTS -->
