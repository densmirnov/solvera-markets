---
id: "202602031851-Z097CY"
title: "Stage 3.1 API contract"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "backend"
verify:
  - "rg \"next_steps\" docs/17-backend-api.md"
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
  hash: "6f6434406bc777214bd89eeb17e9957c45d82ea0"
  message: "🧭 Z097CY expand backend API contract"
comments:
  -
    author: "DOCS"
    body: "Start: expand backend API documentation per PRD v0.1 with next_steps, tx-builders, and error model."
  -
    author: "DOCS"
    body: "Verified: backend API doc now specifies next_steps, tx-builder endpoints, error model, config endpoint, and pagination filters per PRD v0.1."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:53:21.259Z"
doc_updated_by: "DOCS"
description: "Define backend API contract per PRD v0.1 with next_steps, tx-builder endpoints, error model, config, and pagination."
id_source: "generated"
---
## Summary

Define the agent-first backend API contract per PRD v0.1 (next_steps, tx-builders, errors, config, pagination).

## Scope

Update docs/17-backend-api.md to include endpoint specs, next_steps schema, error model, tx-builder endpoints, config endpoint, and pagination filters.

## Risks

Spec changes may diverge from backend implementation; ensure docs are aligned with server routes.

## Verify Steps

1) rg "next_steps" docs/17-backend-api.md\n2) git status --short --untracked-files=no

## Rollback Plan

Revert docs/17-backend-api.md to previous version if requirements are incorrect.
