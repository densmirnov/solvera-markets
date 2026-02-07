---
id: "202602040441-G8RHH6"
title: "Fix Foundry test root"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "rg \"forge test\" scripts/test.sh"
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
  hash: "52503be7177654039493c84626aa523abf6ed9fd"
  message: "🧪 G8RHH6 run forge tests with contracts root"
comments:
  -
    author: "CODER"
    body: "Start: update forge test invocation to use contracts root."
  -
    author: "CODER"
    body: "Verified: forge test now runs with contracts root so imports resolve."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T04:43:09.419Z"
doc_updated_by: "CODER"
description: "Run forge test with --root contracts so imports resolve."
id_source: "generated"
---
## Summary

Update test script to run forge with contracts root.

## Scope

Modify scripts/test.sh to call forge test --root contracts.

## Risks

Incorrect root could break Foundry tests; verify tests still compile.

## Verify Steps

1) make test\n2) git status --short --untracked-files=no

## Rollback Plan

Revert scripts/test.sh if Foundry tests fail with the new root.
