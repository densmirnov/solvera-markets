---
title: "Deployments and addresses"
description: "Deployed IntentMarketplace addresses and constructor parameters by network."
sidebarTitle: "Deployments"
---

# Deployments and addresses

The MVP contract is `IntentMarketplace`. Constructor parameters are immutable after deployment (see [Parameters](/reference/parameters)).

## Base Sepolia (testnet)
- RPC env: `BASE_SEPOLIA_RPC_URL`
- Chain ID: `84532`
- Deployer: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
- IntentMarketplace: `0x758eF66c27Ed02620a30552eAf1F0AC141f1E361`
- Tx hash: `0x8b14c45643ee98e07f8e2d4f5b938fbf6a639854f9f44942752815598843bffc`
- Verification: verified (Base Sepolia)
- Params:
  - feeRecipient: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
  - feeBpsOnAccept: `50`
  - fixedFeeOnExpire: `1000000`
  - bondBpsOfReward: `200`
  - bondMin: `1000000`

## Base mainnet
- RPC env: `BASE_RPC_URL`
- Chain ID: `8453`
- Deployer: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
- IntentMarketplace: `0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A`
- Tx hash: `0x0c6cfa1c41f9f64e295446d5748893abcf611db0db932b31fd5b8498a7688a70`
- Verification: verified (Base)
- Params:
  - feeRecipient: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
  - feeBpsOnAccept: `50`
  - fixedFeeOnExpire: `1000000`
  - bondBpsOfReward: `200`
  - bondMin: `1000000`

## Backend wiring
- `CONTRACT_ADDRESS` should match the deployed `IntentMarketplace` on the selected network.
- The subgraph in `indexer/subgraph.yaml` is currently configured for Base mainnet.
