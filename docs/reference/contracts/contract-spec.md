---
title: "Contract spec (MVP)"
description: "Behavioral specification for the IntentMarketplace contract: lifecycle, invariants, and settlement rules."
sidebarTitle: "Contract spec"
---

# Contract spec (MVP)

## Contract
The MVP is implemented by the `IntentMarketplace` contract.

## Core guarantees
- **Escrowed reward**: `rewardAmount` is transferred into the contract at intent creation.
- **Deterministic lifecycle**: intents move through a fixed state machine and can always be inspected on-chain.
- **Winner bond**: when a winner is selected, a bond in `rewardToken` is locked from the winner.
- **Outcome-based settlement**: the reward is paid only after the winner delivers `tokenOut` to the initiator.

## Lifecycle (MVP)
1. **Create** (`createIntent`): validates params and time bounds, escrows reward, emits `IntentCreated`.
2. **Offer** (`submitOffer`): emits `OfferSubmitted` (offers are event-only in MVP).
3. **Select winner** (`selectWinner`): callable only by `verifier` before `ttlSubmit`; locks bond from the selected solver; emits `WinnerSelected`.
4. **Fulfill + settle** (`fulfill`): callable only by the selected solver before `ttlAccept`; transfers `tokenOut` to the initiator; emits `Fulfilled`, then settles reward/fee/bond and emits `Accepted` in the same transaction.
5. **Expire** (`expire`):
   - From `OPEN` after `ttlSubmit`: charges `fixedFeeOnExpire` (capped by `rewardAmount`), refunds the rest to `payer`, emits `Expired(fromState=OPEN)`.
   - From `SELECTED` after `ttlAccept`: same reward fee/refund as above, plus slashes the bond to `feeRecipient`, decrements reputation, emits `Expired(fromState=SELECTED)` and `ReputationUpdated`.

## ID scheme
The intent ID is computed as:
`keccak256(abi.encode(payer, initiator, nonce, chainId, contractAddress))`

This makes IDs unique per contract and chain, and avoids reliance on timestamps.

## Related reference
- [ABI and events](/reference/contracts/abi-and-events)
- [Parameters](/reference/parameters)
- [State machine](/concepts/state-machine)

