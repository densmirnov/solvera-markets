---
id: "202602051550-TGEWE5"
title: "Update navbar links for Docs/Skill"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "manual:nav-check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:30:45.419Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: navbar links updated in frontend/src/components/Layout.tsx (Skill internal, Docs external to docs.solvera.markets)."
commit:
  hash: "59f8d5201aac7748bb7a7509cec0acd1e37c0642"
  message: "✨ TGEWE5 update nav links for docs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Update navbar labels/links for Skill vs Docs, adjust CTA and Skill page copy."
  -
    author: "ORCHESTRATOR"
    body: "Verified: navbar links updated to Skill internal route and Docs external to docs.solvera.markets."
events:
  -
    type: "verify"
    at: "2026-02-07T08:30:45.419Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: navbar links updated in frontend/src/components/Layout.tsx (Skill internal, Docs external to docs.solvera.markets)."
  -
    type: "status"
    at: "2026-02-07T08:30:55.757Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: navbar links updated to Skill internal route and Docs external to docs.solvera.markets."
doc_version: 2
doc_updated_at: "2026-02-07T08:30:55.757Z"
doc_updated_by: "ORCHESTRATOR"
description: "Rename Docs nav item to Skill (SKILL.md page) and make Docs link external to docs.solvera.markets."
id_source: "generated"
---
## Summary

Switched navbar to show Skill (internal) and Docs (external), updated hero CTA and SKILL page copy.

## Scope

Update frontend/src/components/Layout.tsx, frontend/src/pages/Home.tsx, and frontend/src/pages/docs.tsx to adjust navigation and copy.

## Risks

External docs link opens a new tab and depends on docs.solvera.markets availability; /docs route still exists for legacy access.

## Verify Steps

manual: confirm navbar shows Skill (internal) and Docs (external) and hero Documentation button opens docs.solvera.markets.

## Rollback Plan

Revert navbar/CTA changes in Layout.tsx, Home.tsx, and docs.tsx to restore previous Docs link behavior.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:30:45.419Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: navbar links updated in frontend/src/components/Layout.tsx (Skill internal, Docs external to docs.solvera.markets).

<!-- END VERIFICATION RESULTS -->
