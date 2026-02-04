---
id: "202602040446-8NJQ3X"
title: "Run indexer tests via docker"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["rg \"graph test\" indexer/package.json"]
commit: { hash: "e3a87dec724cf9bf8c41c39e6b602a4ea2d344e0", message: "🧪 8NJQ3X run graph tests in docker" }
comments:
  - { author: "CODER", body: "Start: switch indexer tests to graph test --docker." }
  - { author: "CODER", body: "Verified: indexer test script now runs graph test in docker for platform support." }
doc_version: 2
doc_updated_at: "2026-02-04T04:48:12.240Z"
doc_updated_by: "CODER"
description: "Update indexer test script to use graph test --docker to avoid platform incompatibility."
id_source: "generated"
---
## Summary

Switch indexer tests to graph test --docker for supported execution.

## Scope

Update indexer/package.json test script to use graph test --docker.

## Risks

Docker may be unavailable in some environments; document requirement for tests.

## Verify Steps

1) npm --prefix indexer test\n2) git status --short --untracked-files=no

## Rollback Plan

Revert to graph test without docker if containerized tests are unsupported.
