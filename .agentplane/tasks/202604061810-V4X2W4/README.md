---
id: "202604061810-V4X2W4"
title: "Verify Status Sepolia contracts on StatusScan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061735-NPQ61C"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T18:17:53.775Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: verify the live Status deployment on StatusScan first and treat the user-specified address as a separate identity until proven otherwise."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:23:29.760Z"
  updated_by: "REVIEWER"
  note: "StatusScan verification confirmed"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: verify the live Status Sepolia deployment on StatusScan/Blockscout with exact compiler settings and constructor args, then inspect the user-specified explorer address as a separate identity."
events:
  -
    type: "status"
    at: "2026-04-06T18:17:54.259Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify the live Status Sepolia deployment on StatusScan/Blockscout with exact compiler settings and constructor args, then inspect the user-specified explorer address as a separate identity."
  -
    type: "verify"
    at: "2026-04-06T18:23:29.760Z"
    author: "REVIEWER"
    state: "ok"
    note: "StatusScan verification confirmed"
doc_version: 3
doc_updated_at: "2026-04-06T18:23:29.775Z"
doc_updated_by: "CODER"
description: "Verify deployed Status Sepolia contract sources on Blockscout/StatusScan for the live IntentMarketplace deployment and the user-specified explorer address when contract identity is confirmed. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Verify Status Sepolia contracts on StatusScan
    
    Verify deployed Status Sepolia contract sources on Blockscout/StatusScan for the live IntentMarketplace deployment and the user-specified explorer address when contract identity is confirmed. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Verify deployed Status Sepolia contract sources on Blockscout/StatusScan for the live IntentMarketplace deployment and the user-specified explorer address when contract identity is confirmed. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Verify Status Sepolia contracts on StatusScan".
  Plan: |-
    1. Verify the live Status Sepolia deployment `0xF79367dAB12D8E12146685dA2830f112F02De71a` on StatusScan/Blockscout using Foundry with the exact compiler settings and constructor arguments from the canonical broadcast artifact.
    2. Separately inspect the user-specified explorer address `0x4Fb609F4a457f47B41D35Dd060447271F000120A` and confirm whether it is the same contract or a distinct deployment before attempting any second verification.
    3. Record explorer URLs, verification status, and any identity mismatch explicitly so downstream docs/frontend do not cite the wrong address.
  Risks: |-
    - If the constructor arguments or compiler settings do not match the deployed bytecode, StatusScan verification will fail even though the contract is valid. Mitigation: source constructor args from `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json` and keep `evm_version = paris`.
    - If the user-specified address is a different deployment, verifying it with the live artifact would be a false claim. Mitigation: treat `0x4Fb6...` as a separate identity until code/metadata prove otherwise.
    - Status public RPC is intermittent, so any explorer-side checks that rely on chain lookups may need retries. Mitigation: prefer Blockscout verification endpoints and preserve exact command output.
  Verify Steps: |-
    1. Run the Foundry/Blockscout verification command for `0xF79367dAB12D8E12146685dA2830f112F02De71a` with exact constructor args and `evm_version paris`. Expected: Blockscout accepts the submission and reports the contract as verified or verification-pending with a successful final result.
    2. Open or query the explorer verification page for the live address. Expected: StatusScan shows verified source code for `IntentMarketplace`.
    3. Check the user-specified address `0x4Fb609F4a457f47B41D35Dd060447271F000120A`. Expected: either it is confirmed as the same contract and also verified, or the task findings explicitly record that it is a different/unconfirmed deployment.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:23:29.760Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: StatusScan verification confirmed
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:23:29.602Z, excerpt_hash=sha256:1128978761e94f44bc0c44758e62e999bff8c817d945636538194536a7b34b1f
    
    Details:
    
    Verified `IntentMarketplace` at `0xF79367dAB12D8E12146685dA2830f112F02De71a` on Status Sepolia through Blockscout/StatusScan with exact compiler and constructor settings. Separately confirmed that `0x4Fb609F4a457f47B41D35Dd060447271F000120A` is a different, already-verified `DemoFaucet` contract and must not be used as the Solvera address.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Live Solvera deployment `0xF79367dAB12D8E12146685dA2830f112F02De71a` was successfully verified on StatusScan via Blockscout using `forge verify-contract` with `--use 0.8.24`, `--no-auto-detect`, `--evm-version paris`, and the exact constructor args from `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
    2. The successful verification run returned `Pass - Verified`, so the deployed `IntentMarketplace` source is now published on `https://sepoliascan.status.network/address/0xF79367dAB12D8E12146685dA2830f112F02De71a`.
    3. The user-provided address `0x4Fb609F4a457f47B41D35Dd060447271F000120A` is not the same contract. Blockscout API metadata identifies it as an already-verified `DemoFaucet` compiled from `src/DemoFaucet.sol` with Solidity `0.8.26`, so it must not be cited as the Solvera marketplace deployment.
    4. Operational caveat: explorer/RPC endpoints were intermittent during inspection, but the final verification result came from the verifier flow itself, not from a speculative UI check.
id_source: "generated"
---
## Summary

Verify Status Sepolia contracts on StatusScan

Verify deployed Status Sepolia contract sources on Blockscout/StatusScan for the live IntentMarketplace deployment and the user-specified explorer address when contract identity is confirmed. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Verify deployed Status Sepolia contract sources on Blockscout/StatusScan for the live IntentMarketplace deployment and the user-specified explorer address when contract identity is confirmed. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Verify Status Sepolia contracts on StatusScan".

## Plan

1. Verify the live Status Sepolia deployment `0xF79367dAB12D8E12146685dA2830f112F02De71a` on StatusScan/Blockscout using Foundry with the exact compiler settings and constructor arguments from the canonical broadcast artifact.
2. Separately inspect the user-specified explorer address `0x4Fb609F4a457f47B41D35Dd060447271F000120A` and confirm whether it is the same contract or a distinct deployment before attempting any second verification.
3. Record explorer URLs, verification status, and any identity mismatch explicitly so downstream docs/frontend do not cite the wrong address.

## Risks

- If the constructor arguments or compiler settings do not match the deployed bytecode, StatusScan verification will fail even though the contract is valid. Mitigation: source constructor args from `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json` and keep `evm_version = paris`.
- If the user-specified address is a different deployment, verifying it with the live artifact would be a false claim. Mitigation: treat `0x4Fb6...` as a separate identity until code/metadata prove otherwise.
- Status public RPC is intermittent, so any explorer-side checks that rely on chain lookups may need retries. Mitigation: prefer Blockscout verification endpoints and preserve exact command output.

## Verify Steps

1. Run the Foundry/Blockscout verification command for `0xF79367dAB12D8E12146685dA2830f112F02De71a` with exact constructor args and `evm_version paris`. Expected: Blockscout accepts the submission and reports the contract as verified or verification-pending with a successful final result.
2. Open or query the explorer verification page for the live address. Expected: StatusScan shows verified source code for `IntentMarketplace`.
3. Check the user-specified address `0x4Fb609F4a457f47B41D35Dd060447271F000120A`. Expected: either it is confirmed as the same contract and also verified, or the task findings explicitly record that it is a different/unconfirmed deployment.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:23:29.760Z — VERIFY — ok

By: REVIEWER

Note: StatusScan verification confirmed

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:23:29.602Z, excerpt_hash=sha256:1128978761e94f44bc0c44758e62e999bff8c817d945636538194536a7b34b1f

Details:

Verified `IntentMarketplace` at `0xF79367dAB12D8E12146685dA2830f112F02De71a` on Status Sepolia through Blockscout/StatusScan with exact compiler and constructor settings. Separately confirmed that `0x4Fb609F4a457f47B41D35Dd060447271F000120A` is a different, already-verified `DemoFaucet` contract and must not be used as the Solvera address.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Live Solvera deployment `0xF79367dAB12D8E12146685dA2830f112F02De71a` was successfully verified on StatusScan via Blockscout using `forge verify-contract` with `--use 0.8.24`, `--no-auto-detect`, `--evm-version paris`, and the exact constructor args from `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
2. The successful verification run returned `Pass - Verified`, so the deployed `IntentMarketplace` source is now published on `https://sepoliascan.status.network/address/0xF79367dAB12D8E12146685dA2830f112F02De71a`.
3. The user-provided address `0x4Fb609F4a457f47B41D35Dd060447271F000120A` is not the same contract. Blockscout API metadata identifies it as an already-verified `DemoFaucet` compiled from `src/DemoFaucet.sol` with Solidity `0.8.26`, so it must not be cited as the Solvera marketplace deployment.
4. Operational caveat: explorer/RPC endpoints were intermittent during inspection, but the final verification result came from the verifier flow itself, not from a speculative UI check.
