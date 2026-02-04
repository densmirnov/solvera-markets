---
id: "202602040508-V9K8NA"
title: "Frontend coverage thresholds"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags: ["frontend"]
verify: ["rg \"coverage\" frontend"]
commit: { hash: "bc521a0c729655a30dab1b2c9c12d0b54622fbda", message: "🧪 V9K8NA add frontend coverage thresholds" }
comments:
  - { author: "TESTER", body: "Start: add frontend coverage tooling and thresholds." }
  - { author: "TESTER", body: "Verified: frontend tests run with coverage and enforce thresholds." }
doc_version: 2
doc_updated_at: "2026-02-04T05:25:01.787Z"
doc_updated_by: "TESTER"
description: "Add coverage tooling and thresholds for frontend tests."
id_source: "generated"
---
## Summary

Add frontend coverage tooling and thresholds.

## Scope

Configure Vitest coverage reports and minimum thresholds.

## Risks

Coverage thresholds may fail with low test count; add tests if needed.

## Verify Steps

1) npm --prefix frontend test\n2) scripts/coverage.sh\n3) git status --short --untracked-files=no

## Rollback Plan

Revert Vitest coverage settings if they block builds.
