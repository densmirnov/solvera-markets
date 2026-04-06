---
id: "202604061735-2CPW0M"
title: "Make Foundry deploy path Status-aware"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604061735-5SVEY0"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T17:39:18.125Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: implement only the Foundry/contract deploy-surface changes needed to unlock Status Sepolia broadcast."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make Foundry deployment Status-aware by adding a Status RPC alias, generic deployer-key resolution, and matching contract docs/env guidance before the first real Status broadcast."
events:
  -
    type: "status"
    at: "2026-04-06T17:40:35.126Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make Foundry deployment Status-aware by adding a Status RPC alias, generic deployer-key resolution, and matching contract docs/env guidance before the first real Status broadcast."
doc_version: 3
doc_updated_at: "2026-04-06T17:43:24.346Z"
doc_updated_by: "CODER"
description: "Adapt Foundry RPC aliases and deployment key resolution so Solvera contracts can be broadcast to Status Sepolia without Base-only env assumptions. Tracking: 202604061614-XSEJDG."
sections:
  Summary: "Make the repository-native Foundry deploy path usable on Status Sepolia. This step must add a Status RPC alias and remove the hard dependency on `BASE_DEPLOYER_PRIVATE_KEY` by introducing generic/Status-aware deployer key resolution."
  Scope: |-
    - In scope: `contracts/foundry.toml`, `contracts/script/DeployIntentMarketplace.s.sol`, `contracts/README.md`, and any env-example surface directly required to document the new deploy path.
    - Out of scope: the actual Status broadcast, contract verification, or downstream backend/frontend/indexer rewiring.
  Plan: |-
    1. Implement the change for "Make Foundry deploy path Status-aware".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If key precedence is wrong, future deploys may silently use the wrong operator wallet. Mitigation: use a strict fallback order and document it in `contracts/README.md`.
    - If the Status RPC alias is misnamed, later deploy commands and docs will diverge. Mitigation: standardize on `status_sepolia` now and reuse it everywhere.
    - If the simulation path depends on secrets printed to stdout, verification becomes unsafe. Mitigation: source env locally but never echo private values.
  Verify Steps: |-
    1. Run `cd contracts && forge build`. Expected: contracts compile successfully with the new Foundry config.
    2. Run `cd contracts && set -a; source ../.env; source ../.env.status-sepolia; set +a; forge script script/DeployIntentMarketplace.s.sol:DeployIntentMarketplace --rpc-url status_sepolia`. Expected: Foundry resolves the Status alias and simulates the deployment path without requiring `BASE_DEPLOYER_PRIVATE_KEY` as the only valid key source.
    3. Run `rg -n "status_sepolia|DEPLOYER_PRIVATE_KEY|STATUS_DEPLOYER_PRIVATE_KEY|BASE_DEPLOYER_PRIVATE_KEY" contracts/README.md contracts/foundry.toml contracts/script/DeployIntentMarketplace.s.sol env.example`. Expected: alias and key precedence are documented consistently.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Revert the Foundry config, deploy script, docs, and env-example changes from this task.
    2. Re-run `forge build` to confirm the repository returns to the previous deploy surface.
    3. If the generic key path proves confusing, fall back temporarily to the legacy Base-only variable while keeping Status work blocked until a better abstraction is ready.
  Findings: |-
    Progress: Foundry is now Status-aware at the repository level. Added `status_sepolia` RPC alias, introduced deployer key precedence `DEPLOYER_PRIVATE_KEY -> STATUS_DEPLOYER_PRIVATE_KEY -> BASE_DEPLOYER_PRIVATE_KEY`, and documented the new path in contract docs and env example.
    Verified facts: `forge build` passes; the alias and key precedence are present consistently across `contracts/foundry.toml`, `contracts/script/DeployIntentMarketplace.s.sol`, `contracts/README.md`, and `env.example`.
    Current blocker: local `forge script` invocation on this workstation still exits with `Error: No contract bytecode` even when the Status alias resolves and the deployer key is provided. This means the task has not yet unlocked the first real broadcast and remains open for script-runner debugging before task `202604061735-NPQ61C` can proceed safely.
id_source: "generated"
---
## Summary

Make the repository-native Foundry deploy path usable on Status Sepolia. This step must add a Status RPC alias and remove the hard dependency on `BASE_DEPLOYER_PRIVATE_KEY` by introducing generic/Status-aware deployer key resolution.

## Scope

- In scope: `contracts/foundry.toml`, `contracts/script/DeployIntentMarketplace.s.sol`, `contracts/README.md`, and any env-example surface directly required to document the new deploy path.
- Out of scope: the actual Status broadcast, contract verification, or downstream backend/frontend/indexer rewiring.

## Plan

1. Implement the change for "Make Foundry deploy path Status-aware".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If key precedence is wrong, future deploys may silently use the wrong operator wallet. Mitigation: use a strict fallback order and document it in `contracts/README.md`.
- If the Status RPC alias is misnamed, later deploy commands and docs will diverge. Mitigation: standardize on `status_sepolia` now and reuse it everywhere.
- If the simulation path depends on secrets printed to stdout, verification becomes unsafe. Mitigation: source env locally but never echo private values.

## Verify Steps

1. Run `cd contracts && forge build`. Expected: contracts compile successfully with the new Foundry config.
2. Run `cd contracts && set -a; source ../.env; source ../.env.status-sepolia; set +a; forge script script/DeployIntentMarketplace.s.sol:DeployIntentMarketplace --rpc-url status_sepolia`. Expected: Foundry resolves the Status alias and simulates the deployment path without requiring `BASE_DEPLOYER_PRIVATE_KEY` as the only valid key source.
3. Run `rg -n "status_sepolia|DEPLOYER_PRIVATE_KEY|STATUS_DEPLOYER_PRIVATE_KEY|BASE_DEPLOYER_PRIVATE_KEY" contracts/README.md contracts/foundry.toml contracts/script/DeployIntentMarketplace.s.sol env.example`. Expected: alias and key precedence are documented consistently.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the Foundry config, deploy script, docs, and env-example changes from this task.
2. Re-run `forge build` to confirm the repository returns to the previous deploy surface.
3. If the generic key path proves confusing, fall back temporarily to the legacy Base-only variable while keeping Status work blocked until a better abstraction is ready.

## Findings

Progress: Foundry is now Status-aware at the repository level. Added `status_sepolia` RPC alias, introduced deployer key precedence `DEPLOYER_PRIVATE_KEY -> STATUS_DEPLOYER_PRIVATE_KEY -> BASE_DEPLOYER_PRIVATE_KEY`, and documented the new path in contract docs and env example.
Verified facts: `forge build` passes; the alias and key precedence are present consistently across `contracts/foundry.toml`, `contracts/script/DeployIntentMarketplace.s.sol`, `contracts/README.md`, and `env.example`.
Current blocker: local `forge script` invocation on this workstation still exits with `Error: No contract bytecode` even when the Status alias resolves and the deployer key is provided. This means the task has not yet unlocked the first real broadcast and remains open for script-runner debugging before task `202604061735-NPQ61C` can proceed safely.
