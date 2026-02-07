---
id: "202602051539-TBV1H6"
title: "Mintlify docs formatting via MCP"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify:
  - "manual:docs-review"
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
  hash: "16b53029f9b65e8a09110ca57337c1aac705e8af"
  message: "📝 TBV1H6 add start-here links on docs index"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Pull docs content via MCP, map to Mintlify structure, update docs files and navigation."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Docs reorganized into Mintlify sections, navigation updated, and all judge/judging wording removed; manual spot-check of key pages and links."
events: []
doc_version: 2
doc_updated_at: "2026-02-06T14:54:42.905Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fetch MCP docs content and format documentation to Mintlify rules for docs.solvera.markets."
id_source: "generated"
---
## Summary

Added Mintlify frontmatter across docs and created docs.json navigation for Solvera Markets documentation.

## Scope

Update docs/*.md with Mintlify frontmatter and add docs.json navigation config at repo root.

## Risks

If Mintlify expects a different docs root or navigation schema, docs.json may require adjustments; frontmatter descriptions were auto-derived and might need manual tuning.

## Verify Steps

manual: run Mintlify preview or deploy to confirm navigation and frontmatter render correctly.

## Rollback Plan

Remove docs.json and revert frontmatter additions in docs/*.md.
