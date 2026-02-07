---
id: "202602040726-8T34T5"
title: "Normalize env files for solvera.markets"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "backend"
verify:
  - "rg -n \"solvera\\.markets|CORS_ORIGIN|VITE_API_BASE|SUBGRAPH_URL\" env.example .env"
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
  hash: "aaf0ca4e951fa2c55d228ef2d2ddcacf96173e12"
  message: "🧾 8T34T5 fix env domain and defaults"
comments:
  -
    author: "DOCS"
    body: "Start: normalize env files for solvera.markets and ensure required variables are present."
  -
    author: "DOCS"
    body: "Verified: env.example updated to solvera.markets and .env contains required production variables."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T07:28:43.814Z"
doc_updated_by: "DOCS"
description: "Fix production domain to solvera.markets, align env.example, and complete .env with required variables."
id_source: "generated"
---
## Summary

Updated env.example/.env to solvera.markets and completed missing production variables.

## Scope

Updated env.example domain values and filled .env with required backend/indexer variables.

## Risks

Ensure .env secrets remain protected; production domain changes require updating CORS_ORIGIN and VITE_API_BASE.

## Verify Steps

rg -n "solvera\.markets|CORS_ORIGIN|VITE_API_BASE|SUBGRAPH_URL" env.example .env

## Rollback Plan

Revert env.example and .env to previous values.
