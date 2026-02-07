---
id: "202602071124-71RZYQ"
title: "Marketplace HUD rail + pixel frames (Watch Dogs style)"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: extend HUD layer (mobile NET/API, Marketplace HUD rail with counters/updated-at/signal meter, reusable pixel frames) with minimal visual noise."
events:
  -
    type: "status"
    at: "2026-02-07T11:25:25.576Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: extend HUD layer (mobile NET/API, Marketplace HUD rail with counters/updated-at/signal meter, reusable pixel frames) with minimal visual noise."
doc_version: 2
doc_updated_at: "2026-02-07T11:25:25.576Z"
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
