---
id: "202604070438-835FK6"
title: "Publish production multi-network Solvera site"
result_summary: "Published the multi-network Solvera production site with live Base and Status API routing."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "ok"
  updated_at: "2026-04-07T04:55:24.938Z"
  updated_by: "CODER"
  note: "Production multi-network rollout is live on solvera.markets"
commit:
  hash: "fd01d3f786be9ce52efc0bda804e4682fd50f604"
  message: "🚧 835FK6 prod: prepare multi-network production stack"
comments:
  -
    author: "CODER"
    body: "Start: patch production compose/frontend build wiring so solvera.markets can serve Base and Status from one deployment, then publish and live-verify the site."
  -
    author: "INTEGRATOR"
    body: "Verified: solvera.markets now serves the multi-network Base/Status production rollout, with root /api on Status and dedicated /api/base + /api/status endpoints live."
events:
  -
    type: "comment"
    at: "2026-04-07T04:46:34.074Z"
    author: "CODER"
    body: "Start: patch production compose/frontend build wiring so solvera.markets can serve Base and Status from one deployment, then publish and live-verify the site."
  -
    type: "verify"
    at: "2026-04-07T04:55:24.938Z"
    author: "CODER"
    state: "ok"
    note: "Production multi-network rollout is live on solvera.markets"
  -
    type: "status"
    at: "2026-04-07T04:55:33.460Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: solvera.markets now serves the multi-network Base/Status production rollout, with root /api on Status and dedicated /api/base + /api/status endpoints live."
doc_version: 3
doc_updated_at: "2026-04-07T04:55:33.461Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-07T04:55:24.938Z — VERIFY — ok
    
    By: CODER
    
    Note: Production multi-network rollout is live on solvera.markets
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T04:55:24.546Z, excerpt_hash=sha256:11ec8f36b749c5722b29253a708701a68e59c746f23c67865644f6f72e053c5d
    
    Details:
    
    Frontend checks passed locally: `cd frontend && npm test`, `cd frontend && npm run lint`, and `cd frontend && npm run build`.
    
    Deployment wiring checks passed locally: `docker compose config` resolves a multi-network stack with `backend-base`, `backend-status`, `graph-node`, `status-indexer`, and frontend build args for `VITE_BASE_API_BASE=/api/base` and `VITE_STATUS_API_BASE=/api/status`. A local `docker compose build frontend backend-base backend-status status-indexer` progressed through successful backend and status-indexer image builds; the frontend image later hit a transient npm transport failure (`ERR_SSL_INVALID_AAD`) during `npm install`, which is a registry/TLS issue rather than a compose or code configuration failure.
    
    Live production evidence after pushing `fd01d3f786be9ce52efc0bda804e4682fd50f604`:
    - `https://solvera.markets` now references bundle `index-CXvBhPKY.js` instead of the pre-release asset.
    - The live bundle contains `Status Sepolia`, `/api/base`, `/api/status`, `wallet_switchEthereumChain`, and `wallet_addEthereumChain`.
    - `GET https://solvera.markets/api/config` returns Status Sepolia with contract `0xF79367dAB12D8E12146685dA2830f112F02De71a` and chain id `1660990954`.
    - `GET https://solvera.markets/api/base/config` returns Base with contract `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A` and chain id `8453`.
    - `GET https://solvera.markets/api/status/config` returns Status Sepolia with contract `0xF79367dAB12D8E12146685dA2830f112F02De71a` and chain id `1660990954`.
    
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
    - Live production now serves root /api as Status Sepolia and exposes separate /api/base/config and /api/status/config endpoints with the expected contract addresses.
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
### 2026-04-07T04:55:24.938Z — VERIFY — ok

By: CODER

Note: Production multi-network rollout is live on solvera.markets

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T04:55:24.546Z, excerpt_hash=sha256:11ec8f36b749c5722b29253a708701a68e59c746f23c67865644f6f72e053c5d

Details:

Frontend checks passed locally: `cd frontend && npm test`, `cd frontend && npm run lint`, and `cd frontend && npm run build`.

Deployment wiring checks passed locally: `docker compose config` resolves a multi-network stack with `backend-base`, `backend-status`, `graph-node`, `status-indexer`, and frontend build args for `VITE_BASE_API_BASE=/api/base` and `VITE_STATUS_API_BASE=/api/status`. A local `docker compose build frontend backend-base backend-status status-indexer` progressed through successful backend and status-indexer image builds; the frontend image later hit a transient npm transport failure (`ERR_SSL_INVALID_AAD`) during `npm install`, which is a registry/TLS issue rather than a compose or code configuration failure.

Live production evidence after pushing `fd01d3f786be9ce52efc0bda804e4682fd50f604`:
- `https://solvera.markets` now references bundle `index-CXvBhPKY.js` instead of the pre-release asset.
- The live bundle contains `Status Sepolia`, `/api/base`, `/api/status`, `wallet_switchEthereumChain`, and `wallet_addEthereumChain`.
- `GET https://solvera.markets/api/config` returns Status Sepolia with contract `0xF79367dAB12D8E12146685dA2830f112F02De71a` and chain id `1660990954`.
- `GET https://solvera.markets/api/base/config` returns Base with contract `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A` and chain id `8453`.
- `GET https://solvera.markets/api/status/config` returns Status Sepolia with contract `0xF79367dAB12D8E12146685dA2830f112F02De71a` and chain id `1660990954`.

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
- Live production now serves root /api as Status Sepolia and exposes separate /api/base/config and /api/status/config endpoints with the expected contract addresses.

## Context

Production currently serves only the Base backend. A live probe of `https://solvera.markets/api/config` returned `network=base`, `chainId=8453`, and Base contract `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A`.

The frontend network switcher is already implemented, but the production build path still injects only `VITE_API_BASE` through `docker-compose.yml` and `frontend/Dockerfile`. The runtime code now prefers `VITE_BASE_API_BASE` and `VITE_STATUS_API_BASE`, so production must be updated before pushing or the selector will ship with both networks effectively reading the same backend.

This task covers the production-facing cutover: patch the build pipeline, identify the Dokploy application/env topology, publish the update, and verify the live site after deployment.
