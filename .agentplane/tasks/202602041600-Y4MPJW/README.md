---
id: "202602041600-Y4MPJW"
title: "Refine typography + reveal glints"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "1"
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
  hash: "e0ab6248bced2466589c461558045c4b50fac64f"
  message: "✨ Y4MPJW refine typography + glint reveals"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: refine typography/spacing and add glint/reveal animations."
  -
    author: "ORCHESTRATOR"
    body: "Verified: npm run build --prefix frontend succeeded; typography scale and animations updated."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T16:03:59.308Z"
doc_updated_by: "ORCHESTRATOR"
description: "Adjust typography/spacing closer to 1inch feel and add subtle glint/reveal animations with reduced-motion support."
id_source: "generated"
---
## Summary

Adjusted typography scale/spacing toward 1inch feel and added glint/reveal animations across key sections.

## Scope

Updated index.css typography scale, glint/reveal keyframes, and spacing; applied hero-glint and reveal classes on Home, Docs, and Marketplace; adjusted Layout padding and H1 defaults.

## Risks

Glint/reveal animations may feel busy if overused; respects reduced-motion settings.

## Verify Steps

1. npm run build --prefix frontend

## Rollback Plan

Revert index.css, Typography.tsx, Layout.tsx, and page updates via agentplane commit or git revert.
