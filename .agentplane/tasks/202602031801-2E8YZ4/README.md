---
id: "202602031801-2E8YZ4"
title: "Docs nav update 3"
status: "DONE"
priority: "low"
owner: "DOCS"
depends_on: []
tags: ["backend"]
verify: ["make check"]
commit: { hash: "4f4ab6d776329186fe9cf55f818bc377efe990aa", message: "✨ 2E8YZ4 add subgraph doc to nav" }
comments:
  - { author: "DOCS", body: "Start: Update docs README to include subgraph endpoints doc." }
  - { author: "DOCS", body: "Verified: docs/README includes subgraph endpoints document in navigation." }
doc_version: 2
doc_updated_at: "2026-02-03T18:02:38.765Z"
doc_updated_by: "DOCS"
description: "Update docs/README.md with subgraph endpoints doc."
id_source: "generated"
---
## Summary

Update docs README to include subgraph endpoints doc.

## Scope

Add docs/19-subgraph-endpoints.md to docs/README.md navigation.

## Risks

Risk of stale docs nav. Mitigation: update README alongside new docs.

## Verify Steps

1. docs/README.md includes the subgraph endpoints doc. 2. git status shows only README update.

## Rollback Plan

Revert the commit to restore previous docs/README.md navigation.
