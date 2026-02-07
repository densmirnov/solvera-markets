---
id: "202602040444-M4S9RP"
title: "Fix indexer test script"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify:
  - "rg \"test\" indexer/package.json"
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
  hash: "504f580aa56118b105d75c772f09cd2ec1bb7130"
  message: "🧪 M4S9RP use graph test for indexer"
comments:
  -
    author: "CODER"
    body: "Start: update indexer test script to graph test CLI."
  -
    author: "CODER"
    body: "Verified: indexer test script now uses graph test to run subgraph tests."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T04:45:55.513Z"
doc_updated_by: "CODER"
description: "Update indexer npm test script to use graph test CLI."
id_source: "generated"
---
## Summary

Switch indexer tests to graph test CLI.

## Scope

Update indexer package.json test script to use graph test so matchstick-as binary is not required.

## Risks

Graph test may download binaries and require network; ensure CI allows it.

## Verify Steps

1) npm --prefix indexer test\n2) git status --short --untracked-files=no

## Rollback Plan

Restore the previous test script if graph test is unsuitable.
