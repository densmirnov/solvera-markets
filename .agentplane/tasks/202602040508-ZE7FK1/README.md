---
id: "202602040508-ZE7FK1"
title: "Contract tests and coverage"
status: "DONE"
priority: "high"
owner: "TESTER"
revision: 1
depends_on: []
tags:
  - "code"
verify:
  - "rg \"coverage\" scripts"
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
  hash: "c67592b0ff60af73d490ee22afff6949af0d315d"
  message: "🧪 ZE7FK1 expand contract tests and coverage"
comments:
  -
    author: "TESTER"
    body: "Start: expand contract tests and add coverage thresholds."
  -
    author: "TESTER"
    body: "Verified: contract tests expanded and coverage script/Makefile updated with thresholds."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T05:22:59.724Z"
doc_updated_by: "TESTER"
description: "Expand contract tests and add coverage thresholds for Foundry."
sections:
  Summary: "Add contract tests and enforce coverage thresholds for Foundry."
  Scope: "Extend IntentMarketplace tests and add coverage script with minimum thresholds."
  Plan: |-
    1. Implement the change for "Contract tests and coverage".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Coverage thresholds may fail until tests are sufficient; adjust tests before raising thresholds."
  Verify Steps: "1) forge test --root contracts\\n2) scripts/coverage.sh\\n3) git status --short --untracked-files=no"
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert contract tests and coverage thresholds if they block builds."
  Findings: ""
id_source: "generated"
---
## Summary

Add contract tests and enforce coverage thresholds for Foundry.

## Scope

Extend IntentMarketplace tests and add coverage script with minimum thresholds.

## Plan

1. Implement the change for "Contract tests and coverage".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Coverage thresholds may fail until tests are sufficient; adjust tests before raising thresholds.

## Verify Steps

1) forge test --root contracts\n2) scripts/coverage.sh\n3) git status --short --untracked-files=no

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert contract tests and coverage thresholds if they block builds.

## Findings
