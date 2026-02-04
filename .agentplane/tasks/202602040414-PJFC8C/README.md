---
id: "202602040414-PJFC8C"
title: "Stage 4.2a agent skill guide"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["frontend"]
verify: ["rg \"Solvera Skill\" frontend/SKILL.md"]
commit: { hash: "3cd678e1be8a1144304e3a78351c32f5cc9f33eb", message: "📝 PJFC8C add frontend skill guide" }
comments:
  - { author: "DOCS", body: "Start: write frontend SKILL.md with agent integration guidance." }
  - { author: "DOCS", body: "Verified: frontend/SKILL.md provides agent integration guidance aligned with API behavior." }
doc_version: 2
doc_updated_at: "2026-02-04T04:22:47.452Z"
doc_updated_by: "DOCS"
description: "Create frontend/SKILL.md with best practices for agents using Solvera Markets."
id_source: "generated"
---
## Summary

Write frontend/SKILL.md with agent integration best practices.

## Scope

Create frontend/SKILL.md describing agent capabilities, endpoints, and safe usage patterns.

## Risks

Guidance might diverge from actual API; keep in sync with docs/17-backend-api.md.

## Verify Steps

1) rg "Solvera Skill" frontend/SKILL.md\n2) git status --short --untracked-files=no

## Rollback Plan

Remove frontend/SKILL.md if guidance is incorrect and needs rewrite.
