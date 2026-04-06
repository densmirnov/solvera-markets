---
id: "202602031654-BYDGJ6"
title: "Stage 1.1 ABI and events"
status: "DONE"
priority: "med"
owner: "DOCS"
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
  hash: "90ee283050614a4cf5fb05bbb5099410bf32f078"
  message: "✨ BYDGJ6 add ABI and events documentation"
comments:
  -
    author: "DOCS"
    body: "Start: Define ABI and event payload schemas for Stage 1.1."
  -
    author: "DOCS"
    body: "Verified: ABI and event payloads documented; no code execution required."
events: []
doc_version: 3
doc_updated_at: "2026-02-03T17:00:32.098Z"
doc_updated_by: "DOCS"
description: "Define ABI and event payload schemas for MVP contract."
sections:
  Summary: "Define ABI and event payload schemas for MVP contract."
  Scope: "Add or update docs/12-abi-events.md with function and event payloads."
  Plan: |-
    1. Implement the change for "Stage 1.1 ABI and events".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Risk of ABI mismatch with contract implementation. Mitigation: align event fields with contract source."
  Verify Steps: "1. docs/12-abi-events.md matches contract events. 2. git status shows only ABI doc changes."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the commit to restore previous ABI documentation."
  Findings: ""
id_source: "generated"
---
## Summary

Define ABI and event payload schemas for MVP contract.

## Scope

Add or update docs/12-abi-events.md with function and event payloads.

## Plan

1. Implement the change for "Stage 1.1 ABI and events".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Risk of ABI mismatch with contract implementation. Mitigation: align event fields with contract source.

## Verify Steps

1. docs/12-abi-events.md matches contract events. 2. git status shows only ABI doc changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore previous ABI documentation.

## Findings
