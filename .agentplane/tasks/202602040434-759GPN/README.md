---
id: "202602040434-759GPN"
title: "Add npm lockfiles"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["ls backend/package-lock.json frontend/package-lock.json indexer/package-lock.json"]
commit: { hash: "000cc8cb7a3031a06e0f401443adb1f2b1308665", message: "📦 759GPN add npm lockfiles" }
comments:
  - { author: "CODER", body: "Start: add npm lockfiles for backend/frontend/indexer." }
  - { author: "CODER", body: "Verified: npm lockfiles added for backend, frontend, and indexer." }
doc_version: 2
doc_updated_at: "2026-02-04T04:35:11.973Z"
doc_updated_by: "CODER"
description: "Add backend/frontend package-lock.json and update indexer package-lock.json after installs."
id_source: "generated"
---
## Summary

Track npm lockfiles for backend, frontend, and indexer.

## Scope

Add backend/package-lock.json and frontend/package-lock.json; update indexer/package-lock.json after dependency installs.

## Risks

Lockfile changes may be noisy; ensure they match declared package.json versions.

## Verify Steps

1) ls backend/package-lock.json frontend/package-lock.json indexer/package-lock.json\n2) git status --short --untracked-files=no

## Rollback Plan

Remove lockfiles if project standard excludes them.
