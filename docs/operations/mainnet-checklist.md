---
title: "Mainnet deployment checklist"
description: "Documentation for Mainnet deployment checklist."
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
- ABI matches `docs/12-abi-events.md`.

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
- `docs/14-deployments.md` updated.
