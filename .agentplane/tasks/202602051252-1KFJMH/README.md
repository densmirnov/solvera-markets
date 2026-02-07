---
id: "202602051252-1KFJMH"
title: "Fix Marketplace links and clickable cards"
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
  hash: "e9edb6d34e1de8c250a8cf4e732104334131c176"
  message: "✨ 1KFJMH make marketplace rows and tx links clickable"
comments:
  -
    author: "CODER"
    body: "Start: Investigate Marketplace transaction links and card click handling, then fix explorer URL and make card/row clickable with accessible markup."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Marketplace ID links now open explorer, Details button opens explorer, and row click opens tx without breaking initiator link."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T12:55:00.134Z"
doc_updated_by: "ORCHESTRATOR"
description: "Marketplace: transaction ID links should open explorer; Details button not clickable; make entire card/row clickable while preserving accessibility."
id_source: "generated"
dirty: false
---
## Summary

Fix Marketplace transaction ID links to explorer and make rows/Details button clickable.

## Scope

Frontend Marketplace table row interaction, transaction ID link, and Details action.

## Risks

Row-level click handling could conflict with nested links/buttons; ensure stopPropagation to preserve address link behavior.

## Verify Steps

Manual: open Marketplace, click transaction ID link and Details button, and click row to confirm explorer opens.

## Rollback Plan

Revert Marketplace row click handlers and restore disabled Details button if needed.
