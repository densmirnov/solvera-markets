---
id: "202604061735-RF7VW9"
title: "Prepare real Status indexer manifest"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061735-NPQ61C"
tags:
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T18:04:12.086Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: create the canonical real Status manifest and document the downstream indexer entrypoint without touching Base deploy behavior."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:11:13.632Z"
  updated_by: "REVIEWER"
  note: "Verified: the canonical Status manifest points at the live deployment and builds successfully with the repository graph-cli."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace the exploratory Status manifest with the real Status Sepolia manifest tied to the live IntentMarketplace deployment and document the exact indexer entrypoint for downstream tasks."
events:
  -
    type: "status"
    at: "2026-04-06T18:04:12.138Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the exploratory Status manifest with the real Status Sepolia manifest tied to the live IntentMarketplace deployment and document the exact indexer entrypoint for downstream tasks."
  -
    type: "verify"
    at: "2026-04-06T18:11:13.632Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: the canonical Status manifest points at the live deployment and builds successfully with the repository graph-cli."
doc_version: 3
doc_updated_at: "2026-04-06T18:11:13.639Z"
doc_updated_by: "CODER"
description: "Promote the Status Graph spike artifacts into a real Status indexing path with actual contract address/startBlock placeholders and ops guidance. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Prepare real Status indexer manifest
    
    Promote the Status Graph spike artifacts into a real Status indexing path with actual contract address/startBlock placeholders and ops guidance. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Promote the Status Graph spike artifacts into a real Status indexing path with actual contract address/startBlock placeholders and ops guidance. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Prepare real Status indexer manifest".
  Plan: |-
    1. Replace the exploratory Status manifest with a canonical Status Sepolia manifest that points to the live `IntentMarketplace` deployment at `0xF79367dAB12D8E12146685dA2830f112F02De71a` from block `18800150`.
    2. Update indexer docs/scripts only where needed so Status-specific build/deploy flow is explicit and does not overwrite the existing Base manifest by accident.
    3. Run indexer build checks and record the exact manifest path that downstream tasks should consume.
  Risks: |-
    - If the Status manifest still points at the spike address or wrong block, downstream indexer work will silently index the wrong contract. Mitigation: source both values from the successful deployment artifact and receipt.
    - If Status docs/scripts overwrite the Base manifest, existing Base workflows may regress. Mitigation: keep Status in a separate manifest file and document its role explicitly.
    - If the manifest builds but downstream operators still deploy the wrong file, the handoff fails operationally. Mitigation: write the exact filename into `indexer/README.md` and the task findings.
  Verify Steps: |-
    1. Run `rg -n "F79367dAB12D8E12146685dA2830f112F02De71a|18800150|network: status" indexer/subgraph.status.yaml indexer/README.md indexer/package.json`. Expected: the live Status address, deployment block, and `status` network marker appear consistently in the canonical Status manifest and docs.
    2. Run `cd indexer && npm run build -- --manifest subgraph.status.yaml` or the equivalent `graph build --manifest subgraph.status.yaml`. Expected: codegen/build succeeds for the real Status manifest.
    3. Review the final file split. Expected: Base keeps its existing manifest, while Status uses a separate canonical manifest path for downstream deployment.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:11:13.632Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Verified: the canonical Status manifest points at the live deployment and builds successfully with the repository graph-cli.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:11:13.407Z, excerpt_hash=sha256:a15f5a25c29f2a3c1b7f9929e11d80e1d01fc2e6bc8512d8bc280f37e12527b3
    
    Details:
    
    Checks run:
    - `rg -n "F79367dAB12D8E12146685dA2830f112F02De71a|18800150|network: status|build:status" indexer/subgraph.status.yaml indexer/README.md indexer/package.json` confirmed the live Status address, deployment block, and canonical script.
    - `cd indexer && npm run build:status` succeeded and emitted `build/subgraph.yaml`.
    - File split check: Base remains on `indexer/subgraph.yaml`, while Status now uses `indexer/subgraph.status.yaml` as its separate manifest.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Status indexing is no longer tied to the exploratory spike manifest. Added canonical manifest `indexer/subgraph.status.yaml` for the live Status Sepolia deployment at `0xF79367dAB12D8E12146685dA2830f112F02De71a` from block `18800150`, while leaving Base on `indexer/subgraph.yaml`.
    Operational fix: the local `graph-cli` in this repository expects the manifest as a positional argument, not `--manifest`, so `indexer/package.json` now uses `graph codegen subgraph.status.yaml && graph build subgraph.status.yaml` for `build:status`.
    Verification result: `npm run build:status` completed successfully and produced `indexer/build/subgraph.yaml`, so downstream backend/frontend tasks now have a canonical Status indexer entrypoint.
id_source: "generated"
---
## Summary

Prepare real Status indexer manifest

Promote the Status Graph spike artifacts into a real Status indexing path with actual contract address/startBlock placeholders and ops guidance. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Promote the Status Graph spike artifacts into a real Status indexing path with actual contract address/startBlock placeholders and ops guidance. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Prepare real Status indexer manifest".

## Plan

1. Replace the exploratory Status manifest with a canonical Status Sepolia manifest that points to the live `IntentMarketplace` deployment at `0xF79367dAB12D8E12146685dA2830f112F02De71a` from block `18800150`.
2. Update indexer docs/scripts only where needed so Status-specific build/deploy flow is explicit and does not overwrite the existing Base manifest by accident.
3. Run indexer build checks and record the exact manifest path that downstream tasks should consume.

## Risks

- If the Status manifest still points at the spike address or wrong block, downstream indexer work will silently index the wrong contract. Mitigation: source both values from the successful deployment artifact and receipt.
- If Status docs/scripts overwrite the Base manifest, existing Base workflows may regress. Mitigation: keep Status in a separate manifest file and document its role explicitly.
- If the manifest builds but downstream operators still deploy the wrong file, the handoff fails operationally. Mitigation: write the exact filename into `indexer/README.md` and the task findings.

## Verify Steps

1. Run `rg -n "F79367dAB12D8E12146685dA2830f112F02De71a|18800150|network: status" indexer/subgraph.status.yaml indexer/README.md indexer/package.json`. Expected: the live Status address, deployment block, and `status` network marker appear consistently in the canonical Status manifest and docs.
2. Run `cd indexer && npm run build -- --manifest subgraph.status.yaml` or the equivalent `graph build --manifest subgraph.status.yaml`. Expected: codegen/build succeeds for the real Status manifest.
3. Review the final file split. Expected: Base keeps its existing manifest, while Status uses a separate canonical manifest path for downstream deployment.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:11:13.632Z — VERIFY — ok

By: REVIEWER

Note: Verified: the canonical Status manifest points at the live deployment and builds successfully with the repository graph-cli.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:11:13.407Z, excerpt_hash=sha256:a15f5a25c29f2a3c1b7f9929e11d80e1d01fc2e6bc8512d8bc280f37e12527b3

Details:

Checks run:
- `rg -n "F79367dAB12D8E12146685dA2830f112F02De71a|18800150|network: status|build:status" indexer/subgraph.status.yaml indexer/README.md indexer/package.json` confirmed the live Status address, deployment block, and canonical script.
- `cd indexer && npm run build:status` succeeded and emitted `build/subgraph.yaml`.
- File split check: Base remains on `indexer/subgraph.yaml`, while Status now uses `indexer/subgraph.status.yaml` as its separate manifest.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Status indexing is no longer tied to the exploratory spike manifest. Added canonical manifest `indexer/subgraph.status.yaml` for the live Status Sepolia deployment at `0xF79367dAB12D8E12146685dA2830f112F02De71a` from block `18800150`, while leaving Base on `indexer/subgraph.yaml`.
Operational fix: the local `graph-cli` in this repository expects the manifest as a positional argument, not `--manifest`, so `indexer/package.json` now uses `graph codegen subgraph.status.yaml && graph build subgraph.status.yaml` for `build:status`.
Verification result: `npm run build:status` completed successfully and produced `indexer/build/subgraph.yaml`, so downstream backend/frontend tasks now have a canonical Status indexer entrypoint.
