---
id: "202602041553-KX39EX"
title: "Soften UI borders"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
revision: 1
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
  hash: "9aab4f387a271bb889edc87bea49cd55eab7b63a"
  message: "✨ KX39EX soften borders + glass surfaces"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: soften borders and surfaces with modern polish."
  -
    author: "ORCHESTRATOR"
    body: "Verified: npm run build --prefix frontend succeeded; borders softened and surfaces updated."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T15:55:49.362Z"
doc_updated_by: "ORCHESTRATOR"
description: "Reduce harsh borders, add soft surfaces and modern 1inch-like polish."
sections:
  Summary: "Softened borders and surfaces with glassy gradients; reduced harsh lines and added modern polish to cards, tables, and header."
  Scope: "Updated index.css for softer borders and new surface styles; applied surface classes to Home, Docs, Marketplace, and adjusted header border."
  Plan: |-
    1. Implement the change for "Soften UI borders".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Glassy backgrounds rely on backdrop-filter; ensure acceptable fallback for older browsers."
  Verify Steps: "1. npm run build --prefix frontend"
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert index.css and page surface changes via agentplane commit or git revert."
  Findings: ""
id_source: "generated"
---
## Summary

Softened borders and surfaces with glassy gradients; reduced harsh lines and added modern polish to cards, tables, and header.

## Scope

Updated index.css for softer borders and new surface styles; applied surface classes to Home, Docs, Marketplace, and adjusted header border.

## Plan

1. Implement the change for "Soften UI borders".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Glassy backgrounds rely on backdrop-filter; ensure acceptable fallback for older browsers.

## Verify Steps

1. npm run build --prefix frontend

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert index.css and page surface changes via agentplane commit or git revert.

## Findings
