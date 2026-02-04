---
id: "202602031655-HH504H"
title: "Stage 1.6 testnet deploy"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["code"]
verify: ["make check"]
commit: { hash: "065af65a86d6fa70278fb69783dcbdc06880cd66", message: "✨ HH504H deploy to Base Sepolia and record addresses" }
comments:
  - { author: "CODER", body: "Start: Deploy MVP contract to Base testnet and record addresses for Stage 1.6." }
  - { author: "CODER", body: "Blocked: BASE_RPC_URL resolves to chain id 8453 (Base mainnet), but Stage 1.6 requires testnet deployment. Need testnet RPC or explicit instruction to deploy to mainnet." }
  - { author: "CODER", body: "Start: Resume Stage 1.6 with Base Sepolia RPC now available in .env." }
  - { author: "CODER", body: "Verified: Deployed IntentMarketplace to Base Sepolia; address and tx hash recorded in docs/14-deployments.md." }
doc_version: 2
doc_updated_at: "2026-02-03T17:13:25.017Z"
doc_updated_by: "CODER"
description: "Deploy contract to Base testnet using .env credentials and record addresses."
id_source: "generated"
---
## Summary

Deploy MVP contract to Base testnet using .env credentials and record addresses.

## Scope

Add deploy script/config, execute testnet deployment, and record addresses in docs/13-deployments.md.

## Risks

Risk of incorrect network or key usage. Mitigation: read .env, confirm network, and record tx hashes.

## Verify Steps

1. Deployed contract exists on Base testnet. 2. Address + tx hash recorded. 3. Basic read call succeeds.

## Rollback Plan

Re-deploy with corrected params and update docs; no on-chain rollback possible.
