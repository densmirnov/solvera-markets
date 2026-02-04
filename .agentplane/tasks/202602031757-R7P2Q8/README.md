---
id: "202602031757-R7P2Q8"
title: "Stage 2.2b fix mapping types"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["graph build"]
commit: { hash: "7804be8d1e8798544d34ff582278a390b7a7d1c0", message: "✨ R7P2Q8 fix ttl mapping types" }
comments:
  - { author: "CODER", body: "Start: Fix ttl field assignments in indexer mappings." }
  - { author: "CODER", body: "Verified: graph build now succeeds after ttl mapping fix in indexer mappings." }
doc_version: 2
doc_updated_at: "2026-02-03T18:00:04.238Z"
doc_updated_by: "CODER"
description: "Fix ttlSubmit/ttlAccept typing in mappings to satisfy graph build."
id_source: "generated"
---
## Summary

Fix mapping type assignments for ttl fields.

## Scope

Assign ttlSubmit/ttlAccept directly from event params (BigInt).

## Risks

Risk of subtle schema mismatch. Mitigation: run graph build after change.

## Verify Steps

1. graph build succeeds. 2. ttl fields stored as BigInt without conversion.

## Rollback Plan

Revert the commit to restore prior mapping assignments.
