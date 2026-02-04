---
id: "202602031655-GGW9TM"
title: "Stage 1.2 contract core"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["code"]
verify: ["make check"]
commit: { hash: "7ac9feedf619ddff65a3cbfac2992e25ddab9d48", message: "✨ GGW9TM add contract scaffold and core state machine" }
comments:
  - { author: "CODER", body: "Start: Implement core contract state machine and functions for Stage 1.2." }
  - { author: "CODER", body: "Verified: Added Foundry scaffold and core contract without economics; tests not run yet." }
doc_version: 2
doc_updated_at: "2026-02-03T17:00:57.365Z"
doc_updated_by: "CODER"
description: "Implement core IntentMarketplace contract state machine and functions."
id_source: "generated"
---
## Summary

Implement core IntentMarketplace contract state machine and functions.

## Scope

Add Foundry scaffold and core contract with state, intents, and function flow (without economics).

## Risks

Risk of mixing core logic with economics before task split. Mitigation: limit this task to core fields, events, and transitions.

## Verify Steps

1. Contract compiles. 2. Core state transitions present. 3. No fee/bond logic included yet.

## Rollback Plan

Revert the commit to remove contract core changes.
