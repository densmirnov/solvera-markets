---
id: "202602040538-W33XF2"
title: "Refresh dependencies to current versions"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602040538-YWCDG7"
  - "202602040538-YWCDG7"
tags:
  - "code"
verify:
  - "make check"
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
  hash: "955170275d4fa05adcc2c4651cc3d499585c543f"
  message: "✨ W33XF2 refresh toolchain dependencies"
comments:
  -
    author: "CODER"
    body: "Start: audit package versions across repo, plan upgrades, and update configs/lockfiles safely."
  -
    author: "CODER"
    body: "Verified: make check completed after dependency upgrades; backend, frontend, indexer tests and coverage are green."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T06:21:05.858Z"
doc_updated_by: "CODER"
description: "Audit and update npm/foundry dependencies to current stable versions, align configs, and ensure compatibility."
id_source: "generated"
---
## Summary

Upgraded backend/frontend/indexer dependencies to current stable releases, added indexer overrides for transitive vulnerabilities, and added @types/express for backend builds.

## Scope

Updated package.json + lockfiles in backend, frontend, and indexer; introduced npm overrides for indexer transitive deps; added @types/express devDependency for backend TS build.

## Risks

Major version upgrades (Nest 11, React 19, Vite 7, Graph CLI 0.98) may introduce subtle runtime differences. Indexer still reports moderate npm audit issues due to gluegun/lodash.trim advisories with no upstream fix.

## Verify Steps

make check

## Rollback Plan

Revert the dependency update commit and re-run make check to restore the previous toolchain.
