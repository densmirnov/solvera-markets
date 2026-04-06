---
id: "202604061735-XM276Y"
title: "Run Status end-to-end smoke"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604061735-NPQ61C"
  - "202604061735-RF7VW9"
  - "202604061735-3JCAD3"
  - "202604061735-WDW5JH"
  - "202604061735-2BWTA0"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:01:30.263Z"
  updated_by: "TESTER"
  note: "Status smoke lifecycle, local Graph indexing, and backend reads succeeded"
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: run the first full Status Sepolia lifecycle smoke across onchain txs, local subgraph indexing, and backend reads against the live marketplace deployment."
events:
  -
    type: "status"
    at: "2026-04-06T18:47:19.730Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: run the first full Status Sepolia lifecycle smoke across onchain txs, local subgraph indexing, and backend reads against the live marketplace deployment."
  -
    type: "verify"
    at: "2026-04-06T19:01:30.263Z"
    author: "TESTER"
    state: "ok"
    note: "Status smoke lifecycle, local Graph indexing, and backend reads succeeded"
doc_version: 3
doc_updated_at: "2026-04-06T19:01:30.267Z"
doc_updated_by: "TESTER"
description: "Execute and record the first end-to-end Solvera smoke on Status Sepolia across contract, indexer, backend, frontend, and wallet tooling. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Run Status end-to-end smoke
    
    Execute and record the first end-to-end Solvera smoke on Status Sepolia across contract, indexer, backend, frontend, and wallet tooling. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Execute and record the first end-to-end Solvera smoke on Status Sepolia across contract, indexer, backend, frontend, and wallet tooling. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Run Status end-to-end smoke".
  Plan: |-
    1. Implement the change for "Run Status end-to-end smoke".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If the smoke uses placeholder or off-spec assets, the result will not prove a real Status lifecycle. Mitigation: deploy deterministic test ERC-20s on Status Sepolia and run the actual marketplace flow against the live `IntentMarketplace` deployment.
    - If the indexer/backend are not pointed at the canonical Status deployment, the smoke can pass locally while the production path remains broken. Mitigation: run the canonical `subgraph.status.yaml`, deploy it into the local Graph Node, and point backend env to that local subgraph plus the live Status contract.
    - Public Status RPC and explorer endpoints are intermittent. Mitigation: keep retries limited, pin all commands to the canonical live contract address, and record exact tx hashes/block references in task findings.
  Verify Steps: |-
    1. Run a real onchain smoke on Status Sepolia that creates an intent, submits an offer, selects a winner, and fulfills it against the live `IntentMarketplace`. Expected: all four transactions succeed and tx hashes are recorded.
    2. Confirm the canonical local subgraph indexes the smoke transactions. Expected: the relevant `Intent`, `Offer`, and event entities appear when queried through Graph Node.
    3. Confirm the backend reads the same smoke data through its Status config path. Expected: `/api/intents`, `/api/intents/:id`, `/api/intents/:id/offers`, and `/api/events` expose the onchain smoke lifecycle without Base-specific metadata.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:01:30.263Z — VERIFY — ok
    
    By: TESTER
    
    Note: Status smoke lifecycle, local Graph indexing, and backend reads succeeded
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:01:01.161Z, excerpt_hash=sha256:1d176c03c7b4c4c791c3711ddb306a4759971f9cbb3a99b3ee4f64c9d6867139
    
    Details:
    
    Onchain smoke succeeded on Status Sepolia with intent 0x17a2ce8fc15c805ff7828be8ad9b2d8de4029cfe26605c6b848e17a128c3bfb0. Tx hashes: create 0xf2821597930f48d83e5537a6d7437fb97bd32de940a404696ee7974bd32c5067, offer 0x64a5c1ed67fad0d4cf173ce31d0707ddbcc63ad0800ac0b857f40ef826ad5b67, select winner 0xea729b975f79e0f6ae4b5aa7e4c58002462e16f941bdf645a2f38a1c9a736c07, fulfill+accept 0x7ff814c030dda1d0ead58ef29b58232ed07fea2ed133a09b0d10301509cb5f35. Local Graph query returned ACCEPTED intent, offer, reputation=1, and matching event log sequence. Backend on port 3100 returned matching data for /api/config, /api/intents, /api/intents/:id, /api/intents/:id/offers, /api/events, and write-calldata endpoints.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Deployed deterministic Status smoke tokens: SRWD at 0xc793472fDFcBcd6FFC66867201427c02ebc17D49 and SOUT at 0x0fbcDC77D0c28a0809716bcaB1adb4cbcE705e4C.
    - Executed a full live Status Sepolia lifecycle against IntentMarketplace 0xF79367dAB12D8E12146685dA2830f112F02De71a using deployer 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d.
    - Proven intent id: 0x17a2ce8fc15c805ff7828be8ad9b2d8de4029cfe26605c6b848e17a128c3bfb0.
    - Tx hashes: create 0xf2821597930f48d83e5537a6d7437fb97bd32de940a404696ee7974bd32c5067, offer 0x64a5c1ed67fad0d4cf173ce31d0707ddbcc63ad0800ac0b857f40ef826ad5b67, select winner 0xea729b975f79e0f6ae4b5aa7e4c58002462e16f941bdf645a2f38a1c9a736c07, fulfill+accept 0x7ff814c030dda1d0ead58ef29b58232ed07fea2ed133a09b0d10301509cb5f35.
    - Contract state after smoke: ACCEPTED and solver reputation=1.
    - Local Graph Node indexed the lifecycle and backend on port 3100 returned matching data via /api/config, /api/intents, /api/intents/:id, /api/intents/:id/offers, /api/events, and tx-builder POST endpoints.
id_source: "generated"
---
## Summary

Run Status end-to-end smoke

Execute and record the first end-to-end Solvera smoke on Status Sepolia across contract, indexer, backend, frontend, and wallet tooling. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Execute and record the first end-to-end Solvera smoke on Status Sepolia across contract, indexer, backend, frontend, and wallet tooling. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Run Status end-to-end smoke".

## Plan

1. Implement the change for "Run Status end-to-end smoke".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If the smoke uses placeholder or off-spec assets, the result will not prove a real Status lifecycle. Mitigation: deploy deterministic test ERC-20s on Status Sepolia and run the actual marketplace flow against the live `IntentMarketplace` deployment.
- If the indexer/backend are not pointed at the canonical Status deployment, the smoke can pass locally while the production path remains broken. Mitigation: run the canonical `subgraph.status.yaml`, deploy it into the local Graph Node, and point backend env to that local subgraph plus the live Status contract.
- Public Status RPC and explorer endpoints are intermittent. Mitigation: keep retries limited, pin all commands to the canonical live contract address, and record exact tx hashes/block references in task findings.

## Verify Steps

1. Run a real onchain smoke on Status Sepolia that creates an intent, submits an offer, selects a winner, and fulfills it against the live `IntentMarketplace`. Expected: all four transactions succeed and tx hashes are recorded.
2. Confirm the canonical local subgraph indexes the smoke transactions. Expected: the relevant `Intent`, `Offer`, and event entities appear when queried through Graph Node.
3. Confirm the backend reads the same smoke data through its Status config path. Expected: `/api/intents`, `/api/intents/:id`, `/api/intents/:id/offers`, and `/api/events` expose the onchain smoke lifecycle without Base-specific metadata.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:01:30.263Z — VERIFY — ok

By: TESTER

Note: Status smoke lifecycle, local Graph indexing, and backend reads succeeded

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:01:01.161Z, excerpt_hash=sha256:1d176c03c7b4c4c791c3711ddb306a4759971f9cbb3a99b3ee4f64c9d6867139

Details:

Onchain smoke succeeded on Status Sepolia with intent 0x17a2ce8fc15c805ff7828be8ad9b2d8de4029cfe26605c6b848e17a128c3bfb0. Tx hashes: create 0xf2821597930f48d83e5537a6d7437fb97bd32de940a404696ee7974bd32c5067, offer 0x64a5c1ed67fad0d4cf173ce31d0707ddbcc63ad0800ac0b857f40ef826ad5b67, select winner 0xea729b975f79e0f6ae4b5aa7e4c58002462e16f941bdf645a2f38a1c9a736c07, fulfill+accept 0x7ff814c030dda1d0ead58ef29b58232ed07fea2ed133a09b0d10301509cb5f35. Local Graph query returned ACCEPTED intent, offer, reputation=1, and matching event log sequence. Backend on port 3100 returned matching data for /api/config, /api/intents, /api/intents/:id, /api/intents/:id/offers, /api/events, and write-calldata endpoints.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Deployed deterministic Status smoke tokens: SRWD at 0xc793472fDFcBcd6FFC66867201427c02ebc17D49 and SOUT at 0x0fbcDC77D0c28a0809716bcaB1adb4cbcE705e4C.
- Executed a full live Status Sepolia lifecycle against IntentMarketplace 0xF79367dAB12D8E12146685dA2830f112F02De71a using deployer 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d.
- Proven intent id: 0x17a2ce8fc15c805ff7828be8ad9b2d8de4029cfe26605c6b848e17a128c3bfb0.
- Tx hashes: create 0xf2821597930f48d83e5537a6d7437fb97bd32de940a404696ee7974bd32c5067, offer 0x64a5c1ed67fad0d4cf173ce31d0707ddbcc63ad0800ac0b857f40ef826ad5b67, select winner 0xea729b975f79e0f6ae4b5aa7e4c58002462e16f941bdf645a2f38a1c9a736c07, fulfill+accept 0x7ff814c030dda1d0ead58ef29b58232ed07fea2ed133a09b0d10301509cb5f35.
- Contract state after smoke: ACCEPTED and solver reputation=1.
- Local Graph Node indexed the lifecycle and backend on port 3100 returned matching data via /api/config, /api/intents, /api/intents/:id, /api/intents/:id/offers, /api/events, and tx-builder POST endpoints.
