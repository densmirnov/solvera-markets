---
id: "202604061735-WDW5JH"
title: "Switch frontend chain surfaces to Status"
result_summary: "Switched the React frontend's chain surfaces from Base defaults to runtime Status metadata and verified tests/build/lint."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061735-3JCAD3"
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T18:26:30.556Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: frontend must stop publishing Base-specific chain surfaces before any future GitHub push can auto-deploy solvera.markets."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:30:04.297Z"
  updated_by: "REVIEWER"
  note: "Frontend Status chain surfaces verified"
commit:
  hash: "dcc62fb1c33a36bc41fa19e8a90fbc783c69da53"
  message: "🚧 WDW5JH frontend: switch chain surfaces to Status"
comments:
  -
    author: "CODER"
    body: "Start: replace Base-only explorer and token assumptions with config-driven Status chain metadata before any future push can publish incorrect links to solvera.markets."
  -
    author: "INTEGRATOR"
    body: "Verified: the frontend now renders Status-driven explorer URLs and chain metadata while leaving remaining Base-markdown cleanup to the wallet/docs follow-up tasks."
events:
  -
    type: "status"
    at: "2026-04-06T18:26:41.971Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace Base-only explorer and token assumptions with config-driven Status chain metadata before any future push can publish incorrect links to solvera.markets."
  -
    type: "verify"
    at: "2026-04-06T18:30:04.297Z"
    author: "REVIEWER"
    state: "ok"
    note: "Frontend Status chain surfaces verified"
  -
    type: "status"
    at: "2026-04-06T18:30:36.801Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: the frontend now renders Status-driven explorer URLs and chain metadata while leaving remaining Base-markdown cleanup to the wallet/docs follow-up tasks."
doc_version: 3
doc_updated_at: "2026-04-06T18:30:36.802Z"
doc_updated_by: "INTEGRATOR"
description: "Update explorer links, network labels, and token assumptions so the frontend can present Status Sepolia data without Base-only semantics. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Switch frontend chain surfaces to Status
    
    Update explorer links, network labels, and token assumptions so the frontend can present Status Sepolia data without Base-only semantics. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Update explorer links, network labels, and token assumptions so the frontend can present Status Sepolia data without Base-only semantics. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Switch frontend chain surfaces to Status".
  Plan: |-
    1. Implement the change for "Switch frontend chain surfaces to Status".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If the frontend keeps using hardcoded Base explorer URLs, a future push would publish incorrect links on `solvera.markets` even though the backend now points to Status. Mitigation: route explorer URLs through fetched `/api/config` metadata with a Status fallback.
    - If token formatting stays tied to Base USDC only, reward/min-output rendering may be misleading on Status. Mitigation: keep explicit token-address matching plus safe generic fallbacks when decimals are unknown.
    - If `/api/config` fetch fails in the browser, critical pages must still render. Mitigation: provide deterministic local Status defaults and treat the config fetch as an enhancement, not a hard dependency.
  Verify Steps: |-
    1. Run the frontend test suite that covers config and format helpers. Expected: all tests pass with Status defaults and no Base-only assumptions.
    2. Build the frontend production bundle. Expected: `npm run build` succeeds and the generated app compiles with the new config-driven chain surfaces.
    3. Inspect the rendered code paths or snapshot outputs for marketplace/detail explorer links and chain labels. Expected: the frontend uses Status Sepolia metadata and `https://sepoliascan.status.network` for the live marketplace deployment.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:30:04.297Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Frontend Status chain surfaces verified
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:30:03.831Z, excerpt_hash=sha256:769b7dc9614eedc957879ce6e5ac55ab02fcad12c615b2f018829da861ed5da0
    
    Details:
    
    Verified that the frontend now derives chain surfaces from runtime config with a Status Sepolia fallback. `npm test`, `npm run build`, and `npm run lint` all passed in `frontend/`. Explorer URLs for marketplace/detail views resolve through StatusScan for the live deployment. Residual Base references remain only in copied markdown skill assets and are tracked separately under the wallet/docs follow-up tasks.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Frontend runtime chain metadata is now config-driven: Marketplace, Intent Details, and the HUD status rail consume `/api/config` via `useRuntimeConfig()` and fall back deterministically to Status Sepolia when the backend is unavailable.
    2. Explorer links for participant addresses and transaction hashes no longer default to `basescan.org`; they now resolve against the active network metadata and point to `https://sepoliascan.status.network` for the live Status deployment.
    3. Token formatting is no longer presented as a Base-specific assumption. Known token metadata stays explicit, while unknown ERC-20s render chain-agnostic fallback copy instead of Base-branded wording.
    4. Verification passed: `npm test`, `npm run build`, and `npm run lint` all succeeded in `frontend/`.
    5. Residual risk intentionally left for follow-up tasks `202604061735-2BWTA0` and `202604061735-GH834T`: public markdown assets copied into `frontend/dist/` still contain Base wallet / Base network references even though the React app surface is now Status-ready.
id_source: "generated"
---
## Summary

Switch frontend chain surfaces to Status

Update explorer links, network labels, and token assumptions so the frontend can present Status Sepolia data without Base-only semantics. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Update explorer links, network labels, and token assumptions so the frontend can present Status Sepolia data without Base-only semantics. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Switch frontend chain surfaces to Status".

## Plan

1. Implement the change for "Switch frontend chain surfaces to Status".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If the frontend keeps using hardcoded Base explorer URLs, a future push would publish incorrect links on `solvera.markets` even though the backend now points to Status. Mitigation: route explorer URLs through fetched `/api/config` metadata with a Status fallback.
- If token formatting stays tied to Base USDC only, reward/min-output rendering may be misleading on Status. Mitigation: keep explicit token-address matching plus safe generic fallbacks when decimals are unknown.
- If `/api/config` fetch fails in the browser, critical pages must still render. Mitigation: provide deterministic local Status defaults and treat the config fetch as an enhancement, not a hard dependency.

## Verify Steps

1. Run the frontend test suite that covers config and format helpers. Expected: all tests pass with Status defaults and no Base-only assumptions.
2. Build the frontend production bundle. Expected: `npm run build` succeeds and the generated app compiles with the new config-driven chain surfaces.
3. Inspect the rendered code paths or snapshot outputs for marketplace/detail explorer links and chain labels. Expected: the frontend uses Status Sepolia metadata and `https://sepoliascan.status.network` for the live marketplace deployment.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:30:04.297Z — VERIFY — ok

By: REVIEWER

Note: Frontend Status chain surfaces verified

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:30:03.831Z, excerpt_hash=sha256:769b7dc9614eedc957879ce6e5ac55ab02fcad12c615b2f018829da861ed5da0

Details:

Verified that the frontend now derives chain surfaces from runtime config with a Status Sepolia fallback. `npm test`, `npm run build`, and `npm run lint` all passed in `frontend/`. Explorer URLs for marketplace/detail views resolve through StatusScan for the live deployment. Residual Base references remain only in copied markdown skill assets and are tracked separately under the wallet/docs follow-up tasks.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Frontend runtime chain metadata is now config-driven: Marketplace, Intent Details, and the HUD status rail consume `/api/config` via `useRuntimeConfig()` and fall back deterministically to Status Sepolia when the backend is unavailable.
2. Explorer links for participant addresses and transaction hashes no longer default to `basescan.org`; they now resolve against the active network metadata and point to `https://sepoliascan.status.network` for the live Status deployment.
3. Token formatting is no longer presented as a Base-specific assumption. Known token metadata stays explicit, while unknown ERC-20s render chain-agnostic fallback copy instead of Base-branded wording.
4. Verification passed: `npm test`, `npm run build`, and `npm run lint` all succeeded in `frontend/`.
5. Residual risk intentionally left for follow-up tasks `202604061735-2BWTA0` and `202604061735-GH834T`: public markdown assets copied into `frontend/dist/` still contain Base wallet / Base network references even though the React app surface is now Status-ready.
