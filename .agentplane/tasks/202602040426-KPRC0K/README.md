---
id: "202602040426-KPRC0K"
title: "Add lint/format scripts for backend and indexer"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["rg \"lint\" backend/package.json indexer/package.json"]
commit: { hash: "79b63562b103ece22bc04be113ea112d12423153", message: "🧹 KPRC0K add backend/indexer linting" }
comments:
  - { author: "CODER", body: "Start: add lint/format scripts and ESLint configs for backend and indexer." }
  - { author: "CODER", body: "Verified: backend/indexer now have eslint configs and lint/fmt scripts wired for repo tooling." }
doc_version: 2
doc_updated_at: "2026-02-04T04:28:13.028Z"
doc_updated_by: "CODER"
description: "Add ESLint configs and lint/fmt scripts for backend and indexer so repo lint/format passes."
id_source: "generated"
---
## Summary

Add ESLint configs and lint/fmt scripts for backend and indexer packages.

## Scope

Add eslint configs, update package.json scripts/devDependencies, and ensure make lint/fmt can run for backend and indexer.

## Risks

Linting may require code tweaks; ensure configs align with current code style.

## Verify Steps

1) rg "lint" backend/package.json indexer/package.json\n2) make lint\n3) git status --short --untracked-files=no

## Rollback Plan

Revert eslint configs and package.json script changes if lint tooling conflicts with build.
