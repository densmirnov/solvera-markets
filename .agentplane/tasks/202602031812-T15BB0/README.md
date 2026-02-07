---
id: "202602031812-T15BB0"
title: "Translate repository to English"
status: "DONE"
priority: "high"
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
  hash: "158bc878d8239226a7f2046c9b07c6a74c32e52f"
  message: "✨ T15BB0 translate repository docs to English"
comments:
  -
    author: "DOCS"
    body: "Start: Translate repository documentation to English."
  -
    author: "DOCS"
    body: "Verified: All repository docs and roadmap translated to English; agentplane-managed files untouched."
events: []
doc_version: 2
doc_updated_at: "2026-02-03T18:23:47.732Z"
doc_updated_by: "DOCS"
description: "Translate all repository documentation and text files to English (excluding agentplane-managed files)."
id_source: "generated"
---
## Summary

Translate repository documentation and text files to English.

## Scope

Translate docs/, ROADMAP.md, CONTRIBUTING.md, and _in/* to English. Exclude agentplane-managed files.

## Risks

Risk of losing nuances during translation. Mitigation: keep structure and technical terms consistent.

## Verify Steps

1. All docs and roadmap are English. 2. No agentplane-managed files modified.

## Rollback Plan

Revert the commit to restore previous language content.
