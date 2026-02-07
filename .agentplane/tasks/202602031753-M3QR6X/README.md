---
id: "202602031753-M3QR6X"
title: "Stage 2.9 subgraph deploy"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify:
  - "graph codegen && graph build && graph deploy"
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
  hash: "880612bddb1105b71dadfa55415646db860ac5c5"
  message: "✨ M3QR6X record subgraph endpoints"
comments:
  -
    author: "CODER"
    body: "Start: Deploy subgraph to The Graph using provided CLI commands."
  -
    author: "CODER"
    body: "Verified: Subgraph deployed to The Graph Studio and endpoints recorded in docs/19-subgraph-endpoints.md."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:01:08.723Z"
doc_updated_by: "CODER"
description: "Deploy subgraph to The Graph (solvera) using graph-cli."
id_source: "generated"
---
## Summary

Deploy subgraph to The Graph account solvera using graph-cli.

## Scope

Run graph auth, codegen, build, and deploy for subgraph.

## Risks

Risk of deploying to wrong subgraph name or account. Mitigation: use provided deploy command; stop and report if it fails.

## Verify Steps

1. graph codegen && graph build succeed. 2. graph deploy succeeds and returns deployed subgraph name.

## Rollback Plan

No code changes; if deploy fails, fix config and retry.
