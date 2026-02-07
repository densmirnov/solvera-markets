---
id: "202602061434-J57EFY"
title: "Halve navbar-to-hero spacing on home"
status: "DONE"
priority: "low"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "cd frontend && npm run build"
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
  hash: "2be796f970098590c5a62c62e5cd129a1877888a"
  message: "✨ J57EFY halve navbar-to-hero spacing on home"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Reduce navbar-to-hero spacing on home by 2x; keep header/hero overlap safe."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Ran cd frontend && npm run build; homepage navbar-to-hero gap is ~2x tighter and hero is not overlapped by the sticky header."
events: []
doc_version: 2
doc_updated_at: "2026-02-06T14:44:06.573Z"
doc_updated_by: "ORCHESTRATOR"
description: "Reduce vertical spacing between the navbar and the hero section on the home page by 2x without causing overlap with sticky/fixed header. Scope: frontend only."
id_source: "generated"
---
## Summary

Halved the homepage navbar-to-hero top spacing by reducing top padding on the home route (Layout) and the Home page wrapper.

## Scope

Frontend only:\n- frontend/src/components/Layout.tsx\n- frontend/src/pages/Home.tsx

## Risks

If the header height changes or the router path handling changes (e.g. trailing slashes), the effective gap may drift; homepage padding may need re-tuning to avoid hero feeling cramped.

## Verify Steps

- cd frontend && npm run build\n- Manual: open / and confirm hero is not overlapped by the sticky header and the gap is ~2x smaller than before.

## Rollback Plan

Revert commit 2be796f97009 or undo the padding changes in frontend/src/components/Layout.tsx and frontend/src/pages/Home.tsx.

## Verification

Status: pass
Verified at: 2026-02-06T14:41:18.741Z
Verified sha: 4769d7f8be032f1320d275fd86f9ad3157c066ab

Commands:
- cd frontend && npm run build
