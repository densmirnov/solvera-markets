---
title: "ABI and events (MVP)"
description: "Public functions and emitted events for the IntentMarketplace contract."
sidebarTitle: "ABI & events"
---

# ABI and events (MVP)

## Functions
- `createIntent(tokenOut, minAmountOut, rewardToken, rewardAmount, payer, initiator, verifier, ttlSubmit, ttlAccept) -> bytes32 id`
- `submitOffer(bytes32 id, uint256 amountOut)`
- `selectWinner(bytes32 id, address solver, uint256 amountOut)`
- `fulfill(bytes32 id)`
- `expire(bytes32 id)`
- `getIntent(bytes32 id) -> Intent`

## Events and payloads

In the MVP, offers are *not* stored on-chain; the canonical offer history is the `OfferSubmitted` event stream.

### IntentCreated
- `id: bytes32`
- `payer: address` (indexed)
- `initiator: address` (indexed)
- `verifier: address`
- `tokenOut: address`
- `minAmountOut: uint256`
- `rewardToken: address`
- `rewardAmount: uint256`
- `ttlSubmit: uint64`
- `ttlAccept: uint64`

### OfferSubmitted
- `id: bytes32`
- `solver: address` (indexed)
- `amountOut: uint256`
- `timestamp: uint256` (block timestamp)

### WinnerSelected
- `id: bytes32`
- `solver: address` (indexed)
- `amountOut: uint256`
- `bondAmount: uint256`

### Fulfilled
- `id: bytes32`
- `solver: address` (indexed)
- `amountOut: uint256`

### Accepted
- `id: bytes32`
- `solver: address` (indexed)
- `rewardAmount: uint256`
- `feeAmount: uint256`
- `bondAmount: uint256`

### Expired
- `id: bytes32`
- `fromState: uint8` (`OPEN=0` | `SELECTED=1`)
- `feeAmount: uint256`
- `refundAmount: uint256`

### ReputationUpdated
- `solver: address` (indexed)
- `newValue: int256`
- `reason: uint8` (`ACCEPTED=0` | `WINNER_TIMEOUT=1`)

## Related
- [Contract spec](/reference/contracts/contract-spec)
- [Event stream guide](/guides/event-stream)
