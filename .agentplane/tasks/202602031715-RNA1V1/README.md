---
id: "202602031715-RNA1V1"
title: "Stage 1.9 mainnet deploy"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["code"]
verify: ["make check"]
commit: { hash: "4c01a647036994b1da6acd1410b783b4d533dea1", message: "✨ RNA1V1 deploy to Base mainnet and record addresses" }
comments:
  - { author: "CODER", body: "Start: Deploy IntentMarketplace to Base mainnet and record addresses." }
  - { author: "CODER", body: "Verified: Deployed IntentMarketplace to Base mainnet; address and tx hash recorded in docs/14-deployments.md." }
doc_version: 2
doc_updated_at: "2026-02-03T17:18:59.854Z"
doc_updated_by: "CODER"
description: "Deploy MVP contract to Base mainnet using .env credentials and record addresses."
id_source: "generated"
---
## Summary

Deploy MVP contract to Base mainnet and record addresses.

## Scope

Run deploy script against BASE_RPC_URL and update docs/14-deployments.md with mainnet details.

## Risks

Risk of irreversible mainnet deployment with wrong parameters. Mitigation: confirm config and reuse tested constructor args.

## Verify Steps

1. Contract deployed on Base mainnet. 2. Address and tx hash recorded in docs/14-deployments.md.

## Rollback Plan

No on-chain rollback; deploy a new version and update docs if needed.
