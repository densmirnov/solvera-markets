---
id: "202602031805-PTPNED"
title: "Stage 2.10 engineering rules"
status: "DONE"
priority: "med"
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
  hash: "29cd8b06256095826198f0dd77f34916e648cf82"
  message: "✨ PTPNED update engineering rules and standards"
comments:
  -
    author: "DOCS"
    body: "Start: Update engineering rules for linting/formatting and docs updates."
  -
    author: "DOCS"
    body: "Verified: Engineering standards documented; lint/fix requirements added to CONTRIBUTING and docs."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:08:21.808Z"
doc_updated_by: "DOCS"
description: "Update coding principles: linting/formatters required, docs update rules."
id_source: "generated"
---
## Summary

Update engineering rules: linting, formatting, and documentation updates required.

## Scope

Update CONTRIBUTING.md and add docs/20-engineering-standards.md; refresh docs/README.md.

## Risks

Risk of inconsistent rules across docs. Mitigation: centralize in engineering standards doc and reference it.

## Verify Steps

1. CONTRIBUTING and engineering standards updated. 2. Docs nav includes standards.

## Rollback Plan

Revert the commit to restore previous rules and docs.
