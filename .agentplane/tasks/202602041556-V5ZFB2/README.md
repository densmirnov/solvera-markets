---
id: "202602041556-V5ZFB2"
title: "Boost hero gradient + magnetic hovers"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["frontend"]
verify: ["1"]
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: boost hero gradient and add subtle magnetic hover." }
doc_version: 2
doc_updated_at: "2026-02-04T15:58:28.376Z"
doc_updated_by: "ORCHESTRATOR"
description: "Strengthen hero gradient, enhance layered surfaces, add subtle magnetic hover on buttons."
id_source: "generated"
---
## Summary

Enhanced hero gradients and surface glow; added subtle magnetic hover on buttons for a more premium feel.

## Scope

Adjusted background gradients, button hover treatment, and surface glow in index.css; marked buttons for smoother transform rendering.

## Risks

Heavier gradients and hover effects may increase paint costs on low-end devices; reduced motion users are respected.

## Verify Steps

1. npm run build --prefix frontend

## Rollback Plan

Revert index.css and Button.tsx changes via agentplane commit or git revert.
