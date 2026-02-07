---
id: "202602031733-TR9QAA"
title: "Stage 2.1 indexer schema"
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
  hash: "92524a6f2fc7c05bc04d65034afef284f6cdd45d"
  message: "✨ TR9QAA add indexer schema and manifest"
comments:
  -
    author: "CODER"
    body: "Start: Define indexer schema and subgraph manifest for Stage 2.1."
  -
    author: "CODER"
    body: "Verified: Added schema, manifest, ABI, and model doc for indexer."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:40:44.628Z"
doc_updated_by: "CODER"
description: "Define indexer data model, schema.graphql, and subgraph manifest."
id_source: "generated"
---
## Summary

Define indexer data model and Graph schema/manifest for events.

## Scope

Create indexer/schema.graphql, indexer/subgraph.yaml, and docs model file.

## Risks

Risk of schema mismatch with contract events. Mitigation: base schema on docs/12-abi-events.md.

## Verify Steps

1. schema.graphql includes all event-derived entities. 2. subgraph.yaml references ABI and data source.

## Rollback Plan

Revert the commit to remove schema and manifest.
