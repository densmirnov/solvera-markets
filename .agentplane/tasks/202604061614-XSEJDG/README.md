---
id: "202604061614-XSEJDG"
title: "Plan Status Network deployment adaptation"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:17:47.203Z"
  updated_by: "ORCHESTRATOR"
  note: "User approved Status planning scope and cleanup."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: track Status deployment planning, approved cleanup, and final roadmap delivery in solvera-markets."
events:
  -
    type: "status"
    at: "2026-04-06T16:17:59.075Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: track Status deployment planning, approved cleanup, and final roadmap delivery in solvera-markets."
doc_version: 3
doc_updated_at: "2026-04-06T16:26:47.528Z"
doc_updated_by: "REVIEWER"
description: "Top-level tracking task for repository cleanup, Status Network readiness analysis, and STATUS_DEPLOY.md roadmap for adapting Solvera Markets to Status Network testnet."
sections:
  Summary: |-
    Plan Status Network deployment adaptation
    
    Top-level tracking task for repository cleanup, Status Network readiness analysis, and STATUS_DEPLOY.md roadmap for adapting Solvera Markets to Status Network testnet.
  Scope: |-
    - In scope: `contracts/`, `backend/`, `frontend/`, `indexer/`, `base-wallet/`, `env.example`, `skills/status-network-web3/`, repo cleanup for `simpleclaw` and approved untracked noise, and creation of root `STATUS_DEPLOY.md`.
    - Out of scope: live account registration, faucet funding, onchain deployment, contract verification, or any production/testnet execution in this turn.
    - Out of scope: unrelated refactors outside Status deployment planning.
  Plan: |-
    1. Create task tracking and capture the approved scope.
    2. Remove the explicitly approved repo noise without touching the preserved Status skill.
    3. Analyze every Status-relevant subsystem in solvera-markets and compare local references with current official Status docs.
    4. Write `STATUS_DEPLOY.md` as the canonical atomic roadmap.
    5. Verify the final diff and finish both tasks with traceable evidence.
  Risks: |-
    - Status documentation and the local skill pack may diverge; the roadmap must separate verified facts from inference.
    - Gasless Status messaging can hide the safer deployer requirement: keep a funded wallet path visible.
    - The approved cleanup could remove user scratch data if any desired work still lives in untracked paths outside `skills/status-network-web3`.
  Verify Steps: |-
    1. Run `git status --short`. Expected: `simpleclaw/*` is removed by intent, `.agentplane/cache` and backup artifacts are gone, and `skills/status-network-web3` remains present.
    2. Run `test -f STATUS_DEPLOY.md` and `rg -n "Status Network|contracts|backend|frontend|indexer|base-wallet|faucet|deploy" STATUS_DEPLOY.md`. Expected: the roadmap exists and covers all required subsystems and operations.
    3. Review `STATUS_DEPLOY.md`. Expected: it is sequential, repository-specific, and explicitly marks weak links or unverified dependencies.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit(s) that remove repo noise or add `STATUS_DEPLOY.md`.
    - If cleanup removed anything beyond the approved scope, restore those paths before re-running verification.
    - Re-run `git status --short` and the roadmap checks to confirm the repository returned to the previous state.
  Notes: |-
    ### Approvals / Overrides
    - User approved deletion of `simpleclaw` and all untracked files except the new `skills/status-network-web3` skill pack.
    
    ### Decisions
    - This turn produces a deployment roadmap, not a live Status testnet deployment.
    - Analysis stays strictly inside `solvera-markets`.
    
    ### Implementation Notes
    - Created top-level tracking and execution tasks under `.agentplane/tasks/`.
    - Approved cleanup scope was applied before repository analysis and roadmap authoring.
  Findings: ""
  Context: |-
    User request: analyze only the solvera-markets repository and the local Status Network skill, then produce a repository-specific deployment roadmap for Status Network testnet.
    
    The user explicitly approved cleanup of `simpleclaw` and all untracked files except the new `skills/status-network-web3` skill pack.
    
    The repository is currently Base-oriented, so the roadmap must identify every Base-specific assumption across contracts, backend, frontend, indexer, wallet tooling, environment, and docs.
id_source: "generated"
---
## Summary

Plan Status Network deployment adaptation

Top-level tracking task for repository cleanup, Status Network readiness analysis, and STATUS_DEPLOY.md roadmap for adapting Solvera Markets to Status Network testnet.

## Scope

- In scope: `contracts/`, `backend/`, `frontend/`, `indexer/`, `base-wallet/`, `env.example`, `skills/status-network-web3/`, repo cleanup for `simpleclaw` and approved untracked noise, and creation of root `STATUS_DEPLOY.md`.
- Out of scope: live account registration, faucet funding, onchain deployment, contract verification, or any production/testnet execution in this turn.
- Out of scope: unrelated refactors outside Status deployment planning.

## Plan

1. Create task tracking and capture the approved scope.
2. Remove the explicitly approved repo noise without touching the preserved Status skill.
3. Analyze every Status-relevant subsystem in solvera-markets and compare local references with current official Status docs.
4. Write `STATUS_DEPLOY.md` as the canonical atomic roadmap.
5. Verify the final diff and finish both tasks with traceable evidence.

## Risks

- Status documentation and the local skill pack may diverge; the roadmap must separate verified facts from inference.
- Gasless Status messaging can hide the safer deployer requirement: keep a funded wallet path visible.
- The approved cleanup could remove user scratch data if any desired work still lives in untracked paths outside `skills/status-network-web3`.

## Verify Steps

1. Run `git status --short`. Expected: `simpleclaw/*` is removed by intent, `.agentplane/cache` and backup artifacts are gone, and `skills/status-network-web3` remains present.
2. Run `test -f STATUS_DEPLOY.md` and `rg -n "Status Network|contracts|backend|frontend|indexer|base-wallet|faucet|deploy" STATUS_DEPLOY.md`. Expected: the roadmap exists and covers all required subsystems and operations.
3. Review `STATUS_DEPLOY.md`. Expected: it is sequential, repository-specific, and explicitly marks weak links or unverified dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit(s) that remove repo noise or add `STATUS_DEPLOY.md`.
- If cleanup removed anything beyond the approved scope, restore those paths before re-running verification.
- Re-run `git status --short` and the roadmap checks to confirm the repository returned to the previous state.

## Notes

### Approvals / Overrides
- User approved deletion of `simpleclaw` and all untracked files except the new `skills/status-network-web3` skill pack.

### Decisions
- This turn produces a deployment roadmap, not a live Status testnet deployment.
- Analysis stays strictly inside `solvera-markets`.

### Implementation Notes
- Created top-level tracking and execution tasks under `.agentplane/tasks/`.
- Approved cleanup scope was applied before repository analysis and roadmap authoring.

## Findings


## Context

User request: analyze only the solvera-markets repository and the local Status Network skill, then produce a repository-specific deployment roadmap for Status Network testnet.

The user explicitly approved cleanup of `simpleclaw` and all untracked files except the new `skills/status-network-web3` skill pack.

The repository is currently Base-oriented, so the roadmap must identify every Base-specific assumption across contracts, backend, frontend, indexer, wallet tooling, environment, and docs.
