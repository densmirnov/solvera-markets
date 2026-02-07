---
id: "202602031851-K7QY6Y"
title: "Stage 3.2 backend implementation"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify:
  - "rg \"/api/\" backend"
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
  hash: "528ac0644f46582c28a73ac3b439981c9db49af4"
  message: "✨ K7QY6Y implement agent-first backend API"
comments:
  -
    author: "CODER"
    body: "Start: implement agent-first backend endpoints with tx-builder responses and next_steps."
  -
    author: "CODER"
    body: "Verified: backend now serves /api endpoints with next_steps, tx-builder payloads, config endpoint, and structured errors."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:57:11.294Z"
doc_updated_by: "CODER"
description: "Implement REST API over indexer with tx-builder endpoints, config endpoint, and next_steps in responses."
id_source: "generated"
---
## Summary

Implement REST backend endpoints per PRD v0.1, including tx-builders, config, and next_steps responses.

## Scope

Add/extend backend routes for intents, offers, tx-builder actions, and config; ensure responses include next_steps and are stateless.

## Risks

Mismatch between indexer data and API output could break agent flows; add tests and validations.

## Verify Steps

1) rg "/api/" backend\n2) backend tests (if present)\n3) git status --short --untracked-files=no

## Rollback Plan

Revert backend route changes and restore previous API behavior if regressions appear.
