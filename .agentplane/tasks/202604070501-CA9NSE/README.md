---
id: "202604070501-CA9NSE"
title: "Fix production multi-network UX and Status subgraph binding"
result_summary: "Production multi-network UX and Status Marketplace reads now work correctly."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify:
  - "cd frontend && npm run build"
  - "cd frontend && npm run lint"
  - "cd frontend && npm test"
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T05:01:53.807Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: fix the production wallet UX, dropdown selector, skill docs, and Status subgraph binding together as one release."
verification:
  state: "ok"
  updated_at: "2026-04-07T05:32:52.507Z"
  updated_by: "CODER"
  note: "Backend fallback is live; production routes now resolve correctly: /api and /api/status => status-sepolia, /api/base => base. Verified with backend tests/build, frontend lint/build, live config endpoints, live status intents, and live skill/bundle strings for the dropdown and MetaMask auto-switch flow."
commit:
  hash: "06bc0796bee1589f2b1744cac6e965b641b090ca"
  message: "🚧 CA9NSE ops: align compose services with public routes"
comments:
  -
    author: "CODER"
    body: "Start: repair the Status subgraph binding, downgrade first wallet-switch failures into non-fatal UX states, replace the segmented network toggle with a dropdown, and rewrite the public skill for explicit Base/Status routes."
  -
    author: "INTEGRATOR"
    body: "Verified: fixed the first-wallet UX, replaced the network toggle with a dropdown, updated the public skill for Base and Status usage, added a Status RPC fallback when the subgraph is unavailable, and corrected production routing so /api and /api/status resolve to Status Sepolia while /api/base resolves to Base."
events:
  -
    type: "comment"
    at: "2026-04-07T05:10:45.265Z"
    author: "CODER"
    body: "Start: repair the Status subgraph binding, downgrade first wallet-switch failures into non-fatal UX states, replace the segmented network toggle with a dropdown, and rewrite the public skill for explicit Base/Status routes."
  -
    type: "verify"
    at: "2026-04-07T05:32:52.507Z"
    author: "CODER"
    state: "ok"
    note: "Backend fallback is live; production routes now resolve correctly: /api and /api/status => status-sepolia, /api/base => base. Verified with backend tests/build, frontend lint/build, live config endpoints, live status intents, and live skill/bundle strings for the dropdown and MetaMask auto-switch flow."
  -
    type: "status"
    at: "2026-04-07T05:33:34.178Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: fixed the first-wallet UX, replaced the network toggle with a dropdown, updated the public skill for Base and Status usage, added a Status RPC fallback when the subgraph is unavailable, and corrected production routing so /api and /api/status resolve to Status Sepolia while /api/base resolves to Base."
doc_version: 3
doc_updated_at: "2026-04-07T05:33:34.182Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the first wallet-sync error path, replace the network toggle with a dropdown, update the public Solvera skill for multi-network operation, and repair the Status production backend so Marketplace reads from a live deployment. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Fix production multi-network UX and Status subgraph binding
    
    Fix the first wallet-sync error path, replace the network toggle with a dropdown, update the public Solvera skill for multi-network operation, and repair the Status production backend so Marketplace reads from a live deployment. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Fix the first wallet-sync error path, replace the network toggle with a dropdown, update the public Solvera skill for multi-network operation, and repair the Status production backend so Marketplace reads from a live deployment. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Fix production multi-network UX and Status subgraph binding".
  Plan: |-
    1. Implement the change for "Fix production multi-network UX and Status subgraph binding".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If the Status subgraph binding is fixed only in docs but not in runtime config, the Marketplace will remain broken in production even after a UI redeploy.
    - If wallet rejections are still surfaced as generic hard errors, the first network selection attempt will look like a failed wallet connection instead of a user-declined chain switch.
    - If the public skill stays single-network while the site is multi-network, agents will keep hitting the wrong endpoints or infer the wrong active chain.
  Verify Steps: |-
    1. Run `cd frontend && npm test`, `cd frontend && npm run lint`, and `cd frontend && npm run build`. Expected: the selector, wallet status logic, and docs-related frontend artifacts still build and test cleanly.
    2. Verify the production routing config in the touched files. Expected: Status backend no longer points at a nonexistent subgraph deployment name.
    3. Fetch `https://solvera.markets/api/status/intents?state=OPEN` after release. Expected: it returns data or an empty list, not a `deployment does not exist` error.
    4. Fetch the live bundle and public `SKILL.md` after release. Expected: the site uses a dropdown-based selector path and the published skill explicitly documents `/api/base` and `/api/status` usage.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T05:32:52.507Z — VERIFY — ok
    
    By: CODER
    
    Note: Backend fallback is live; production routes now resolve correctly: /api and /api/status => status-sepolia, /api/base => base. Verified with backend tests/build, frontend lint/build, live config endpoints, live status intents, and live skill/bundle strings for the dropdown and MetaMask auto-switch flow.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:14:27.832Z, excerpt_hash=sha256:1701e13e78706541a72181f1410a5c19ecbfcb8b8b29e4b1b230464906e229b1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Notes: |-
    ### Approvals / Overrides
    - User explicitly requested analysis, a fix plan, and implementation for the production wallet/selector/skill/Status Marketplace issues.
    
    ### Decisions
    - Treat the Status Marketplace error as the highest-priority bug because it is a broken production read path, not just a UX defect.
  Findings: |-
    - Rebound the production Status backend and one-shot graph deploy command to the canonical `intent/marketplace` deployment name so Status reads point at a real subgraph target.
    - Replaced the segmented network buttons with a dropdown selector.
    - Downgraded first wallet-switch refusals and pending requests into neutral UX states instead of hard error messaging.
    - Rewrote the public Solvera skill to document explicit Base and Status API surfaces.
    - Added retry-until-success orchestration for the production Status subgraph deploy so the service no longer depends on a single fragile startup window.
  Context: "Production multi-network rollout is live, but four issues remain visible to users. First, the wallet network sync path shows an error-like state on the first selection attempt because the frontend immediately drives `wallet_switchEthereumChain`/`wallet_addEthereumChain` and treats provider refusals as hard errors. Second, the network selector shipped as a segmented button row, while the requested UX is a dropdown. Third, the public agent skill still describes Solvera as a single-network `/api` integration instead of documenting Base and Status routes. Fourth, the Status production backend points at `http://graph-node:8000/subgraphs/name/intent/status-marketplace`, but that deployment does not exist, so Marketplace on Status fails with a subgraph error."
id_source: "generated"
---
## Summary

Fix production multi-network UX and Status subgraph binding

Fix the first wallet-sync error path, replace the network toggle with a dropdown, update the public Solvera skill for multi-network operation, and repair the Status production backend so Marketplace reads from a live deployment. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Fix the first wallet-sync error path, replace the network toggle with a dropdown, update the public Solvera skill for multi-network operation, and repair the Status production backend so Marketplace reads from a live deployment. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Fix production multi-network UX and Status subgraph binding".

## Plan

1. Implement the change for "Fix production multi-network UX and Status subgraph binding".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If the Status subgraph binding is fixed only in docs but not in runtime config, the Marketplace will remain broken in production even after a UI redeploy.
- If wallet rejections are still surfaced as generic hard errors, the first network selection attempt will look like a failed wallet connection instead of a user-declined chain switch.
- If the public skill stays single-network while the site is multi-network, agents will keep hitting the wrong endpoints or infer the wrong active chain.

## Verify Steps

1. Run `cd frontend && npm test`, `cd frontend && npm run lint`, and `cd frontend && npm run build`. Expected: the selector, wallet status logic, and docs-related frontend artifacts still build and test cleanly.
2. Verify the production routing config in the touched files. Expected: Status backend no longer points at a nonexistent subgraph deployment name.
3. Fetch `https://solvera.markets/api/status/intents?state=OPEN` after release. Expected: it returns data or an empty list, not a `deployment does not exist` error.
4. Fetch the live bundle and public `SKILL.md` after release. Expected: the site uses a dropdown-based selector path and the published skill explicitly documents `/api/base` and `/api/status` usage.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T05:32:52.507Z — VERIFY — ok

By: CODER

Note: Backend fallback is live; production routes now resolve correctly: /api and /api/status => status-sepolia, /api/base => base. Verified with backend tests/build, frontend lint/build, live config endpoints, live status intents, and live skill/bundle strings for the dropdown and MetaMask auto-switch flow.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:14:27.832Z, excerpt_hash=sha256:1701e13e78706541a72181f1410a5c19ecbfcb8b8b29e4b1b230464906e229b1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

### Approvals / Overrides
- User explicitly requested analysis, a fix plan, and implementation for the production wallet/selector/skill/Status Marketplace issues.

### Decisions
- Treat the Status Marketplace error as the highest-priority bug because it is a broken production read path, not just a UX defect.

## Findings

- Rebound the production Status backend and one-shot graph deploy command to the canonical `intent/marketplace` deployment name so Status reads point at a real subgraph target.
- Replaced the segmented network buttons with a dropdown selector.
- Downgraded first wallet-switch refusals and pending requests into neutral UX states instead of hard error messaging.
- Rewrote the public Solvera skill to document explicit Base and Status API surfaces.
- Added retry-until-success orchestration for the production Status subgraph deploy so the service no longer depends on a single fragile startup window.

## Context

Production multi-network rollout is live, but four issues remain visible to users. First, the wallet network sync path shows an error-like state on the first selection attempt because the frontend immediately drives `wallet_switchEthereumChain`/`wallet_addEthereumChain` and treats provider refusals as hard errors. Second, the network selector shipped as a segmented button row, while the requested UX is a dropdown. Third, the public agent skill still describes Solvera as a single-network `/api` integration instead of documenting Base and Status routes. Fourth, the Status production backend points at `http://graph-node:8000/subgraphs/name/intent/status-marketplace`, but that deployment does not exist, so Marketplace on Status fails with a subgraph error.
