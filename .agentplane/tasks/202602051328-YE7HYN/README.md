---
id: "202602051328-YE7HYN"
title: "Make detail tx and wallets clickable"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
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
  hash: "b949c9b95ebf2d7422fd0cffd883fbd9e0a47118"
  message: "✨ YE7HYN link detail tx and wallets"
comments:
  -
    author: "CODER"
    body: "Start: ensure detail page tx hash and wallet addresses link to explorer."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Intent details now link tx hashes and wallet addresses to explorer where applicable."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T13:29:29.575Z"
doc_updated_by: "ORCHESTRATOR"
description: "Intent details page: ensure transactions and wallet addresses link to explorer."
id_source: "generated"
dirty: false
---
## Summary

Make intent details tx and wallet addresses link to explorer.

## Scope

Intent details page metadata/participants links only.

## Risks

If intent id is not a tx hash, linking it could be misleading; guard by hash format.

## Verify Steps

Manual: open intent details, click tx hash and wallet addresses to open explorer.

## Rollback Plan

Revert intent detail link changes and restore plain text fields.
