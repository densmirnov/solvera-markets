---
id: "202602040755-2ARRWK"
title: "Sync SKILL.md into public on build"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["npm --prefix frontend run build"]
commit: { hash: "090f3c0b7a117134ced7011407b78961247be720", message: "🔧 2ARRWK sync SKILL.md on build" }
comments:
  - { author: "CODER", body: "Start: ensure SKILL.md syncs into frontend/public during builds." }
  - { author: "CODER", body: "Verified: prebuild sync copies SKILL.md into public and frontend build succeeds." }
doc_version: 2
doc_updated_at: "2026-02-04T07:57:00.454Z"
doc_updated_by: "CODER"
description: "Ensure frontend/SKILL.md is copied into frontend/public/SKILL.md during build to avoid drift."
id_source: "generated"
---
## Summary

Added prebuild sync to copy SKILL.md into frontend/public.

## Scope

Added frontend prebuild script to copy SKILL.md into public for deployment.

## Risks

Assumes a Unix-like environment for mkdir/cp; if Windows build is required, replace with a cross-platform script.

## Verify Steps

npm --prefix frontend run build

## Rollback Plan

Revert frontend/package.json changes and run npm --prefix frontend run build.
