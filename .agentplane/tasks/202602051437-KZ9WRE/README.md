---
id: "202602051437-KZ9WRE"
title: "Link wallet skill and download instructions"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify:
  - "manual"
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
  hash: "d9231ba89541095b7ef4beb1f05180f881bf4d18"
  message: "✨ KZ9WRE add wallet helper link and download steps"
comments:
  -
    author: "CODER"
    body: "Start: add wallet skill link and download/setup steps in SKILL.md (and copies) for agents with network-only access."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Added wallet helper skill link and sparse-checkout download steps in SKILL.md and copies."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T14:44:32.780Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add link from root SKILL.md to base-wallet/SKILL.md and include download/setup steps for agents with only network + SKILL.md."
id_source: "generated"
dirty: false
---
## Summary

Add wallet helper skill link and sparse-checkout download steps to SKILL.md and copies.

## Scope

SKILL.md, frontend/SKILL.md, and frontend/public/SKILL.md wallet helper instructions.

## Risks

Instructions assume git is available; add alternative if needed.

## Verify Steps

Manual: read wallet helper section in SKILL.md and confirm download/setup steps are present.

## Rollback Plan

Revert the SKILL.md edits.
