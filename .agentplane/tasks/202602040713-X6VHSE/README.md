---
id: "202602040713-X6VHSE"
title: "Update env.example and production .env"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags: ["backend"]
verify: ["rg -n \"CORS_ORIGIN|VITE_API_BASE|SUBGRAPH_URL\" env.example .env"]
commit: { hash: "38fbafb4139d89d2b60774f85afe0a4dff31bb82", message: "🧾 X6VHSE update production env defaults" }
comments:
  - { author: "DOCS", body: "Start: update env.example and .env for solvera.market production settings." }
  - { author: "DOCS", body: "Verified: env.example updated for solvera.market and .env contains production CORS/API/subgraph values." }
doc_version: 2
doc_updated_at: "2026-02-04T07:15:33.367Z"
doc_updated_by: "DOCS"
description: "Set production CORS_ORIGIN and VITE_API_BASE values for solvera.market and align env.example/.env with production defaults."
id_source: "generated"
---
## Summary

Updated env.example and .env with production solvera.market settings for CORS and API base.

## Scope

Updated env.example and .env with production SUBGRAPH_URL, CORS_ORIGIN, and VITE_API_BASE.

## Risks

Ensure production secrets in .env remain protected; domain changes require updating CORS_ORIGIN and VITE_API_BASE.

## Verify Steps

rg -n "CORS_ORIGIN|VITE_API_BASE|SUBGRAPH_URL" env.example .env

## Rollback Plan

Revert env.example and .env to previous values.
