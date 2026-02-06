---
title: "Mainnet deployment checklist"
description: "Preflight checklist for deploying and verifying the MVP contract on Base mainnet."
sidebarTitle: "Mainnet checklist"
---

# Mainnet deployment checklist

## Configuration
- Final parameters set: `feeRecipient`, `feeBpsOnAccept`, `fixedFeeOnExpire`, `bondBpsOfReward`, `bondMin`.
- Base mainnet RPC verified.
- `BASE_DEPLOYER_PRIVATE_KEY` provided.
- `ETHERSCAN_API_KEY` available for verification.

## Contract
- Contract compiles without warnings.
- Bytecode matches testnet version (if applicable).
- ABI matches [ABI and events](/reference/contracts/abi-and-events).

## Tests and analysis
- `forge test` successful.
- Static analysis executed (solhint/slither).
- All MVP scenarios covered.

## Operational checks
- `feeRecipient` confirmed.
- Deployer balance sufficient for gas.
- Post-deploy validation plan ready.

## Publication
- Deploy via `DeployIntentMarketplace`.
- Contract verified in explorer.
- [Deployments and addresses](/operations/deployments-and-addresses) updated.
