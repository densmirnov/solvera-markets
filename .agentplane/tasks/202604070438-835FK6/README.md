---
id: "202604070438-835FK6"
title: "Publish production multi-network Solvera site"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061919-NXQ7GJ"
tags:
  - "code"
  - "frontend"
verify:
  - "cd frontend && npm run build"
  - "cd frontend && npm run lint"
  - "cd frontend && npm test"
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T04:39:31.684Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved production multi-network cutover after patching build/deploy wiring and running live verification."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: patch production compose/frontend build wiring so solvera.markets can serve Base and Status from one deployment, then publish and live-verify the site."
events:
  -
    type: "comment"
    at: "2026-04-07T04:46:34.074Z"
    author: "CODER"
    body: "Start: patch production compose/frontend build wiring so solvera.markets can serve Base and Status from one deployment, then publish and live-verify the site."
doc_version: 3
doc_updated_at: "2026-04-07T04:47:38.633Z"
doc_updated_by: "CODER"
description: "Update the production build/deploy path so solvera.markets can ship the Base/Status selector with correct per-network API wiring, then release and live-verify the production site. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Publish production multi-network Solvera site
    
    Update the production build/deploy path so solvera.markets can ship the Base/Status selector with correct per-network API wiring, then release and live-verify the production site. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Update the production build/deploy path so solvera.markets can ship the Base/Status selector with correct per-network API wiring, then release and live-verify the production site. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Publish production multi-network Solvera site".
  Plan: |-
    1. Implement the change for "Publish production multi-network Solvera site".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - The current production stack exposes a single backend at `https://solvera.markets/api`. If the frontend is deployed before per-network API bases are wired, both selector choices can point at the same backend and misrepresent network state.
    - The repo auto-deploys from GitHub push, so any bad compose or frontend build-arg change reaches production immediately. Mitigation: patch the deploy path first, run local frontend verification, inspect Dokploy config, then push once the target env is known.
    - Status Sepolia relies on separate infrastructure from Base. If the Status backend URL or contract env is wrong, the UI can render a working selector while read paths fail. Mitigation: live-check `/api/config` and the marketplace pages after deployment for both networks.
  Verify Steps: |-
    1. Run `cd frontend && npm test`. Expected: tests pass, including the network runtime and API-base helpers.
    2. Run `cd frontend && npm run lint` and `cd frontend && npm run build`. Expected: the frontend builds cleanly with the updated Docker/Vite env flow.
    3. Inspect the production compose/frontend build config. Expected: `docker-compose.yml` and `frontend/Dockerfile` propagate the per-network env vars needed by `frontend/src/lib/networks.ts`.
    4. After release, fetch `https://solvera.markets/` and `https://solvera.markets/api/config`. Expected: the live UI contains the Base/Status selector and the root API still resolves deterministically.
    5. After release, verify the network-specific API targets used by the UI. Expected: Base resolves to Base config and Status resolves to Status Sepolia config; switching the live site updates the visible chain state without frontend/runtime drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Notes: |-
    ### Approvals / Overrides
    - User explicitly requested a production update for `solvera.markets`, which authorizes the release step after verification.
    
    ### Decisions
    - Do not push the existing selector implementation unchanged. The production build path must first be made multi-network-aware, because current live `/api/config` is still Base-only.
  Findings: |-
    - Patched the production compose stack to split Base and Status backends and proxy them through frontend nginx as /api/base and /api/status.
    - Added a self-hosted Status Graph Node stack plus a one-shot subgraph deploy service so production no longer depends on an external Status backend URL.
    - Updated frontend Docker build args and env examples so the released bundle can target both live networks deterministically.
  Context: |-
    Production currently serves only the Base backend. A live probe of `https://solvera.markets/api/config` returned `network=base`, `chainId=8453`, and Base contract `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A`.
    
    The frontend network switcher is already implemented, but the production build path still injects only `VITE_API_BASE` through `docker-compose.yml` and `frontend/Dockerfile`. The runtime code now prefers `VITE_BASE_API_BASE` and `VITE_STATUS_API_BASE`, so production must be updated before pushing or the selector will ship with both networks effectively reading the same backend.
    
    This task covers the production-facing cutover: patch the build pipeline, identify the Dokploy application/env topology, publish the update, and verify the live site after deployment.
id_source: "generated"
---
## Summary

Publish production multi-network Solvera site

Update the production build/deploy path so solvera.markets can ship the Base/Status selector with correct per-network API wiring, then release and live-verify the production site. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Update the production build/deploy path so solvera.markets can ship the Base/Status selector with correct per-network API wiring, then release and live-verify the production site. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Publish production multi-network Solvera site".

## Plan

1. Implement the change for "Publish production multi-network Solvera site".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- The current production stack exposes a single backend at `https://solvera.markets/api`. If the frontend is deployed before per-network API bases are wired, both selector choices can point at the same backend and misrepresent network state.
- The repo auto-deploys from GitHub push, so any bad compose or frontend build-arg change reaches production immediately. Mitigation: patch the deploy path first, run local frontend verification, inspect Dokploy config, then push once the target env is known.
- Status Sepolia relies on separate infrastructure from Base. If the Status backend URL or contract env is wrong, the UI can render a working selector while read paths fail. Mitigation: live-check `/api/config` and the marketplace pages after deployment for both networks.

## Verify Steps

1. Run `cd frontend && npm test`. Expected: tests pass, including the network runtime and API-base helpers.
2. Run `cd frontend && npm run lint` and `cd frontend && npm run build`. Expected: the frontend builds cleanly with the updated Docker/Vite env flow.
3. Inspect the production compose/frontend build config. Expected: `docker-compose.yml` and `frontend/Dockerfile` propagate the per-network env vars needed by `frontend/src/lib/networks.ts`.
4. After release, fetch `https://solvera.markets/` and `https://solvera.markets/api/config`. Expected: the live UI contains the Base/Status selector and the root API still resolves deterministically.
5. After release, verify the network-specific API targets used by the UI. Expected: Base resolves to Base config and Status resolves to Status Sepolia config; switching the live site updates the visible chain state without frontend/runtime drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

### Approvals / Overrides
- User explicitly requested a production update for `solvera.markets`, which authorizes the release step after verification.

### Decisions
- Do not push the existing selector implementation unchanged. The production build path must first be made multi-network-aware, because current live `/api/config` is still Base-only.

## Findings

- Patched the production compose stack to split Base and Status backends and proxy them through frontend nginx as /api/base and /api/status.
- Added a self-hosted Status Graph Node stack plus a one-shot subgraph deploy service so production no longer depends on an external Status backend URL.
- Updated frontend Docker build args and env examples so the released bundle can target both live networks deterministically.

## Context

Production currently serves only the Base backend. A live probe of `https://solvera.markets/api/config` returned `network=base`, `chainId=8453`, and Base contract `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A`.

The frontend network switcher is already implemented, but the production build path still injects only `VITE_API_BASE` through `docker-compose.yml` and `frontend/Dockerfile`. The runtime code now prefers `VITE_BASE_API_BASE` and `VITE_STATUS_API_BASE`, so production must be updated before pushing or the selector will ship with both networks effectively reading the same backend.

This task covers the production-facing cutover: patch the build pipeline, identify the Dokploy application/env topology, publish the update, and verify the live site after deployment.
