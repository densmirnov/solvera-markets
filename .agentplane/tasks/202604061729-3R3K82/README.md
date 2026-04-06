---
id: "202604061729-3R3K82"
title: "Add multi-network env profiles and validate Status deployer"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T17:30:41.715Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: create local multi-network env profiles without secret duplication and validate the funded Status deployer address via derivation and RPC access."
verification:
  state: "ok"
  updated_at: "2026-04-06T17:32:59.611Z"
  updated_by: "REVIEWER"
  note: "Created local multi-network env overlays for Base mainnet, Base Sepolia, and Status Sepolia; updated env.example to document the overlay model; confirmed that the private key from the current .env derives to 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d; and confirmed live Status RPC visibility with chain id 1660990954 and balance 0.01 ETH."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: create local multi-network env profiles, keep the existing deployer key as the primary Status deployer without secret duplication, and validate that the funded Status address is derivable and reachable over Status RPC."
events:
  -
    type: "status"
    at: "2026-04-06T17:30:53.356Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: create local multi-network env profiles, keep the existing deployer key as the primary Status deployer without secret duplication, and validate that the funded Status address is derivable and reachable over Status RPC."
  -
    type: "verify"
    at: "2026-04-06T17:32:59.611Z"
    author: "REVIEWER"
    state: "ok"
    note: "Created local multi-network env overlays for Base mainnet, Base Sepolia, and Status Sepolia; updated env.example to document the overlay model; confirmed that the private key from the current .env derives to 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d; and confirmed live Status RPC visibility with chain id 1660990954 and balance 0.01 ETH."
doc_version: 3
doc_updated_at: "2026-04-06T17:32:59.616Z"
doc_updated_by: "CODER"
description: "Create network-specific env files for Base/Base Sepolia/Status Sepolia, preserve current Base deployer key as the primary Status deployer, and validate that the private key from the current .env derives to 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d with usable Status RPC access. Tracking: 202604061614-XSEJDG."
sections:
  Summary: "Create local multi-network env profiles for Base mainnet, Base Sepolia, and Status Sepolia without duplicating secrets in tracked files. Validate that the existing private key from the current `.env` derives to the funded Status deployer address `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and can be used against Status RPC."
  Scope: |-
    - In scope: local `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` profiles; `env.example` updates for the new profile model; validation of the deployer key/address relationship and Status RPC reachability.
    - Out of scope: live contract deployment, key rotation, or broad code refactors beyond the env surface required for this operator workflow.
  Plan: |-
    1. Inspect current env usage and preserve compatibility with the existing Base-oriented variables.
    2. Create ignored local env profile files for Base mainnet, Base Sepolia, and Status Sepolia so operators can switch networks without editing one monolithic `.env`.
    3. Update `env.example` to document the profile pattern and the Status constants.
    4. Validate that the private key from the current `.env` derives to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and confirm Status RPC visibility for that address without exposing the secret.
    5. Run targeted verification, record findings, and leave tracked changes limited to documentation/example updates only.
  Risks: |-
    - Copying the private key into multiple env files would increase secret sprawl. Mitigation: keep the secret in the existing `.env` only and create network overlays without duplicating it.
    - Current code still reads Base-specific variable names in several places. Mitigation: keep compatibility variables in the profile files instead of trying a broad config refactor in this step.
    - A derived address match alone does not prove deployment readiness if the wallet is unfunded or RPC is broken. Mitigation: verify both derivation and live balance/chain access on Status RPC.
  Verify Steps: |-
    1. Run `test -f .env.base && test -f .env.base-sepolia && test -f .env.status-sepolia`. Expected: all three local network profiles exist.
    2. Run `rg -n "STATUS_SEPOLIA_RPC_URL|STATUS_DEPLOYER_ADDRESS|BASE_RPC_URL|BASE_SEPOLIA_RPC_URL" env.example .env.base .env.base-sepolia .env.status-sepolia`. Expected: profile files and example docs expose the intended network-specific variables.
    3. Run address derivation from the current `.env` private key without printing the key. Expected: the derived address equals `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`.
    4. Query Status RPC for chain id and address balance. Expected: chain id `1660990954` and a nonzero or at least queryable balance for the deployer address.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T17:32:59.611Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Created local multi-network env overlays for Base mainnet, Base Sepolia, and Status Sepolia; updated env.example to document the overlay model; confirmed that the private key from the current .env derives to 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d; and confirmed live Status RPC visibility with chain id 1660990954 and balance 0.01 ETH.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:32:53.723Z, excerpt_hash=sha256:6540a8dd2e410c064266e4f4e7f132143c4cc84ca211042b781d363fbb4480b4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Delete the local `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` files if the profile model proves confusing or unsafe.
    2. Revert `env.example` to the previous single-env layout if the new guidance is misleading.
    3. Re-run the derivation and RPC checks before any later deploy step if the deployer secret changes.
  Findings: |-
    Decision: use the existing deployer key as the primary Status deployer, but do not duplicate the private key across multiple network profiles.
    Key findings: local overlays `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` now exist and switch non-secret network settings cleanly on top of the existing `.env`; `env.example` documents the profile workflow and Status constants; the private key from the current `.env` derives exactly to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`; Status public RPC returns chain id `1660990954` and balance `0.01 ETH` for that address.
    Operational implication: the address is funded and reachable, so it is suitable as the primary Status deployer for the next deployment step. The remaining missing piece is only the actual contract broadcast/verification, which was intentionally not executed in this task.
id_source: "generated"
---
## Summary

Create local multi-network env profiles for Base mainnet, Base Sepolia, and Status Sepolia without duplicating secrets in tracked files. Validate that the existing private key from the current `.env` derives to the funded Status deployer address `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and can be used against Status RPC.

## Scope

- In scope: local `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` profiles; `env.example` updates for the new profile model; validation of the deployer key/address relationship and Status RPC reachability.
- Out of scope: live contract deployment, key rotation, or broad code refactors beyond the env surface required for this operator workflow.

## Plan

1. Inspect current env usage and preserve compatibility with the existing Base-oriented variables.
2. Create ignored local env profile files for Base mainnet, Base Sepolia, and Status Sepolia so operators can switch networks without editing one monolithic `.env`.
3. Update `env.example` to document the profile pattern and the Status constants.
4. Validate that the private key from the current `.env` derives to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` and confirm Status RPC visibility for that address without exposing the secret.
5. Run targeted verification, record findings, and leave tracked changes limited to documentation/example updates only.

## Risks

- Copying the private key into multiple env files would increase secret sprawl. Mitigation: keep the secret in the existing `.env` only and create network overlays without duplicating it.
- Current code still reads Base-specific variable names in several places. Mitigation: keep compatibility variables in the profile files instead of trying a broad config refactor in this step.
- A derived address match alone does not prove deployment readiness if the wallet is unfunded or RPC is broken. Mitigation: verify both derivation and live balance/chain access on Status RPC.

## Verify Steps

1. Run `test -f .env.base && test -f .env.base-sepolia && test -f .env.status-sepolia`. Expected: all three local network profiles exist.
2. Run `rg -n "STATUS_SEPOLIA_RPC_URL|STATUS_DEPLOYER_ADDRESS|BASE_RPC_URL|BASE_SEPOLIA_RPC_URL" env.example .env.base .env.base-sepolia .env.status-sepolia`. Expected: profile files and example docs expose the intended network-specific variables.
3. Run address derivation from the current `.env` private key without printing the key. Expected: the derived address equals `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`.
4. Query Status RPC for chain id and address balance. Expected: chain id `1660990954` and a nonzero or at least queryable balance for the deployer address.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T17:32:59.611Z — VERIFY — ok

By: REVIEWER

Note: Created local multi-network env overlays for Base mainnet, Base Sepolia, and Status Sepolia; updated env.example to document the overlay model; confirmed that the private key from the current .env derives to 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d; and confirmed live Status RPC visibility with chain id 1660990954 and balance 0.01 ETH.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:32:53.723Z, excerpt_hash=sha256:6540a8dd2e410c064266e4f4e7f132143c4cc84ca211042b781d363fbb4480b4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Delete the local `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` files if the profile model proves confusing or unsafe.
2. Revert `env.example` to the previous single-env layout if the new guidance is misleading.
3. Re-run the derivation and RPC checks before any later deploy step if the deployer secret changes.

## Findings

Decision: use the existing deployer key as the primary Status deployer, but do not duplicate the private key across multiple network profiles.
Key findings: local overlays `.env.base`, `.env.base-sepolia`, and `.env.status-sepolia` now exist and switch non-secret network settings cleanly on top of the existing `.env`; `env.example` documents the profile workflow and Status constants; the private key from the current `.env` derives exactly to `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`; Status public RPC returns chain id `1660990954` and balance `0.01 ETH` for that address.
Operational implication: the address is funded and reachable, so it is suitable as the primary Status deployer for the next deployment step. The remaining missing piece is only the actual contract broadcast/verification, which was intentionally not executed in this task.
