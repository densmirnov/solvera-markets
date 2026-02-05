---
title: "Roles and intents"
description: "Inference: in MVP offers can be stored only in events; winner selection is done off-chain by the verifier."
---

# Roles & Intents

## Roles
- **Operator**: creates an intent and deposits reward.
- **Solver**: bids to fulfill the intent and posts a bond.
- **Verifier**: validates delivery based on deterministic rules.

## Intent Shape (Simplified)
- `tokenIn`, `tokenOut`, `minAmountOut`
- `rewardToken`, `rewardAmount`
- expiry and verification parameters

## Intent Lifecycle
1. **Open**: intent created and funded.
2. **Bid**: solvers commit with a bond.
3. **Deliver**: solver delivers outcome off-protocol.
4. **Verify**: verification checks pass.
5. **Settle**: reward released, bond returned or slashed.

## Why This Matters
This lifecycle enables third-party verification: a solver gets paid **only** when delivery is provable.
