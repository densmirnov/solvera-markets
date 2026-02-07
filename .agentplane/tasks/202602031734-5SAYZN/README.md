---
id: "202602031734-5SAYZN"
title: "Stage 2.5 backend core"
status: "DONE"
priority: "high"
owner: "CODER"
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
  hash: "d320ae1c3cfa7b4625c5b5ce663f893e9db089e7"
  message: "✨ 5SAYZN add backend core querying subgraph"
comments:
  -
    author: "CODER"
    body: "Start: Implement backend core using NestJS and subgraph client."
  -
    author: "CODER"
    body: "Verified: Backend uses subgraph-only reads with pagination; no RPC usage."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:45:41.312Z"
doc_updated_by: "CODER"
description: "Implement backend service querying the indexer and serving API."
id_source: "generated"
---
## Summary

Implement backend service that queries the indexer and serves API.

## Scope

Bootstrap NestJS backend, implement indexer client and endpoints.

## Risks

Risk of RPC overuse if backend queries chain directly. Mitigation: only query subgraph and cache responses.

## Verify Steps

1. Backend serves API using indexer endpoint only. 2. No direct RPC calls in code.

## Rollback Plan

Revert the commit to remove backend implementation.
