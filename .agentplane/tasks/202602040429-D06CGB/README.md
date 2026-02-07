---
id: "202602040429-D06CGB"
title: "Fix frontend lint dependency"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify:
  - "rg \"eslint\" frontend/package.json"
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
  hash: "88c9bf428d305583fd958110939a0dc6a2498153"
  message: "🧹 D06CGB align frontend eslint versions"
comments:
  -
    author: "CODER"
    body: "Start: align frontend eslint versions to resolve peer dependency error."
  -
    author: "CODER"
    body: "Verified: frontend eslint versions aligned for compatible dependency tree."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T04:30:39.533Z"
doc_updated_by: "CODER"
description: "Resolve eslint peer dependency conflict in frontend by aligning eslint versions."
id_source: "generated"
---
## Summary

Align frontend eslint dependencies to resolve peer conflicts.

## Scope

Update frontend/package.json eslint and @eslint/js versions to compatible range and reinstall dependencies.

## Risks

Version mismatch could break lint config; verify lint runs.

## Verify Steps

1) npm --prefix frontend install\n2) npm --prefix frontend run lint\n3) git status --short --untracked-files=no

## Rollback Plan

Revert frontend/package.json dependency changes if lint fails.
