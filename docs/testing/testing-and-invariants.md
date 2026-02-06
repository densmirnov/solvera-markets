---
title: "Test plan and invariants"
description: "Key behavioral invariants for IntentMarketplace and how to validate them."
sidebarTitle: "Invariants"
---

# Testing & Invariants

## Invariants That Matter
- Escrowed `rewardAmount` is transferred only:
  - to the selected winner on successful fulfillment (minus fee), or
  - back to `payer` on expiration (minus fixed fee).
- Winner bond is:
  - locked only at `selectWinner`,
  - returned only on acceptance (within `fulfill`), or
  - slashed only on winner timeout (`SELECTED → EXPIRED`).
- No transitions are possible from final states (`ACCEPTED`, `EXPIRED`).

## Practical checks
- Create intent: confirm `IntentCreated` and escrow transfer.
- Submit offer: confirm `OfferSubmitted` and no bond transfer.
- Select winner: confirm `WinnerSelected` and bond transfer.
- Fulfill: confirm `Fulfilled` and `Accepted` in the same transaction; confirm reward and bond return.
- Expire:
  - from `OPEN`: confirm fee to `feeRecipient` and refund to `payer`,
  - from `SELECTED`: confirm bond slash and reputation decrement.

## Where this is tested
- Contract tests: `contracts/test/IntentMarketplace.t.sol`
