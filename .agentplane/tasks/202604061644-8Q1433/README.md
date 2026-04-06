---
id: "202604061644-8Q1433"
title: "Spike self-hosted Graph Node on Status testnet"
result_summary: "Self-hosted Graph Node on Status Sepolia validated; keep Graph architecture and rerun with real contract address."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
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
  state: "ok"
  updated_at: "2026-04-06T17:11:49.178Z"
  updated_by: "REVIEWER"
  note: "Spike complete: compose validates, `npx graph build subgraph.status-spike.yaml` succeeds, and the local Graph Node deployment `intent/status-spike` reports `health=healthy`, `synced=true`, and `network=status` against Status Sepolia RPC. Caveats captured in Findings: Postgres locale must be `C`, public RPC lacks `eth_getBlockReceipts`, and real entity ingestion still needs the actual Status contract address/start block."
commit:
  hash: "5933b6ffcf9f576c6974b5017a2303c7d768fd73"
  message: "✅ 8Q1433 indexer: spike Graph Node on Status"
comments:
  -
    author: "CODER"
    body: "Start: validate the existing Solvera subgraph on a local Graph Node stack using Status Sepolia RPC before considering any custom indexing fallback."
  -
    author: "CODER"
    body: "Verified: the current Solvera subgraph architecture is viable on a self-hosted Graph Node over Status Sepolia. Added a local Graph stack compose file plus a Status-specific spike manifest, confirmed successful build/deploy/sync to head, and captured the remaining caveats around Postgres locale, missing `eth_getBlockReceipts`, and the need to rerun with the real Status deployment address."
events:
  -
    type: "status"
    at: "2026-04-06T16:56:42.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate the existing Solvera subgraph on a local Graph Node stack using Status Sepolia RPC before considering any custom indexing fallback."
  -
    type: "verify"
    at: "2026-04-06T17:11:49.178Z"
    author: "REVIEWER"
    state: "ok"
    note: "Spike complete: compose validates, `npx graph build subgraph.status-spike.yaml` succeeds, and the local Graph Node deployment `intent/status-spike` reports `health=healthy`, `synced=true`, and `network=status` against Status Sepolia RPC. Caveats captured in Findings: Postgres locale must be `C`, public RPC lacks `eth_getBlockReceipts`, and real entity ingestion still needs the actual Status contract address/start block."
  -
    type: "status"
    at: "2026-04-06T17:12:32.338Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the current Solvera subgraph architecture is viable on a self-hosted Graph Node over Status Sepolia. Added a local Graph stack compose file plus a Status-specific spike manifest, confirmed successful build/deploy/sync to head, and captured the remaining caveats around Postgres locale, missing `eth_getBlockReceipts`, and the need to rerun with the real Status deployment address."
doc_version: 3
doc_updated_at: "2026-04-06T17:12:32.339Z"
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
    ### 2026-04-06T17:11:49.178Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Spike complete: compose validates, `npx graph build subgraph.status-spike.yaml` succeeds, and the local Graph Node deployment `intent/status-spike` reports `health=healthy`, `synced=true`, and `network=status` against Status Sepolia RPC. Caveats captured in Findings: Postgres locale must be `C`, public RPC lacks `eth_getBlockReceipts`, and real entity ingestion still needs the actual Status contract address/start block.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:11:42.672Z, excerpt_hash=sha256:2cfd10282f4d0cad0893520e700592a1e4156b73e7942b196ac7d0551bc0adfc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Remove the temporary spike compose/config artifacts or revert the commit that introduced them.
    2. Confirm the repository returns to the original indexer path with `git diff -- indexer docker-compose*`.
    3. Keep only documentary findings if the technical spike is abandoned.
  Findings: |-
    Decision: viable with local infra changes.
    Key findings: the Solvera subgraph builds successfully from `subgraph.status-spike.yaml`, deploys to a self-hosted Graph Node, and the deployment `intent/status-spike` reaches `health=healthy` and `synced=true` on Status Sepolia via `https://public.sepolia.rpc.status.network`. Graph Node accepts `network: status` and indexes blocks to head, so Status is not blocked at the chain-ingestion layer.
    Operational caveats: Graph Node requires Postgres initialized with locale `C`; the public Status RPC does not support `eth_getBlockReceipts`, so Graph Node falls back to block/log-based indexing; the spike used a temporary contract address, so entity creation against real Solvera events still requires a real Status deployment address plus start block.
    Recommended path: keep the current Graph-based architecture, run a second pass with the actual Status-deployed `IntentMarketplace` address, and only consider a custom indexer if real-event sync proves unstable under Status RPC constraints.
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
### 2026-04-06T17:11:49.178Z — VERIFY — ok

By: REVIEWER

Note: Spike complete: compose validates, `npx graph build subgraph.status-spike.yaml` succeeds, and the local Graph Node deployment `intent/status-spike` reports `health=healthy`, `synced=true`, and `network=status` against Status Sepolia RPC. Caveats captured in Findings: Postgres locale must be `C`, public RPC lacks `eth_getBlockReceipts`, and real entity ingestion still needs the actual Status contract address/start block.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:11:42.672Z, excerpt_hash=sha256:2cfd10282f4d0cad0893520e700592a1e4156b73e7942b196ac7d0551bc0adfc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Remove the temporary spike compose/config artifacts or revert the commit that introduced them.
2. Confirm the repository returns to the original indexer path with `git diff -- indexer docker-compose*`.
3. Keep only documentary findings if the technical spike is abandoned.

## Findings

Decision: viable with local infra changes.
Key findings: the Solvera subgraph builds successfully from `subgraph.status-spike.yaml`, deploys to a self-hosted Graph Node, and the deployment `intent/status-spike` reaches `health=healthy` and `synced=true` on Status Sepolia via `https://public.sepolia.rpc.status.network`. Graph Node accepts `network: status` and indexes blocks to head, so Status is not blocked at the chain-ingestion layer.
Operational caveats: Graph Node requires Postgres initialized with locale `C`; the public Status RPC does not support `eth_getBlockReceipts`, so Graph Node falls back to block/log-based indexing; the spike used a temporary contract address, so entity creation against real Solvera events still requires a real Status deployment address plus start block.
Recommended path: keep the current Graph-based architecture, run a second pass with the actual Status-deployed `IntentMarketplace` address, and only consider a custom indexer if real-event sync proves unstable under Status RPC constraints.
