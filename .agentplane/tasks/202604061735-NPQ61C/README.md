---
id: "202604061735-NPQ61C"
title: "Deploy IntentMarketplace to Status Sepolia"
result_summary: "Deployed IntentMarketplace to Status Sepolia at 0xF79367dAB12D8E12146685dA2830f112F02De71a and pinned the Foundry deploy target to paris."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604061735-2CPW0M"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T17:54:00.311Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: proceed with the real Status Sepolia broadcast using the funded deployer and record canonical deployment artifacts only."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:02:14.865Z"
  updated_by: "REVIEWER"
  note: "Verified: IntentMarketplace is deployed on Status Sepolia and the canonical broadcast artifact records the live address and receipt."
commit:
  hash: "9f0992359f3a79d79d43510807bbeff1686e86d9"
  message: "✅ NPQ61C contracts: pin Status deploy target to paris"
comments:
  -
    author: "CODER"
    body: "Start: deploy IntentMarketplace to Status Sepolia with the funded deployer, then record the canonical address, tx hash, block, and broadcast artifact for downstream Status tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: IntentMarketplace is deployed on Status Sepolia, and the repository default deploy path now targets an EVM version that the network accepts."
events:
  -
    type: "status"
    at: "2026-04-06T17:54:00.342Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: deploy IntentMarketplace to Status Sepolia with the funded deployer, then record the canonical address, tx hash, block, and broadcast artifact for downstream Status tasks."
  -
    type: "verify"
    at: "2026-04-06T18:02:14.865Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: IntentMarketplace is deployed on Status Sepolia and the canonical broadcast artifact records the live address and receipt."
  -
    type: "status"
    at: "2026-04-06T18:02:50.002Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: IntentMarketplace is deployed on Status Sepolia, and the repository default deploy path now targets an EVM version that the network accepts."
doc_version: 3
doc_updated_at: "2026-04-06T18:02:50.003Z"
doc_updated_by: "INTEGRATOR"
description: "Broadcast IntentMarketplace to Status Sepolia using the funded deployer and record canonical deployment artifacts. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Deploy IntentMarketplace to Status Sepolia
    
    Broadcast IntentMarketplace to Status Sepolia using the funded deployer and record canonical deployment artifacts. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Broadcast IntentMarketplace to Status Sepolia using the funded deployer and record canonical deployment artifacts. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Deploy IntentMarketplace to Status Sepolia".
  Plan: |-
    1. Confirm readiness: dependency `202604061735-2CPW0M` is done, the funded deployer address still matches `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`, and the Status Sepolia RPC answers for chain `1660990954`.
    2. Broadcast `IntentMarketplace` with the canonical command `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv`.
    3. Capture canonical deployment evidence: deployed address, tx hash, block number, and broadcast artifact path under `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/`.
    4. Verify post-deploy state with chain reads and record any follow-up needed for the indexer/backend/frontend tasks.
  Risks: |-
    - The deployer balance may be insufficient or nonce may have moved since the last check. Mitigation: re-check address, nonce, and balance immediately before broadcast.
    - Status Sepolia RPC may accept simulation but fail during broadcast/receipt polling. Mitigation: run the exact canonical command with `-vvvv`, preserve the raw output, and treat the resulting `run-latest.json` as the source of truth.
    - A mined deployment can still be the wrong canonical address if we silently retry. Mitigation: preserve every tx hash and require downstream tasks to consume the address explicitly recorded in this task.
  Verify Steps: |-
    1. Run `set -a; source .env; source .env.status-sepolia; set +a; cast wallet address --private-key "$DEPLOYER_PRIVATE_KEY"` and `cast balance 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d --rpc-url "$STATUS_SEPOLIA_RPC_URL"`. Expected: the deployer resolves to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and has enough ETH for broadcast.
    2. Run `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv`. Expected: Foundry reports a successful on-chain deployment on chain `1660990954` and writes a broadcast artifact under `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
    3. Run `jq`/`cast code` checks against the deployed address from `run-latest.json`. Expected: the artifact contains a contract address, tx hash, and block number, and `cast code` at that address on Status Sepolia is non-empty.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:02:14.865Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Verified: IntentMarketplace is deployed on Status Sepolia and the canonical broadcast artifact records the live address and receipt.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:02:14.318Z, excerpt_hash=sha256:7c0a6465bf63eaa977819e366b5ffa8b67476b6b4d6bdd9cb874892022f4a77a
    
    Details:
    
    Checks run:
    - Deployer preflight: address `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`, balance `10000000000000000`, nonce advanced from `7` to `10` across retries.
    - Final deploy: `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv` completed successfully after pinning `evm_version = "paris"`.
    - Artifact check: `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json` records tx `0xc1583d667d4792f0c19389361961309fd26c540fb339eef63e3df8749740f5ed` and contract `0xF79367dAB12D8E12146685dA2830f112F02De71a`.
    - Chain check: receipt block `18800150` has `status=1`, and `cast code 0xF79367dAB12D8E12146685dA2830f112F02De71a` returned non-empty runtime bytecode.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. If broadcast fails before mining, do not change downstream config; keep Status deployment unset and capture the failure cause in ## Findings.
    2. If deployment mines but is unusable, treat the address as invalid for downstream tasks, document the bad deployment artifact, and redeploy from a new task instead of silently reusing it.
    3. Never overwrite deployment records: preserve every `run-latest.json`/tx hash so later tasks can choose the correct canonical address explicitly.
  Findings: |-
    Attempt 1 facts: tx `0x35b9fd84cf9f94c96221de8087758c38ce5a5074f635a3161eea4d70e84c0a3c` mined with `status=0` at block `18799960`; predicted address `0x4898a9BE1F756d47eC577D247F0683C6d743D926` has empty code. Attempt 2 facts: tx `0x64f461f70327e7c9a3a33570b38c957016c076a8f1c8e9e5c1b5e81132134940` mined with `status=0` at block `18799997`; predicted address `0xa977Dfe6f0A0C31A71A61eD6A361c0dee0b5C85a` has empty code.
    Refined diagnosis: the failures were caused by the wrong EVM target for Status deployment. The repository default behaved as `prague`; compiling with `paris` removes `PUSH0` from the creation bytecode, which matches the Status deployment examples. `contracts/foundry.toml` now pins `evm_version = "paris"`, and `contracts/README.md` documents the requirement.
    Canonical deployment result: the final broadcast succeeded with tx `0xc1583d667d4792f0c19389361961309fd26c540fb339eef63e3df8749740f5ed`. `IntentMarketplace` is live on Status Sepolia at `0xF79367dAB12D8E12146685dA2830f112F02De71a` in block `18800150`; `cast code` at that address is non-empty, and the deployer nonce advanced to `10`. The canonical Foundry artifact is `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
id_source: "generated"
---
## Summary

Deploy IntentMarketplace to Status Sepolia

Broadcast IntentMarketplace to Status Sepolia using the funded deployer and record canonical deployment artifacts. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Broadcast IntentMarketplace to Status Sepolia using the funded deployer and record canonical deployment artifacts. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Deploy IntentMarketplace to Status Sepolia".

## Plan

1. Confirm readiness: dependency `202604061735-2CPW0M` is done, the funded deployer address still matches `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`, and the Status Sepolia RPC answers for chain `1660990954`.
2. Broadcast `IntentMarketplace` with the canonical command `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv`.
3. Capture canonical deployment evidence: deployed address, tx hash, block number, and broadcast artifact path under `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/`.
4. Verify post-deploy state with chain reads and record any follow-up needed for the indexer/backend/frontend tasks.

## Risks

- The deployer balance may be insufficient or nonce may have moved since the last check. Mitigation: re-check address, nonce, and balance immediately before broadcast.
- Status Sepolia RPC may accept simulation but fail during broadcast/receipt polling. Mitigation: run the exact canonical command with `-vvvv`, preserve the raw output, and treat the resulting `run-latest.json` as the source of truth.
- A mined deployment can still be the wrong canonical address if we silently retry. Mitigation: preserve every tx hash and require downstream tasks to consume the address explicitly recorded in this task.

## Verify Steps

1. Run `set -a; source .env; source .env.status-sepolia; set +a; cast wallet address --private-key "$DEPLOYER_PRIVATE_KEY"` and `cast balance 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d --rpc-url "$STATUS_SEPOLIA_RPC_URL"`. Expected: the deployer resolves to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and has enough ETH for broadcast.
2. Run `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv`. Expected: Foundry reports a successful on-chain deployment on chain `1660990954` and writes a broadcast artifact under `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
3. Run `jq`/`cast code` checks against the deployed address from `run-latest.json`. Expected: the artifact contains a contract address, tx hash, and block number, and `cast code` at that address on Status Sepolia is non-empty.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:02:14.865Z — VERIFY — ok

By: REVIEWER

Note: Verified: IntentMarketplace is deployed on Status Sepolia and the canonical broadcast artifact records the live address and receipt.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:02:14.318Z, excerpt_hash=sha256:7c0a6465bf63eaa977819e366b5ffa8b67476b6b4d6bdd9cb874892022f4a77a

Details:

Checks run:
- Deployer preflight: address `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`, balance `10000000000000000`, nonce advanced from `7` to `10` across retries.
- Final deploy: `set -a; source .env; source .env.status-sepolia; set +a; cd contracts && forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast -vvvv` completed successfully after pinning `evm_version = "paris"`.
- Artifact check: `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json` records tx `0xc1583d667d4792f0c19389361961309fd26c540fb339eef63e3df8749740f5ed` and contract `0xF79367dAB12D8E12146685dA2830f112F02De71a`.
- Chain check: receipt block `18800150` has `status=1`, and `cast code 0xF79367dAB12D8E12146685dA2830f112F02De71a` returned non-empty runtime bytecode.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. If broadcast fails before mining, do not change downstream config; keep Status deployment unset and capture the failure cause in ## Findings.
2. If deployment mines but is unusable, treat the address as invalid for downstream tasks, document the bad deployment artifact, and redeploy from a new task instead of silently reusing it.
3. Never overwrite deployment records: preserve every `run-latest.json`/tx hash so later tasks can choose the correct canonical address explicitly.

## Findings

Attempt 1 facts: tx `0x35b9fd84cf9f94c96221de8087758c38ce5a5074f635a3161eea4d70e84c0a3c` mined with `status=0` at block `18799960`; predicted address `0x4898a9BE1F756d47eC577D247F0683C6d743D926` has empty code. Attempt 2 facts: tx `0x64f461f70327e7c9a3a33570b38c957016c076a8f1c8e9e5c1b5e81132134940` mined with `status=0` at block `18799997`; predicted address `0xa977Dfe6f0A0C31A71A61eD6A361c0dee0b5C85a` has empty code.
Refined diagnosis: the failures were caused by the wrong EVM target for Status deployment. The repository default behaved as `prague`; compiling with `paris` removes `PUSH0` from the creation bytecode, which matches the Status deployment examples. `contracts/foundry.toml` now pins `evm_version = "paris"`, and `contracts/README.md` documents the requirement.
Canonical deployment result: the final broadcast succeeded with tx `0xc1583d667d4792f0c19389361961309fd26c540fb339eef63e3df8749740f5ed`. `IntentMarketplace` is live on Status Sepolia at `0xF79367dAB12D8E12146685dA2830f112F02De71a` in block `18800150`; `cast code` at that address is non-empty, and the deployer nonce advanced to `10`. The canonical Foundry artifact is `contracts/broadcast/DeployIntentMarketplace.s.sol/1660990954/run-latest.json`.
