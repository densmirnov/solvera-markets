---
id: "202602031720-M5KDXZ"
title: "Docs nav update"
status: "DONE"
priority: "low"
owner: "DOCS"
depends_on: []
tags: ["code"]
verify: ["make check"]
commit: { hash: "c0385ae8254b7af3647887ab36e6e1e1117d39cb", message: "✨ M5KDXZ update docs navigation" }
comments:
  - { author: "DOCS", body: "Start: Update docs/README navigation with new documents." }
  - { author: "DOCS", body: "Verified: docs/README navigation updated to include new docs." }
doc_version: 2
doc_updated_at: "2026-02-03T17:21:54.142Z"
doc_updated_by: "DOCS"
description: "Update docs/README.md navigation to include newly added documents."
id_source: "generated"
---
## Summary

Update docs README navigation to include new documentation files.

## Scope

Add links for audit checklist, deployments, and mainnet checklist in docs/README.md.

## Risks

Risk of stale navigation if docs change. Mitigation: keep README updated alongside doc additions.

## Verify Steps

1. docs/README.md lists new docs. 2. git status shows only README update.

## Rollback Plan

Revert the commit to restore previous docs/README.md navigation.
