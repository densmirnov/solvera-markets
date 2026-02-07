---
id: "202602040426-NP70EJ"
title: "Add env.example"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "backend"
verify:
  - "rg \"SUBGRAPH_URL\" env.example"
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
  hash: "926e27b611cbe68e6b9bd43f058b74bdaa5208dc"
  message: "🧾 NP70EJ add env.example"
comments:
  -
    author: "DOCS"
    body: "Start: create env.example with production-style placeholders."
  -
    author: "DOCS"
    body: "Verified: env.example added with production-style placeholders and no secrets."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T04:28:47.445Z"
doc_updated_by: "DOCS"
description: "Create env.example with production-style environment variables for contracts/indexer/backend/frontend."
id_source: "generated"
---
## Summary

Create env.example with production-style environment variables.

## Scope

Add env.example listing backend/indexer/frontend and contract deployment variables with safe placeholders.

## Risks

Ensure no real secrets are included; use placeholders only.

## Verify Steps

1) test -f env.example\n2) rg "SUBGRAPH_URL" env.example\n3) git status --short --untracked-files=no

## Rollback Plan

Remove env.example if placeholders are incorrect or misleading.
