---
id: "202602040437-57ZEJB"
title: "Add Foundry remappings"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["code"]
verify: ["rg \"remappings\" contracts/foundry.toml"]
commit: { hash: "7a8cc46fc502ccee126b25974be8a22ba9db278e", message: "🧭 57ZEJB add forge remappings" }
comments:
  - { author: "CODER", body: "Start: add Foundry remappings for forge-std imports." }
  - { author: "CODER", body: "Verified: Foundry remappings added so forge-std imports resolve during lint." }
doc_version: 2
doc_updated_at: "2026-02-04T04:39:59.700Z"
doc_updated_by: "CODER"
description: "Configure forge-std remappings so forge lint resolves imports."
id_source: "generated"
---
## Summary

Configure Foundry remappings for forge-std imports.

## Scope

Add remappings to contracts/foundry.toml so forge lint can resolve forge-std.

## Risks

Incorrect remapping could break forge builds; verify lint and tests.

## Verify Steps

1) forge lint\n2) git status --short --untracked-files=no

## Rollback Plan

Remove remappings if they conflict with Foundry configuration.
