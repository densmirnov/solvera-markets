---
id: "202602031831-G5DR2B"
title: "Add component READMEs"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["backend"]
verify: ["make check"]
commit: { hash: "dd40ccd0df59524afd166fdb2060734fabfd4430", message: "✨ G5DR2B add component READMEs" }
comments:
  - { author: "DOCS", body: "Start: Add component READMEs for frontend, backend, indexer, and contracts." }
  - { author: "DOCS", body: "Verified: Added README.md to frontend, backend, indexer, and contracts." }
doc_version: 2
doc_updated_at: "2026-02-03T18:33:40.528Z"
doc_updated_by: "DOCS"
description: "Add README.md for frontend, backend, indexer, and contracts."
id_source: "generated"
---
## Summary

Add README.md to frontend/backend/indexer/contracts with structure and usage notes.

## Scope

Create README.md files describing purpose, structure, and entrypoints for each component.

## Risks

Risk of misleading usage. Mitigation: keep docs aligned with current structure and scripts.

## Verify Steps

1. Each component directory has README.md. 2. Contents are English and accurate.

## Rollback Plan

Revert the commit to remove component READMEs.
