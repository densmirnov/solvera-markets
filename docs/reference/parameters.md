---
title: "Parameters and config"
description: "Economic parameters for the IntentMarketplace contract and related backend configuration."
sidebarTitle: "Parameters"
---

# Parameters and config

## On-chain parameters (IntentMarketplace)
These are set at deployment time and are **immutable** in the MVP contract:
- `feeRecipient`: recipient of protocol fees (and slashed bonds).
- `feeBpsOnAccept`: success fee charged from `rewardAmount` (basis points).
- `fixedFeeOnExpire`: fixed fee charged on expiration (capped by `rewardAmount`).
- `bondBpsOfReward`: bond as a percentage of `rewardAmount` (basis points).
- `bondMin`: minimum bond amount (in `rewardToken` units).

## Derived values
- Winner bond amount:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`

## Backend config (read-only)
The backend exposes some config via `GET /api/config`, sourced from environment variables. This is convenient for UI/agents, but it is not a substitute for reading immutable values from the deployed contract.
