---
id: "202602040630-S3FVT9"
title: "Document npm audit exception for indexer"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags: ["backend"]
verify: ["make check"]
commit: { hash: "de879ef78698d927473bde77df8af9faba5fdbd1", message: "🛡️ S3FVT9 add audit exception workflow" }
comments:
  - { author: "DOCS", body: "Start: formalize npm audit exception for indexer warnings and document rationale." }
  - { author: "DOCS", body: "Verified: make check includes npm audit --audit-level=high and documents indexer exception." }
doc_version: 2
doc_updated_at: "2026-02-04T06:35:21.479Z"
doc_updated_by: "DOCS"
description: "Add formal npm audit exception in CI and document accepted indexer audit warnings."
id_source: "generated"
---
## Summary

Added a formal npm audit check with a documented exception for indexer moderate advisories.

## Scope

Added scripts/audit.sh, wired audit into Makefile and scripts/check.sh, and documented audit exception in docs/20-engineering-standards.md and docs/13-audit-checklist.md.

## Risks

Audit exceptions may mask emerging issues; must be revisited when Graph CLI or transitive dependencies update.

## Verify Steps

make check

## Rollback Plan

Revert audit script and documentation updates; restore previous Makefile/scripts/check.sh.
