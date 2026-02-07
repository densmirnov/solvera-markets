---
id: "202602031722-HCBFXC"
title: "Ignore Foundry artifacts"
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
  hash: "a111a6ee0eb43a92ed3da50634add69fd84f5e31"
  message: "✨ HCBFXC ignore Foundry artifacts"
comments:
  -
    author: "CODER"
    body: "Start: Ignore Foundry broadcast/cache artifacts in .gitignore."
  -
    author: "CODER"
    body: "Verified: Foundry broadcast/cache directories ignored in .gitignore."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:23:09.094Z"
doc_updated_by: "CODER"
description: "Add Foundry broadcast/cache directories to .gitignore."
id_source: "generated"
---
## Summary

Ignore Foundry broadcast/cache directories in git.

## Scope

Update .gitignore to include contracts/broadcast and contracts/cache.

## Risks

Risk of ignoring required artifacts. Mitigation: only ignore generated broadcast/cache outputs.

## Verify Steps

1. .gitignore includes contracts/broadcast and contracts/cache. 2. git status no longer shows those directories.

## Rollback Plan

Revert the commit to restore previous .gitignore.
