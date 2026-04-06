---
id: "202602031709-HHWFYX"
title: "Stage 1.4b fix tests"
status: "DONE"
priority: "high"
owner: "TESTER"
revision: 1
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
  hash: "8898cd5700f1550c62f3892137586e243952e013"
  message: "✨ HHWFYX fix test address literals"
comments:
  -
    author: "TESTER"
    body: "Start: Fix invalid address literals in contract tests."
  -
    author: "TESTER"
    body: "Verified: Fixed invalid address literals so Foundry can compile tests."
events: []
doc_version: 3
doc_updated_at: "2026-02-03T17:10:46.100Z"
doc_updated_by: "TESTER"
description: "Fix invalid test addresses and allow Foundry to compile for deploys."
sections:
  Summary: "Fix invalid test addresses so Foundry compiles for deploys."
  Scope: "Update address literals in contracts/test/IntentMarketplace.t.sol to valid hex values."
  Plan: |-
    1. Implement the change for "Stage 1.4b fix tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Risk of changing test semantics unintentionally. Mitigation: keep same roles, only fix literals."
  Verify Steps: "1. forge test compiles. 2. No invalid address literals remain."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the commit to restore previous test file."
  Findings: ""
id_source: "generated"
---
## Summary

Fix invalid test addresses so Foundry compiles for deploys.

## Scope

Update address literals in contracts/test/IntentMarketplace.t.sol to valid hex values.

## Plan

1. Implement the change for "Stage 1.4b fix tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Risk of changing test semantics unintentionally. Mitigation: keep same roles, only fix literals.

## Verify Steps

1. forge test compiles. 2. No invalid address literals remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore previous test file.

## Findings
