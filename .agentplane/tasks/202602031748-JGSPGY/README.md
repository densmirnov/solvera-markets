---
id: "202602031748-JGSPGY"
title: "Docs nav update 2"
status: "DONE"
priority: "low"
owner: "DOCS"
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
  hash: "607ab5d374b7aa21365278c51d27b9ee412dbdfb"
  message: "✨ JGSPGY update docs navigation for Stage 2"
comments:
  -
    author: "DOCS"
    body: "Start: Update docs/README navigation for Stage 2 docs."
  -
    author: "DOCS"
    body: "Verified: docs/README includes Stage 2 docs links and navigation entries."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T17:50:10.285Z"
doc_updated_by: "DOCS"
description: "Update docs/README.md navigation for indexer/backend docs."
id_source: "generated"
---
## Summary

Update docs/README.md navigation for Stage 2 docs.

## Scope

Add links for docs/16-indexer-model.md, docs/17-backend-api.md, docs/18-ops-indexer-backend.md.

## Risks

Risk of stale navigation. Mitigation: update README with every new doc.

## Verify Steps

1. docs/README.md includes new docs. 2. git status shows only README change.

## Rollback Plan

Revert the commit to restore previous docs/README.md.
