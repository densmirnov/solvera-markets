---
id: "202602041553-KX39EX"
title: "Soften UI borders"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["frontend"]
verify: ["1"]
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: soften borders and surfaces with modern polish." }
doc_version: 2
doc_updated_at: "2026-02-04T15:55:12.558Z"
doc_updated_by: "ORCHESTRATOR"
description: "Reduce harsh borders, add soft surfaces and modern 1inch-like polish."
id_source: "generated"
---
## Summary

Softened borders and surfaces with glassy gradients; reduced harsh lines and added modern polish to cards, tables, and header.

## Scope

Updated index.css for softer borders and new surface styles; applied surface classes to Home, Docs, Marketplace, and adjusted header border.

## Risks

Glassy backgrounds rely on backdrop-filter; ensure acceptable fallback for older browsers.

## Verify Steps

1. npm run build --prefix frontend

## Rollback Plan

Revert index.css and page surface changes via agentplane commit or git revert.
