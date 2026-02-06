---
title: "Roles and intents"
description: "Core actors and the MVP intent lifecycle (from creation to settlement)."
sidebarTitle: "Roles & intents"
---

# Roles & Intents

## Roles
- **Operator**: creates an intent and deposits reward.
- **Solver**: submits offers and, if selected, fulfills the intent (posts a bond on selection).
- **Verifier**: selects the winner during the offer window.

## Intent Shape (Simplified)
- `tokenOut`, `minAmountOut`
- `rewardToken`, `rewardAmount`
- `payer`, `initiator`, `verifier`
- `ttlSubmit`, `ttlAccept`

## Intent Lifecycle
1. **Open**: intent created and funded.
2. **Offer**: solvers submit offers (offers are emitted as events in MVP).
3. **Selected**: verifier selects a solver; the solver bond is locked.
4. **Fulfill**: selected solver transfers `tokenOut` to the initiator before `ttlAccept`.
5. **Accept / Settle**: settlement happens inside the `fulfill` transaction (reward paid, fee collected, bond returned).
6. **Expire**: if no winner is selected by `ttlSubmit`, or winner does not fulfill by `ttlAccept`.

## Why This Matters
This lifecycle enables third-party verification: a solver gets paid **only** when delivery is provable.

## Related
- [State machine](/concepts/state-machine)
- [Contract spec](/reference/contracts/contract-spec)
