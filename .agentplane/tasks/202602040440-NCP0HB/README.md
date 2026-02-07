---
id: "202602040440-NCP0HB"
title: "Fix Foundry script root"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "rg \"forge\" scripts/fmt.sh scripts/lint.sh"
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
  hash: "b9258b78c8fe8bc16a5a5d059066e259a9381763"
  message: "🧭 NCP0HB run forge with contracts root"
comments:
  -
    author: "CODER"
    body: "Start: update scripts to run forge with contracts root."
  -
    author: "CODER"
    body: "Verified: Foundry fmt/lint now run with contracts root for correct remappings."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T04:41:28.158Z"
doc_updated_by: "CODER"
description: "Run forge fmt/lint with --root contracts so remappings resolve."
id_source: "generated"
---
## Summary

Adjust repo scripts to run Foundry commands with contracts as root.

## Scope

Update scripts/fmt.sh and scripts/lint.sh to call forge with --root contracts.

## Risks

Changing root path could affect other Foundry tooling; verify lint/test still run.

## Verify Steps

1) make lint\n2) git status --short --untracked-files=no

## Rollback Plan

Revert script changes if Foundry commands fail with new root.
