---
id: "202604061735-3JCAD3"
title: "Switch backend defaults to Status-ready config"
result_summary: "Switched backend defaults and tests to Status Sepolia metadata while keeping contract and subgraph endpoints environment-driven."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061735-RF7VW9"
tags:
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T18:15:12.114Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: switch backend metadata, tests, and env/docs to Status-first defaults without touching frontend or deploy infrastructure."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:16:25.903Z"
  updated_by: "REVIEWER"
  note: "Verified: backend defaults, tests, and env/docs are Status-ready and no Base fallback remains in API metadata."
commit:
  hash: "45e11927e97ec8a57169aa22ac808de1cd9f6e0a"
  message: "✅ 3JCAD3 backend: switch defaults to Status metadata"
comments:
  -
    author: "CODER"
    body: "Start: switch backend defaults and tests from Base-biased assumptions to the live Status Sepolia contract, chain metadata, and self-hosted subgraph entrypoint."
  -
    author: "INTEGRATOR"
    body: "Verified: backend API metadata, tests, and operator env/docs now point to Status Sepolia instead of falling back to Base."
events:
  -
    type: "status"
    at: "2026-04-06T18:15:12.134Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch backend defaults and tests from Base-biased assumptions to the live Status Sepolia contract, chain metadata, and self-hosted subgraph entrypoint."
  -
    type: "verify"
    at: "2026-04-06T18:16:25.903Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: backend defaults, tests, and env/docs are Status-ready and no Base fallback remains in API metadata."
  -
    type: "status"
    at: "2026-04-06T18:16:46.585Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: backend API metadata, tests, and operator env/docs now point to Status Sepolia instead of falling back to Base."
doc_version: 3
doc_updated_at: "2026-04-06T18:16:46.587Z"
doc_updated_by: "INTEGRATOR"
description: "Update backend config surfaces and tests so Status chain metadata and contract/indexer endpoints can be used without Base-only assumptions. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Switch backend defaults to Status-ready config
    
    Update backend config surfaces and tests so Status chain metadata and contract/indexer endpoints can be used without Base-only assumptions. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Update backend config surfaces and tests so Status chain metadata and contract/indexer endpoints can be used without Base-only assumptions. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Switch backend defaults to Status-ready config".
  Plan: |-
    1. Implement the change for "Switch backend defaults to Status-ready config".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If backend code hardcodes the live contract address in too many places, the next redeploy will create drift. Mitigation: keep the live address in env/docs and use code fallbacks only for chain metadata, not for hidden logic.
    - If `SUBGRAPH_URL` is made to look production-ready before the Status graph service is actually published, operators will point the backend at a dead endpoint. Mitigation: document the self-hosted query URL explicitly and keep it environment-driven.
    - If tests still encode Base semantics, later frontend work will inherit the wrong chain metadata. Mitigation: update controller tests to assert Status values directly.
  Verify Steps: |-
    1. Run `rg -n "status-sepolia|1660990954|0xF79367dAB12D8E12146685dA2830f112F02De71a|http://localhost:8000/subgraphs/name/intent/marketplace" backend env.example`. Expected: backend code, tests, and env docs no longer default to Base and instead point to canonical Status metadata.
    2. Run `cd backend && npm test`. Expected: backend tests pass with Status chain assertions.
    3. Inspect `GET /api/config` and tx next-step behavior via tests or controller code. Expected: default network metadata is Status-oriented and no fallback still says `base`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:16:25.903Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Verified: backend defaults, tests, and env/docs are Status-ready and no Base fallback remains in API metadata.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:16:25.306Z, excerpt_hash=sha256:c072ecca5923af496b2a28e3e56efdf579001ae05f99ab65fe06382df425bf39
    
    Details:
    
    Checks run:
    - `rg -n "status-sepolia|1660990954|0xF79367dAB12D8E12146685dA2830f112F02De71a|http://localhost:8000/subgraphs/name/intent/marketplace" backend env.example` confirmed Status-first metadata in backend code, tests, and env/docs.
    - `cd backend && npm test` passed (16 tests, 0 failures).
    - Controller inspection confirmed that `/api/config` and tx next-step payloads no longer default to `base`.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Backend no longer emits Base as the implicit chain in API metadata. `backend/src/intents.controller.ts` now defaults transaction next-step payloads and `/api/config` metadata to `status-sepolia` / `1660990954` when the network env is omitted, while still keeping the actual contract and subgraph endpoints environment-driven.
    Operator-facing defaults were switched to the live Status deployment in `env.example`: contract `0xF79367dAB12D8E12146685dA2830f112F02De71a`, RPC `https://public.sepolia.rpc.status.network`, explorer `https://sepoliascan.status.network`, and self-hosted graph query URL `http://localhost:8000/subgraphs/name/intent/marketplace`. `backend/README.md` now documents the same canonical values.
    Tests were updated to assert Status metadata directly, and `cd backend && npm test` passed. Deliberate non-change: `SUBGRAPH_URL` still has no hardcoded runtime fallback in code, because the real query endpoint remains an operator/deployment concern rather than a safe compile-time default.
id_source: "generated"
---
## Summary

Switch backend defaults to Status-ready config

Update backend config surfaces and tests so Status chain metadata and contract/indexer endpoints can be used without Base-only assumptions. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Update backend config surfaces and tests so Status chain metadata and contract/indexer endpoints can be used without Base-only assumptions. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Switch backend defaults to Status-ready config".

## Plan

1. Implement the change for "Switch backend defaults to Status-ready config".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If backend code hardcodes the live contract address in too many places, the next redeploy will create drift. Mitigation: keep the live address in env/docs and use code fallbacks only for chain metadata, not for hidden logic.
- If `SUBGRAPH_URL` is made to look production-ready before the Status graph service is actually published, operators will point the backend at a dead endpoint. Mitigation: document the self-hosted query URL explicitly and keep it environment-driven.
- If tests still encode Base semantics, later frontend work will inherit the wrong chain metadata. Mitigation: update controller tests to assert Status values directly.

## Verify Steps

1. Run `rg -n "status-sepolia|1660990954|0xF79367dAB12D8E12146685dA2830f112F02De71a|http://localhost:8000/subgraphs/name/intent/marketplace" backend env.example`. Expected: backend code, tests, and env docs no longer default to Base and instead point to canonical Status metadata.
2. Run `cd backend && npm test`. Expected: backend tests pass with Status chain assertions.
3. Inspect `GET /api/config` and tx next-step behavior via tests or controller code. Expected: default network metadata is Status-oriented and no fallback still says `base`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:16:25.903Z — VERIFY — ok

By: REVIEWER

Note: Verified: backend defaults, tests, and env/docs are Status-ready and no Base fallback remains in API metadata.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:16:25.306Z, excerpt_hash=sha256:c072ecca5923af496b2a28e3e56efdf579001ae05f99ab65fe06382df425bf39

Details:

Checks run:
- `rg -n "status-sepolia|1660990954|0xF79367dAB12D8E12146685dA2830f112F02De71a|http://localhost:8000/subgraphs/name/intent/marketplace" backend env.example` confirmed Status-first metadata in backend code, tests, and env/docs.
- `cd backend && npm test` passed (16 tests, 0 failures).
- Controller inspection confirmed that `/api/config` and tx next-step payloads no longer default to `base`.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Backend no longer emits Base as the implicit chain in API metadata. `backend/src/intents.controller.ts` now defaults transaction next-step payloads and `/api/config` metadata to `status-sepolia` / `1660990954` when the network env is omitted, while still keeping the actual contract and subgraph endpoints environment-driven.
Operator-facing defaults were switched to the live Status deployment in `env.example`: contract `0xF79367dAB12D8E12146685dA2830f112F02De71a`, RPC `https://public.sepolia.rpc.status.network`, explorer `https://sepoliascan.status.network`, and self-hosted graph query URL `http://localhost:8000/subgraphs/name/intent/marketplace`. `backend/README.md` now documents the same canonical values.
Tests were updated to assert Status metadata directly, and `cd backend && npm test` passed. Deliberate non-change: `SUBGRAPH_URL` still has no hardcoded runtime fallback in code, because the real query endpoint remains an operator/deployment concern rather than a safe compile-time default.
