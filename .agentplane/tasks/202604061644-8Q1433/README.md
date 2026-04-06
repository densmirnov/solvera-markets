---
id: "202604061644-8Q1433"
title: "Spike self-hosted Graph Node on Status testnet"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604061644-W01S34"
tags:
  - "backend"
  - "spike"
verify:
  - "cd indexer && npm run codegen && npm run build"
  - "docker compose config"
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:52:41.328Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: run Graph Node spike only after workflow artifacts are normalized."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-06T16:48:49.096Z"
doc_updated_by: "CODER"
description: "Validate whether the current Solvera subgraph can be built and deployed against a local Graph Node stack using Status Network Sepolia RPC before considering a custom indexer. Tracking: 202604061614-XSEJDG."
sections:
  Summary: "Run a narrow compatibility spike for the existing Solvera subgraph on a local Graph Node stack backed by Status Sepolia RPC. The goal is to prove or falsify Graph-based indexing on Status before designing a custom indexer."
  Scope: |-
    - In scope: local Graph Node stack, temporary Status-specific subgraph config for the spike, build/deploy checks, and a decision memo on viability.
    - Out of scope: production deployment, replacing the existing indexer architecture, or broad backend/frontend changes.
  Plan: |-
    1. Inspect the existing indexer build and deployment path plus any compose assets already present in the repository.
    2. Prepare a minimal local Graph stack and a temporary Status-specific subgraph config with explicit RPC, address, and start block inputs.
    3. Run codegen/build, deploy the subgraph to the local Graph Node, and observe sync behavior against Status Sepolia.
    4. Record whether Graph Node support is viable, blocked by chain support, or blocked by infrastructure assumptions in the current repo.
  Risks: |-
    - The current repo may assume The Graph Studio rather than self-hosted Graph Node. Mitigation: isolate the spike in local compose/config assets and avoid production rewiring.
    - Status RPC support may fail at Graph Node chain ingestion level. Mitigation: treat failure mode itself as the main result of the spike and capture logs precisely.
    - Docker services may start but fail to index because the contract address or start block is wrong. Mitigation: only test after confirming deployment inputs from the Status deployment plan.
  Verify Steps: |-
    1. Run `docker compose config` for the local Graph stack. Expected: the compose file validates cleanly.
    2. Run `cd indexer && npm run codegen && npm run build`. Expected: the subgraph compiles successfully with the spike config.
    3. Deploy the spike subgraph to the local Graph Node and inspect indexing status. Expected: either blocks/entities begin syncing from Status Sepolia or the exact chain-support failure is captured in logs.
    4. Record a binary decision in ## Findings. Expected: one of `viable as-is`, `viable with local infra changes`, or `not viable -> custom indexer fallback` is explicitly justified.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Remove the temporary spike compose/config artifacts or revert the commit that introduced them.
    2. Confirm the repository returns to the original indexer path with `git diff -- indexer docker-compose*`.
    3. Keep only documentary findings if the technical spike is abandoned.
  Findings: |-
    Decision: pending spike execution.
    Expected outcome shape: classify the result as `viable as-is`, `viable with local infra changes`, or `not viable -> custom indexer fallback`.
    Next steps: update this section with the actual decision, the blocking layer, and the recommended indexing path for Status.
id_source: "generated"
---
## Summary

Run a narrow compatibility spike for the existing Solvera subgraph on a local Graph Node stack backed by Status Sepolia RPC. The goal is to prove or falsify Graph-based indexing on Status before designing a custom indexer.

## Scope

- In scope: local Graph Node stack, temporary Status-specific subgraph config for the spike, build/deploy checks, and a decision memo on viability.
- Out of scope: production deployment, replacing the existing indexer architecture, or broad backend/frontend changes.

## Plan

1. Inspect the existing indexer build and deployment path plus any compose assets already present in the repository.
2. Prepare a minimal local Graph stack and a temporary Status-specific subgraph config with explicit RPC, address, and start block inputs.
3. Run codegen/build, deploy the subgraph to the local Graph Node, and observe sync behavior against Status Sepolia.
4. Record whether Graph Node support is viable, blocked by chain support, or blocked by infrastructure assumptions in the current repo.

## Risks

- The current repo may assume The Graph Studio rather than self-hosted Graph Node. Mitigation: isolate the spike in local compose/config assets and avoid production rewiring.
- Status RPC support may fail at Graph Node chain ingestion level. Mitigation: treat failure mode itself as the main result of the spike and capture logs precisely.
- Docker services may start but fail to index because the contract address or start block is wrong. Mitigation: only test after confirming deployment inputs from the Status deployment plan.

## Verify Steps

1. Run `docker compose config` for the local Graph stack. Expected: the compose file validates cleanly.
2. Run `cd indexer && npm run codegen && npm run build`. Expected: the subgraph compiles successfully with the spike config.
3. Deploy the spike subgraph to the local Graph Node and inspect indexing status. Expected: either blocks/entities begin syncing from Status Sepolia or the exact chain-support failure is captured in logs.
4. Record a binary decision in ## Findings. Expected: one of `viable as-is`, `viable with local infra changes`, or `not viable -> custom indexer fallback` is explicitly justified.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Remove the temporary spike compose/config artifacts or revert the commit that introduced them.
2. Confirm the repository returns to the original indexer path with `git diff -- indexer docker-compose*`.
3. Keep only documentary findings if the technical spike is abandoned.

## Findings

Decision: pending spike execution.
Expected outcome shape: classify the result as `viable as-is`, `viable with local infra changes`, or `not viable -> custom indexer fallback`.
Next steps: update this section with the actual decision, the blocking layer, and the recommended indexing path for Status.
