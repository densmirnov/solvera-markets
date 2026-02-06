---
title: "Test plan and invariants"
description: "4. No `selectWinner/fulfill/expire` calls from final states. 5. `rep` changes only in `_accept` (+1) and `expire` branch B (‑1)."
---

# Testing & Invariants

## Invariants That Matter
- Escrow funds never leave without successful verification.
- Bonds are slashed only on failed delivery or invalid bids.
- Intent state cannot skip phases.

## Demo-Grade Checks
- Create intent -> confirm escrow.
- Bid -> confirm bond lock.
- Verify -> confirm settlement.

These checks align directly with verification criteria for correctness and trust.
