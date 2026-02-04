---
id: "202602031709-HHWFYX"
title: "Stage 1.4b fix tests"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags: ["code"]
verify: ["make check"]
commit: { hash: "8898cd5700f1550c62f3892137586e243952e013", message: "✨ HHWFYX fix test address literals" }
comments:
  - { author: "TESTER", body: "Start: Fix invalid address literals in contract tests." }
  - { author: "TESTER", body: "Verified: Fixed invalid address literals so Foundry can compile tests." }
doc_version: 2
doc_updated_at: "2026-02-03T17:10:46.100Z"
doc_updated_by: "TESTER"
description: "Fix invalid test addresses and allow Foundry to compile for deploys."
id_source: "generated"
---
## Summary

Fix invalid test addresses so Foundry compiles for deploys.

## Scope

Update address literals in contracts/test/IntentMarketplace.t.sol to valid hex values.

## Risks

Risk of changing test semantics unintentionally. Mitigation: keep same roles, only fix literals.

## Verify Steps

1. forge test compiles. 2. No invalid address literals remain.

## Rollback Plan

Revert the commit to restore previous test file.
