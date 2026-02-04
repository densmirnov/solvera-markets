---
id: "202602040431-2G62AX"
title: "Fix indexer lint ignores"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["rg \"generated\" indexer/eslint.config.js"]
commit: { hash: "b9a54498598a4bf0b4eb5725cbd741093b3222ca", message: "🧹 2G62AX ignore indexer generated lint" }
comments:
  - { author: "CODER", body: "Start: ignore generated indexer files in lint and set module type." }
  - { author: "CODER", body: "Verified: indexer lint ignores generated files and package is marked as module." }
doc_version: 2
doc_updated_at: "2026-02-04T04:32:50.176Z"
doc_updated_by: "CODER"
description: "Exclude generated code from eslint and set module type for indexer."
id_source: "generated"
---
## Summary

Ignore generated indexer files in lint and mark package as module.

## Scope

Update indexer eslint config to ignore generated files and set package.json type to module.

## Risks

Ignoring generated files could hide issues; only exclude generated artifacts.

## Verify Steps

1) make lint\n2) git status --short --untracked-files=no

## Rollback Plan

Revert lint config changes if generated code must be linted.
