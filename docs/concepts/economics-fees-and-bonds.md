---
title: "Economics, fees, and bond"
description: "Fee model, winner bond, and reputation updates in the MVP contract."
sidebarTitle: "Economics"
---

# Economics, fees, and bond

## Fees
- `feeBpsOnAccept`: charged from `rewardAmount` on success.
- `fixedFeeOnExpire`: charged on `EXPIRED` (anti-spam).

### Expire fee edge case
If `rewardAmount < fixedFeeOnExpire`, the contract charges `rewardAmount` (refund becomes `0`).

## Winner bond
- Locked only for the winner at `selectWinner`.
- Amount:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`.
- In MVP bond is paid in `rewardToken`.

## Return and slash
- On `ACCEPTED`: bond returned to winner.
- On winner timeout (`SELECTED → EXPIRED`): bond slashed to `feeRecipient`.

## Reputation
- On `ACCEPTED`: winner reputation increments by `+1`.
- On winner timeout: winner reputation decrements by `-1`.
