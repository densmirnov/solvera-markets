---
id: "202602040538-KPJ0PR"
title: "Stabilize backend tests and coverage"
status: "DONE"
priority: "high"
owner: "TESTER"
revision: 1
depends_on:
  - "202602040538-YWCDG7"
  - "202602040538-YWCDG7"
tags:
  - "backend"
verify:
  - "npm --prefix backend test"
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
  hash: "d5b7b460028c76da4fbf7f5a59b3090a6d0cbd0b"
  message: "🧪 KPJ0PR stabilize backend test DI"
comments:
  -
    author: "TESTER"
    body: "Verified: npm --prefix backend test passed; commit d5b7b460028c applied."
  -
    author: "TESTER"
    body: "Verified: backend test suite passes with updated DI metadata; coverage and API tests remain green."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T06:35:41.802Z"
doc_updated_by: "TESTER"
description: "Eliminate backend test flakiness, ensure coverage thresholds pass consistently."
sections:
  Summary: "Stabilized backend API tests under Nest 11 by explicitly providing constructor metadata for controller DI."
  Scope: "Updated backend/test/api.test.ts to load reflect-metadata and define constructor param types for IntentsController in tests."
  Plan: |-
    1. Implement the change for "Stabilize backend tests and coverage".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "If controller constructor parameters change, the manual metadata array must be updated to keep DI working in tests."
  Verify Steps: "npm --prefix backend test"
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert backend/test/api.test.ts and re-run npm --prefix backend test."
  Findings: ""
id_source: "generated"
---
## Summary

Stabilized backend API tests under Nest 11 by explicitly providing constructor metadata for controller DI.

## Scope

Updated backend/test/api.test.ts to load reflect-metadata and define constructor param types for IntentsController in tests.

## Plan

1. Implement the change for "Stabilize backend tests and coverage".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

If controller constructor parameters change, the manual metadata array must be updated to keep DI working in tests.

## Verify Steps

npm --prefix backend test

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert backend/test/api.test.ts and re-run npm --prefix backend test.

## Findings
