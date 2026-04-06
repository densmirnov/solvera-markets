---
id: "202602040437-57ZEJB"
title: "Add Foundry remappings"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "code"
verify:
  - "rg \"remappings\" contracts/foundry.toml"
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
  hash: "7a8cc46fc502ccee126b25974be8a22ba9db278e"
  message: "🧭 57ZEJB add forge remappings"
comments:
  -
    author: "CODER"
    body: "Start: add Foundry remappings for forge-std imports."
  -
    author: "CODER"
    body: "Verified: Foundry remappings added so forge-std imports resolve during lint."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T04:39:59.700Z"
doc_updated_by: "CODER"
description: "Configure forge-std remappings so forge lint resolves imports."
sections:
  Summary: "Configure Foundry remappings for forge-std imports."
  Scope: "Add remappings to contracts/foundry.toml so forge lint can resolve forge-std."
  Plan: |-
    1. Implement the change for "Add Foundry remappings".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Incorrect remapping could break forge builds; verify lint and tests."
  Verify Steps: "1) forge lint\\n2) git status --short --untracked-files=no"
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove remappings if they conflict with Foundry configuration."
  Findings: ""
id_source: "generated"
---
## Summary

Configure Foundry remappings for forge-std imports.

## Scope

Add remappings to contracts/foundry.toml so forge lint can resolve forge-std.

## Plan

1. Implement the change for "Add Foundry remappings".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Incorrect remapping could break forge builds; verify lint and tests.

## Verify Steps

1) forge lint\n2) git status --short --untracked-files=no

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove remappings if they conflict with Foundry configuration.

## Findings
