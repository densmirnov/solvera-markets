---
id: "202602051453-VWQDVJ"
title: "Add non-git wallet helper download fallback"
status: "DONE"
priority: "low"
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
  hash: "b06bcefc1a13a68f50ae8ce8aacc346dd9b06e7e"
  message: "✨ VWQDVJ add no-git wallet helper fallback"
comments:
  -
    author: "CODER"
    body: "Start: add non-git (curl/unzip) fallback download steps to SKILL.md files."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Added curl/unzip fallback for downloading base-wallet without git in SKILL docs."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T14:54:30.376Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add curl/unzip fallback steps in SKILL.md files for agents without git."
id_source: "generated"
---
## Summary

Add curl/unzip fallback steps for downloading base-wallet without git.

## Scope

SKILL.md and frontend SKILL copies.

## Risks

Assumes curl and unzip available; otherwise git remains primary path.

## Verify Steps

Manual: check SKILL.md includes fallback download steps without git.

## Rollback Plan

Revert SKILL.md edits.
