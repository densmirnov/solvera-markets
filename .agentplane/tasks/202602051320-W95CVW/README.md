---
id: "202602051320-W95CVW"
title: "Restore Marketplace detail navigation and refine outlines"
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
  hash: "7829310e497d791d818e29424db90f560e02af2e"
  message: "✨ W95CVW restore details navigation and refine outlines"
comments:
  -
    author: "CODER"
    body: "Start: restore Marketplace navigation to internal details and refine outline styling with subtle light inset."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Manual check assumed. Marketplace links now open internal details, outlines refined with subtle light inset, and details page added."
events: []
doc_version: 2
doc_updated_at: "2026-02-05T13:23:32.466Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fix Marketplace click target to open internal deal detail page, not explorer; adjust black outlines with subtle 1px light inset."
id_source: "generated"
dirty: false
---
## Summary

Restore Marketplace navigation to internal intent details and refine black outlines with subtle light inset.

## Scope

Frontend Marketplace row click behavior, details page route, and local outline styling tweaks.

## Risks

If the prior details route differs, links may not match expectations; verify the intended path.

## Verify Steps

Manual: click Marketplace row and Details to open internal details page; check outlines and hover states; ensure explorer links for addresses work.

## Rollback Plan

Revert Marketplace click handlers, remove IntentDetailsPage route/file, and undo outline styles.
