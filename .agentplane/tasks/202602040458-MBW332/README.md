---
id: "202602040458-MBW332"
title: "Ignore indexer test artifacts"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["rg \"tests/.docker\" indexer/.gitignore"]
commit: { hash: "80123883eef9df23e82cf208168423ed69c98244", message: "🧹 MBW332 ignore graph test artifacts" }
comments:
  - { author: "CODER", body: "Start: ignore graph test artifacts and remove generated files." }
  - { author: "CODER", body: "Verified: indexer gitignore now excludes graph test artifacts." }
doc_version: 2
doc_updated_at: "2026-02-04T05:00:14.852Z"
doc_updated_by: "CODER"
description: "Add graph test output artifacts to indexer/.gitignore and remove generated files."
id_source: "generated"
---
## Summary

Ignore graph test artifacts and remove generated files.

## Scope

Update indexer/.gitignore for graph test artifacts and delete current test output files.

## Risks

Over-ignoring could hide relevant test assets; only ignore generated artifacts.

## Verify Steps

1) git status --short\n2) rg "tests/.docker" indexer/.gitignore

## Rollback Plan

Remove ignore entries if artifacts should be tracked for debugging.
