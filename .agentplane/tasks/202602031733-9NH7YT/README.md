---
id: "202602031733-9NH7YT"
title: "Stage 2.3 indexer tooling"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["make check"]
commit: { hash: "3bd8ff798e1b5dbff0d57ce7aaac173d5b365299", message: "✨ 9NH7YT add indexer tooling" }
comments:
  - { author: "CODER", body: "Start: Add indexer tooling (package.json, tsconfig, scripts)." }
  - { author: "CODER", body: "Verified: Added indexer package.json and tsconfig; scripts defined for codegen/build." }
doc_version: 2
doc_updated_at: "2026-02-03T17:43:17.405Z"
doc_updated_by: "CODER"
description: "Add indexer package.json, tsconfig, and build scripts."
id_source: "generated"
---
## Summary

Add indexer tooling (package.json, tsconfig, build scripts).

## Scope

Create indexer/package.json, tsconfig, and npm scripts for codegen/build.

## Risks

Risk of unpinned tool versions. Mitigation: set explicit devDependencies.

## Verify Steps

1. npm scripts present. 2. codegen/build commands documented.

## Rollback Plan

Revert the commit to remove indexer tooling files.
