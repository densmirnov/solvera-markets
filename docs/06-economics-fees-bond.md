# Economics, fees, and bond

## Fees
- `feeBpsOnAccept`: charged from `rewardAmount` on success.
- `fixedFeeOnExpire`: charged on `EXPIRED` (anti-spam).

Edge:
- if `rewardAmount < fixedFeeOnExpire`, charge `rewardAmount`.

## Winner bond
- Locked only for the winner at `selectWinner`.
- Amount:
  - `bondAmount = max(bondMin, rewardAmount * bondBpsOfReward / 10_000)`.
- In MVP bond is paid in `rewardToken`.

## Return and slash
- On `ACCEPTED`: bond returned to winner.
- On winner timeout (`SELECTED → EXPIRED`): bond slashed to `feeRecipient`.
