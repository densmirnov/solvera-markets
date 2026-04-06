---
id: "202604061614-2GVQD2"
title: "Adapt Solvera repo for Status deployment planning"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:17:47.203Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved to clean repo noise and write STATUS_DEPLOY.md roadmap."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove approved repo noise, analyze Status migration impact across Solvera, and write STATUS_DEPLOY.md."
events:
  -
    type: "status"
    at: "2026-04-06T16:17:59.032Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove approved repo noise, analyze Status migration impact across Solvera, and write STATUS_DEPLOY.md."
doc_version: 3
doc_updated_at: "2026-04-06T16:26:47.528Z"
doc_updated_by: "REVIEWER"
description: "Analyze contracts, backend, frontend, indexer, base-wallet, and local Status skill; clean simpleclaw/untracked noise as approved; produce STATUS_DEPLOY.md roadmap for Status Network testnet. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Adapt Solvera repo for Status deployment planning
    
    Analyze contracts, backend, frontend, indexer, base-wallet, and local Status skill; clean simpleclaw/untracked noise as approved; produce STATUS_DEPLOY.md roadmap for Status Network testnet. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: inspect Status-specific assumptions in contracts, deploy scripts, backend API/config, frontend chain wiring, indexer configuration, base-wallet utilities, and deployment docs.
    - In scope: delete `simpleclaw` tracked files and untracked noise outside `skills/status-network-web3`.
    - In scope: produce `STATUS_DEPLOY.md` with an atomic sequence for account setup, funding, environment changes, deployment, verification, indexing, frontend rollout, and checks.
    - Out of scope: implementing the Status migration itself in code during this turn.
  Plan: |-
    1. Remove `simpleclaw`, `.agentplane` untracked noise, and stray `.DS_Store` files while preserving `skills/status-network-web3`.
    2. Inspect contracts, deploy scripts, backend, frontend, indexer, base-wallet, env, and docs for Base-specific assumptions and Status migration blockers.
    3. Validate Status Network testnet constants, deployment flow, explorer verification route, faucet path, and gasless caveats against official docs.
    4. Write `STATUS_DEPLOY.md` with a sequential, atomic roadmap covering prerequisites, adaptation tasks, deploy steps, and rollback points.
    5. Run verification checks, record findings, and hand the task to review/closure.
  Risks: |-
    - Base-specific assumptions may be embedded across env names, CLI wording, explorer helpers, and deployment docs, so the roadmap may need phased migration rather than a single swap.
    - Status docs contain tension between gasless UX and funded deployer reality; deployment guidance must choose the safer operational path.
    - Indexing support for Status Network may be weaker than Base assumptions in the current repo, which could force a different subgraph or data access strategy.
  Verify Steps: |-
    1. Run `git status --short`. Expected: no extra untracked noise remains outside `skills/status-network-web3`, and the diff is limited to approved cleanup, task artifacts, and `STATUS_DEPLOY.md`.
    2. Run `test -f STATUS_DEPLOY.md && rg -n "Status Network Testnet|1660990954|public.sepolia.rpc.status.network|faucet|linea_estimateGas|contracts|backend|frontend|indexer|base-wallet" STATUS_DEPLOY.md`. Expected: the document captures the Status constants and every repo subsystem in scope.
    3. Review `sed -n "1,260p" STATUS_DEPLOY.md`. Expected: the roadmap is atomic, ordered, and includes caveats, verification points, and rollback checkpoints.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit(s) that remove `simpleclaw`, untracked noise, or add `STATUS_DEPLOY.md`.
    - If the cleanup scope was too broad, restore the affected files and re-check `git status --short`.
    - Remove or revise `STATUS_DEPLOY.md` if later analysis proves any roadmap assumption materially wrong.
  Notes: |-
    ### Approvals / Overrides
    - User approved cleanup of `simpleclaw`, `.agentplane` untracked noise, and all untracked files except `skills/status-network-web3`.
    
    ### Decisions
    - Preserve the Status skill pack and remove only stray `.DS_Store` files inside `skills/`.
    - Treat actual Status account creation, faucet funding, and contract deployment as roadmap steps unless the user later asks for execution.
    
    ### Implementation Notes
    - Removed `simpleclaw/`, `.agentplane/cache/`, agent backup files, and stray `.DS_Store` files.
    - Analyzed contracts, backend, frontend, indexer, base-wallet, docs, and the local Status skill pack.
    - Added root `STATUS_DEPLOY.md` with verified facts, weak links, and an atomic Status adaptation roadmap.
  Findings: ""
  Context: |-
    The current codebase is wired around Base/Base Sepolia naming, explorer links, RPC defaults, and deployment assumptions.
    
    This task translates that repository reality into a Status Network testnet adaptation plan, while also cleaning approved repo noise so the final diff is inspectable.
    
    The output artifact is a root-level `STATUS_DEPLOY.md` that covers account setup, funding, deploy tooling, explorer verification, indexer/backend/frontend adaptation, and operational caveats.
id_source: "generated"
---
## Summary

Adapt Solvera repo for Status deployment planning

Analyze contracts, backend, frontend, indexer, base-wallet, and local Status skill; clean simpleclaw/untracked noise as approved; produce STATUS_DEPLOY.md roadmap for Status Network testnet. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: inspect Status-specific assumptions in contracts, deploy scripts, backend API/config, frontend chain wiring, indexer configuration, base-wallet utilities, and deployment docs.
- In scope: delete `simpleclaw` tracked files and untracked noise outside `skills/status-network-web3`.
- In scope: produce `STATUS_DEPLOY.md` with an atomic sequence for account setup, funding, environment changes, deployment, verification, indexing, frontend rollout, and checks.
- Out of scope: implementing the Status migration itself in code during this turn.

## Plan

1. Remove `simpleclaw`, `.agentplane` untracked noise, and stray `.DS_Store` files while preserving `skills/status-network-web3`.
2. Inspect contracts, deploy scripts, backend, frontend, indexer, base-wallet, env, and docs for Base-specific assumptions and Status migration blockers.
3. Validate Status Network testnet constants, deployment flow, explorer verification route, faucet path, and gasless caveats against official docs.
4. Write `STATUS_DEPLOY.md` with a sequential, atomic roadmap covering prerequisites, adaptation tasks, deploy steps, and rollback points.
5. Run verification checks, record findings, and hand the task to review/closure.

## Risks

- Base-specific assumptions may be embedded across env names, CLI wording, explorer helpers, and deployment docs, so the roadmap may need phased migration rather than a single swap.
- Status docs contain tension between gasless UX and funded deployer reality; deployment guidance must choose the safer operational path.
- Indexing support for Status Network may be weaker than Base assumptions in the current repo, which could force a different subgraph or data access strategy.

## Verify Steps

1. Run `git status --short`. Expected: no extra untracked noise remains outside `skills/status-network-web3`, and the diff is limited to approved cleanup, task artifacts, and `STATUS_DEPLOY.md`.
2. Run `test -f STATUS_DEPLOY.md && rg -n "Status Network Testnet|1660990954|public.sepolia.rpc.status.network|faucet|linea_estimateGas|contracts|backend|frontend|indexer|base-wallet" STATUS_DEPLOY.md`. Expected: the document captures the Status constants and every repo subsystem in scope.
3. Review `sed -n "1,260p" STATUS_DEPLOY.md`. Expected: the roadmap is atomic, ordered, and includes caveats, verification points, and rollback checkpoints.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit(s) that remove `simpleclaw`, untracked noise, or add `STATUS_DEPLOY.md`.
- If the cleanup scope was too broad, restore the affected files and re-check `git status --short`.
- Remove or revise `STATUS_DEPLOY.md` if later analysis proves any roadmap assumption materially wrong.

## Notes

### Approvals / Overrides
- User approved cleanup of `simpleclaw`, `.agentplane` untracked noise, and all untracked files except `skills/status-network-web3`.

### Decisions
- Preserve the Status skill pack and remove only stray `.DS_Store` files inside `skills/`.
- Treat actual Status account creation, faucet funding, and contract deployment as roadmap steps unless the user later asks for execution.

### Implementation Notes
- Removed `simpleclaw/`, `.agentplane/cache/`, agent backup files, and stray `.DS_Store` files.
- Analyzed contracts, backend, frontend, indexer, base-wallet, docs, and the local Status skill pack.
- Added root `STATUS_DEPLOY.md` with verified facts, weak links, and an atomic Status adaptation roadmap.

## Findings


## Context

The current codebase is wired around Base/Base Sepolia naming, explorer links, RPC defaults, and deployment assumptions.

This task translates that repository reality into a Status Network testnet adaptation plan, while also cleaning approved repo noise so the final diff is inspectable.

The output artifact is a root-level `STATUS_DEPLOY.md` that covers account setup, funding, deploy tooling, explorer verification, indexer/backend/frontend adaptation, and operational caveats.
