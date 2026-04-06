---
id: "202604061919-NXQ7GJ"
title: "Add frontend network switcher for Base and Status Sepolia"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T19:20:02.315Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:27:30.318Z"
  updated_by: "CODER"
  note: "Frontend network switcher, runtime config, and MetaMask helpers passed verification"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a site-wide Base/Status network selector, keep frontend runtime state in sync with the selected network, and trigger MetaMask switch/add-network flows without pushing production."
events:
  -
    type: "status"
    at: "2026-04-06T19:20:09.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a site-wide Base/Status network selector, keep frontend runtime state in sync with the selected network, and trigger MetaMask switch/add-network flows without pushing production."
  -
    type: "verify"
    at: "2026-04-06T19:27:30.318Z"
    author: "CODER"
    state: "ok"
    note: "Frontend network switcher, runtime config, and MetaMask helpers passed verification"
doc_version: 3
doc_updated_at: "2026-04-06T19:27:30.330Z"
doc_updated_by: "CODER"
description: "Add a user-facing network selector to the main site, switch frontend runtime between Base and Status Sepolia, and trigger MetaMask network switching/add-network flows without pushing production. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Add frontend network switcher for Base and Status Sepolia
    
    Add a user-facing network selector to the main site, switch frontend runtime between Base and Status Sepolia, and trigger MetaMask network switching/add-network flows without pushing production. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Add a user-facing network selector to the main site, switch frontend runtime between Base and Status Sepolia, and trigger MetaMask network switching/add-network flows without pushing production. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Add frontend network switcher for Base and Status Sepolia".
  Plan: |-
    1. Implement the change for "Add frontend network switcher for Base and Status Sepolia".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - The selector can desynchronize UI config and MetaMask network if runtime state is derived from the backend only. Mitigation: introduce a client-side selected-network source of truth and derive explorer/api/runtime values from it.
    - wallet_switchEthereumChain can fail on chains missing from MetaMask. Mitigation: handle error 4902 by falling back to wallet_addEthereumChain with full chain metadata for Base and Status Sepolia.
    - The site auto-deploys on push, so broken frontend state can reach production quickly. Mitigation: keep the change self-contained in frontend, add tests for network config normalization, and run build/lint before any future push.
  Verify Steps: |-
    1. Build the frontend and run lint/tests on touched runtime/UI files. Expected: build, lint, and tests pass with the new network selector code.
    2. Use the selector in the rendered app and confirm the visible chain label, explorer links, and runtime config-dependent copy switch between Base and Status Sepolia. Expected: UI surfaces change immediately without reload drift.
    3. Trigger the MetaMask action path in a browser-compatible environment or via unit-tested request helpers. Expected: Base and Status Sepolia issue correct wallet_switchEthereumChain requests, and missing-chain fallback uses wallet_addEthereumChain with valid metadata.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:27:30.318Z — VERIFY — ok
    
    By: CODER
    
    Note: Frontend network switcher, runtime config, and MetaMask helpers passed verification
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:27:29.925Z, excerpt_hash=sha256:986acdb8ab69042b2ced0f85245686681ddc218ac75e5330abbad9a683dafac9
    
    Details:
    
    Frontend checks passed: npm test, npm run lint, npm run build in frontend/. Browser smoke against vite preview showed header buttons for Base and Status Sepolia plus CHAIN STATUS in the HUD snapshot. MetaMask request helpers are covered by wallet.test.ts for direct switch, 4902 add-network fallback, and chainChanged subscription normalization. The runtime layer now supports VITE_BASE_API_BASE and VITE_STATUS_API_BASE so production can point each selector choice at the correct backend before push.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Added a site-wide client-side network registry for Base and Status Sepolia, including explorer, contract, RPC, and per-network API base metadata.
    - Added a persistent network context backed by localStorage so the selected chain drives runtime config, API base selection, explorer links, and header state across the app.
    - Added MetaMask switch/add-network helpers that issue wallet_switchEthereumChain first and fall back to wallet_addEthereumChain on error 4902.
    - Added a header network switcher and wired Marketplace, IntentDetails, and HUD health checks to the selected network's runtime config.
    - Added frontend tests for API base overrides, runtime config normalization, chain mapping, and MetaMask switch/add-network flows.
    - Documented the new production env requirement: VITE_BASE_API_BASE and VITE_STATUS_API_BASE must point at the intended per-network backends before the next deploy.
id_source: "generated"
---
## Summary

Add frontend network switcher for Base and Status Sepolia

Add a user-facing network selector to the main site, switch frontend runtime between Base and Status Sepolia, and trigger MetaMask network switching/add-network flows without pushing production. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Add a user-facing network selector to the main site, switch frontend runtime between Base and Status Sepolia, and trigger MetaMask network switching/add-network flows without pushing production. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Add frontend network switcher for Base and Status Sepolia".

## Plan

1. Implement the change for "Add frontend network switcher for Base and Status Sepolia".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- The selector can desynchronize UI config and MetaMask network if runtime state is derived from the backend only. Mitigation: introduce a client-side selected-network source of truth and derive explorer/api/runtime values from it.
- wallet_switchEthereumChain can fail on chains missing from MetaMask. Mitigation: handle error 4902 by falling back to wallet_addEthereumChain with full chain metadata for Base and Status Sepolia.
- The site auto-deploys on push, so broken frontend state can reach production quickly. Mitigation: keep the change self-contained in frontend, add tests for network config normalization, and run build/lint before any future push.

## Verify Steps

1. Build the frontend and run lint/tests on touched runtime/UI files. Expected: build, lint, and tests pass with the new network selector code.
2. Use the selector in the rendered app and confirm the visible chain label, explorer links, and runtime config-dependent copy switch between Base and Status Sepolia. Expected: UI surfaces change immediately without reload drift.
3. Trigger the MetaMask action path in a browser-compatible environment or via unit-tested request helpers. Expected: Base and Status Sepolia issue correct wallet_switchEthereumChain requests, and missing-chain fallback uses wallet_addEthereumChain with valid metadata.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:27:30.318Z — VERIFY — ok

By: CODER

Note: Frontend network switcher, runtime config, and MetaMask helpers passed verification

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:27:29.925Z, excerpt_hash=sha256:986acdb8ab69042b2ced0f85245686681ddc218ac75e5330abbad9a683dafac9

Details:

Frontend checks passed: npm test, npm run lint, npm run build in frontend/. Browser smoke against vite preview showed header buttons for Base and Status Sepolia plus CHAIN STATUS in the HUD snapshot. MetaMask request helpers are covered by wallet.test.ts for direct switch, 4902 add-network fallback, and chainChanged subscription normalization. The runtime layer now supports VITE_BASE_API_BASE and VITE_STATUS_API_BASE so production can point each selector choice at the correct backend before push.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Added a site-wide client-side network registry for Base and Status Sepolia, including explorer, contract, RPC, and per-network API base metadata.
- Added a persistent network context backed by localStorage so the selected chain drives runtime config, API base selection, explorer links, and header state across the app.
- Added MetaMask switch/add-network helpers that issue wallet_switchEthereumChain first and fall back to wallet_addEthereumChain on error 4902.
- Added a header network switcher and wired Marketplace, IntentDetails, and HUD health checks to the selected network's runtime config.
- Added frontend tests for API base overrides, runtime config normalization, chain mapping, and MetaMask switch/add-network flows.
- Documented the new production env requirement: VITE_BASE_API_BASE and VITE_STATUS_API_BASE must point at the intended per-network backends before the next deploy.
