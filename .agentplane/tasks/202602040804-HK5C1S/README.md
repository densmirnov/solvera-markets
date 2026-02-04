---
id: "202602040804-HK5C1S"
title: "Fix frontend Docker build for SKILL.md"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build"]
commit: null
comments:
  - { author: "CODER", body: "Start: fix Docker build to include SKILL.md for frontend prebuild sync." }
  - { author: "CODER", body: "Start: Fix frontend Docker build by copying SKILL.md into build context and tracking task artifact." }
doc_version: 2
doc_updated_at: "2026-02-04T08:07:44.576Z"
doc_updated_by: "CODER"
description: "Ensure frontend Docker build includes SKILL.md so prebuild sync succeeds."
id_source: "generated"
---
## Summary

Added SKILL.md to frontend Docker build context to satisfy prebuild sync.

## Scope

Updated frontend/Dockerfile to copy SKILL.md during build.

## Risks

If SKILL.md is renamed or moved, Docker build will fail unless the copy list is updated.

## Verify Steps

docker compose up -d --build

## Rollback Plan

Revert frontend/Dockerfile changes and rebuild containers.
