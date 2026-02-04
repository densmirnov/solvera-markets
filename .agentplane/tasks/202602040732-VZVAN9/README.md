---
id: "202602040732-VZVAN9"
title: "Fix indexer build and update contract address"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["npm --prefix indexer run build", "rg -n \"CONTRACT_ADDRESS\" env.example .env"]
commit: { hash: "f7f98311d35873d8992335d0139a3948632dfd1f", message: "🛠️ VZVAN9 fix indexer build and contract address" }
comments:
  - { author: "CODER", body: "Start: fix indexer build order and update deployed contract address in env files." }
  - { author: "CODER", body: "Verified: indexer build now runs codegen, and env files reference the deployed Base contract address." }
doc_version: 2
doc_updated_at: "2026-02-04T07:35:02.505Z"
doc_updated_by: "CODER"
description: "Ensure graph codegen runs before build in indexer container and update env files with deployed contract address."
id_source: "generated"
---
## Summary

Updated indexer build to run graph codegen first and set deployed contract address in env files.

## Scope

Updated indexer build script to include codegen; set CONTRACT_ADDRESS to the deployed Base mainnet address in env.example and .env.

## Risks

Indexer build now runs codegen on each build; keep graph schema and ABI in sync to avoid build failures.

## Verify Steps

1) npm --prefix indexer run build\n2) rg -n "CONTRACT_ADDRESS" env.example .env

## Rollback Plan

Revert indexer/package.json and env files to previous values.
