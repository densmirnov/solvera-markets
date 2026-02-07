---
id: "202602031734-RMTEV1"
title: "Stage 2.4 backend API spec"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "backend"
verify:
  - "make check"
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
  hash: "685fd0a95eee7507bd68cd7f63d9f1fc00b420dd"
  message: "✨ RMTEV1 add backend API spec"
comments:
  -
    author: "DOCS"
    body: "Start: Define backend API spec for indexed data (Stage 2.4)."
  -
    author: "DOCS"
    body: "Verified: Backend API spec documented with filters, pagination, and RPC minimization."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:43:50.011Z"
doc_updated_by: "DOCS"
description: "Define backend API spec over indexed data."
id_source: "generated"
---
## Summary

Define backend API spec for indexed data.

## Scope

Add docs API specification with endpoints, filters, and pagination.

## Risks

Risk of API mismatch with indexer schema. Mitigation: derive API fields from schema.graphql.

## Verify Steps

1. API spec covers intents, offers, reputation, and events. 2. Pagination rules documented.

## Rollback Plan

Revert the commit to remove API spec doc.
