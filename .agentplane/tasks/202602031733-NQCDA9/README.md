---
id: "202602031733-NQCDA9"
title: "Stage 2.2 indexer mappings"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
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
  hash: "9e334ad1abef0fa8ada7f9259ac1194d2cb23615"
  message: "✨ NQCDA9 implement indexer mappings"
comments:
  -
    author: "CODER"
    body: "Start: Implement indexer mappings for contract events (Stage 2.2)."
  -
    author: "CODER"
    body: "Verified: Event handlers added; schema and manifest aligned; mappings use events only (no RPC)."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:42:33.356Z"
doc_updated_by: "CODER"
description: "Implement The Graph mappings for IntentMarketplace events."
id_source: "generated"
---
## Summary

Implement event handlers mapping contract events to entities.

## Scope

Add indexer/src/mappings.ts and update manifest handlers.

## Risks

Risk of incorrect derived fields leading to inconsistent API. Mitigation: define deterministic updates per event.

## Verify Steps

1. Handlers exist for all events. 2. Entities update without RPC reads.

## Rollback Plan

Revert the commit to remove mapping implementation.
