---
id: "202602031723-H005F6"
title: "Ignore contracts broadcast"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
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
  hash: "9789ad0dd2f6de0b555a7a71797016e93449281b"
  message: "✨ H005F6 ignore broadcast outputs"
comments:
  -
    author: "CODER"
    body: "Start: Ignore contracts broadcast outputs in contracts/.gitignore."
  -
    author: "CODER"
    body: "Verified: contracts/.gitignore now ignores broadcast outputs."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:24:52.572Z"
doc_updated_by: "CODER"
description: "Update contracts/.gitignore to ignore broadcast logs."
id_source: "generated"
---
## Summary

Update contracts/.gitignore to ignore Foundry broadcast outputs.

## Scope

Remove broadcast negation and ignore broadcast outputs in contracts/.gitignore.

## Risks

Risk of hiding useful logs. Mitigation: keep artifacts in local files only.

## Verify Steps

1. contracts/.gitignore ignores broadcast. 2. git status no longer shows contracts/broadcast.

## Rollback Plan

Revert the commit to restore previous contracts/.gitignore.
