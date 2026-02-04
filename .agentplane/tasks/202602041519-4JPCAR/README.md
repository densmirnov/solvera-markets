---
id: "202602041519-4JPCAR"
title: "Fix backend build + TS config warnings"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["code"]
verify: ["1"]
commit: { hash: "c7af7358561828c12f84b6ed6165c6310eaf508a", message: "🐛 4JPCAR fix backend build + test tsconfig" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: fix backend build output and tsconfig warnings." }
  - { author: "ORCHESTRATOR", body: "Verified: npm run build --prefix backend succeeded; dist/main.js generated; tsconfig warning addressed via test tsconfig." }
doc_version: 2
doc_updated_at: "2026-02-04T15:20:49.255Z"
doc_updated_by: "ORCHESTRATOR"
description: "Restore backend build output path, resolve TS rootDir warnings for tests, adjust ESLint project config."
id_source: "generated"
---
## Summary

Restored backend build output path to dist/main.js and resolved TS rootDir warnings by separating test tsconfig and ESLint project.

## Scope

Updated backend/tsconfig.json to compile src only, added backend/tsconfig.test.json for tests, pointed ESLint to test tsconfig.

## Risks

ESLint now uses tsconfig.test.json; ensure any tooling that relied on tsconfig.json for tests is updated if needed.

## Verify Steps

1. npm run build --prefix backend

## Rollback Plan

Revert backend tsconfig/eslint changes and remove tsconfig.test.json via agentplane commit or git revert.
