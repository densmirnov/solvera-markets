---
id: "202602031755-S8H8JG"
title: "Stage 2.1b schema immutability"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "backend"
verify:
  - "graph codegen && graph build"
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
  hash: "668099976c719a2cee70ce2ee72332901ad66e11"
  message: "✨ S8H8JG add immutable flags and fix ABI"
comments:
  -
    author: "CODER"
    body: "Start: Update Graph schema immutability flags for entities."
  -
    author: "CODER"
    body: "Verified: Schema immutable flags and ABI updated; graph build proceeds with new schema."
events: []
doc_version: 3
doc_updated_at: "2026-02-03T17:59:39.043Z"
doc_updated_by: "CODER"
description: "Update Graph schema with immutable flags to satisfy graph-cli."
sections:
  Summary: "Add immutable flags to Graph entities to satisfy graph-cli."
  Scope: "Mark Intent/Reputation mutable; Offer/EventLog immutable."
  Plan: |-
    1. Implement the change for "Stage 2.1b schema immutability".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Risk of incorrect immutability causing indexer errors. Mitigation: set immutable false for entities updated across events."
  Verify Steps: "1. graph codegen && graph build succeed. 2. Entities have immutable flags."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the commit to restore previous schema."
  Findings: ""
id_source: "generated"
---
## Summary

Add immutable flags to Graph entities to satisfy graph-cli.

## Scope

Mark Intent/Reputation mutable; Offer/EventLog immutable.

## Plan

1. Implement the change for "Stage 2.1b schema immutability".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Risk of incorrect immutability causing indexer errors. Mitigation: set immutable false for entities updated across events.

## Verify Steps

1. graph codegen && graph build succeed. 2. Entities have immutable flags.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore previous schema.

## Findings
