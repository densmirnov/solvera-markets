---
id: "202602051616-7Q8P2M"
title: "Hackathon-focused docs refactor"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify:
  - "manual:docs-review"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:30:45.458Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: docs index updated for judge-focused narrative in docs/index.md (start-here links and differentiation)."
commit:
  hash: "00d68cd83bb00eed40c834634916d8ef5be78dfa"
  message: "✨ 7Q8P2M add judge links to docs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Rewrite docs index and key sections for judge-focused narrative, demo flow, and verification."
  -
    author: "ORCHESTRATOR"
    body: "Verified: docs index updated for judge-focused flow with start-here links and narrative."
events:
  -
    type: "verify"
    at: "2026-02-07T08:30:45.458Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: docs index updated for judge-focused narrative in docs/index.md (start-here links and differentiation)."
  -
    type: "status"
    at: "2026-02-07T08:30:55.752Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs index updated for judge-focused flow with start-here links and narrative."
doc_version: 2
doc_updated_at: "2026-02-07T08:30:55.752Z"
doc_updated_by: "ORCHESTRATOR"
description: "Rewrite docs for ETHGlobal judges, new index and key pages focused on demo, differentiation, and verification."
id_source: "generated"
---
## Summary

Rewrote docs index and key pages for ETHGlobal judge readability, focusing on demo flow, differentiation, and verification.

Rewrote judge-focused docs index and key pages, adding live demo, contract addresses, subgraph, and API links.

## Scope

Rewrite docs/index.md and key docs pages (vision, roles, contract spec, testing, indexer, backend API, subgraph endpoints) with judge-focused narrative.

## Risks

Risk of oversimplifying technical detail; some links/endpoints rely on defaults and may need manual updates for your deployment.

## Verify Steps

manual: review docs index and key pages for clarity, demo flow accuracy, and updated endpoints.

## Rollback Plan

Restore previous versions of the rewritten docs files if the judge-focused rewrite is not desired.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:30:45.458Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: docs index updated for judge-focused narrative in docs/index.md (start-here links and differentiation).

<!-- END VERIFICATION RESULTS -->
