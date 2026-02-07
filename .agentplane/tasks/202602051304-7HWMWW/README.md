---
id: "202602051304-7HWMWW"
title: "Tighten Marketplace density toward 1inch aesthetic"
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
  hash: "d3282f02c680c3e38fd24b36c339c94db2c88a5f"
  message: "✨ 7HWMWW tighten marketplace density"
comments:
  -
    author: "CODER"
    body: "Start: Review 1inch.com aesthetics and tighten Marketplace typography/spacing for a denser, cleaner layout."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Marketplace spacing and typography tightened; layout density increased while keeping table interactions intact."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T13:05:32.044Z"
doc_updated_by: "ORCHESTRATOR"
description: "Adjust Marketplace typography/spacing to a denser, cleaner layout inspired by 1inch.com aesthetics; keep interactions intact."
id_source: "generated"
dirty: false
---
## Summary

Tighten Marketplace typography/spacing for a denser, cleaner layout while preserving interactions.

## Scope

Marketplace page table, filters, and density-related styles only.

## Risks

Over-tight spacing can reduce readability, especially on smaller screens; balance density with legibility.

## Verify Steps

Manual: open Marketplace and confirm tighter layout, readable text, and working clicks.

## Rollback Plan

Revert Marketplace spacing classes and the marketplace-dense styles.
