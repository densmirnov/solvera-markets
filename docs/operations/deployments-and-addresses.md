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

## Status Sepolia (canonical live testnet)
- RPC env: `STATUS_SEPOLIA_RPC_URL`
- Chain ID: `1660990954`
- Deployer: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
- IntentMarketplace: `0xF79367dAB12D8E12146685dA2830f112F02De71a`
- Tx hash: `0xc1583d667d4792f0c19389361961309fd26c540fb339eef63e3df8749740f5ed`
- Deploy block: `18800150`
- Verification: verified on StatusScan
- Explorer: `https://sepoliascan.status.network/address/0xF79367dAB12D8E12146685dA2830f112F02De71a`
- Params:
  - feeRecipient: `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`
  - feeBpsOnAccept: `50`
  - fixedFeeOnExpire: `1000000`
  - bondBpsOfReward: `500`
  - bondMin: `1000000`
- Smoke assets:
  - reward token `SRWD`: `0xc793472fDFcBcd6FFC66867201427c02ebc17D49`
  - output token `SOUT`: `0x0fbcDC77D0c28a0809716bcaB1adb4cbcE705e4C`
- Proven end-to-end lifecycle:
  - intent id: `0x17a2ce8fc15c805ff7828be8ad9b2d8de4029cfe26605c6b848e17a128c3bfb0`
  - create tx: `0xf2821597930f48d83e5537a6d7437fb97bd32de940a404696ee7974bd32c5067`
  - offer tx: `0x64a5c1ed67fad0d4cf173ce31d0707ddbcc63ad0800ac0b857f40ef826ad5b67`
  - select winner tx: `0xea729b975f79e0f6ae4b5aa7e4c58002462e16f941bdf645a2f38a1c9a736c07`
  - fulfill + accept tx: `0x7ff814c030dda1d0ead58ef29b58232ed07fea2ed133a09b0d10301509cb5f35`

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
- Status Sepolia uses the canonical manifest `indexer/subgraph.status.yaml`.
- The Status query endpoint used for local smoke verification was `http://localhost:8000/subgraphs/name/intent/marketplace`.
