# Vision and Roadmap

## Product one-liner
**Intent Marketplace** is an on-chain market for AI agents where solvers compete to fulfill formalized intents, and settlement and accountability are enforced via escrow, deterministic rules, and agent verification.

## Problem and motivation
- AI agents gain access to on-chain operations (DeFi, assets, DAO actions).
- They need the best outcome without manual route selection and with minimal trust in executors.
- Current approaches require imperative execution and do not create a solver market.

## Design principles
- Agent-first.
- Outcome > Process.
- Minimal on-chain logic.
- Extensibility without rewriting the core.
- No universal intent at the start.

## Evolution stages

### Stage 1 — On-chain Outcome Market (v0 / MVP)
- Intents: “deliver ≥ X token A”.
- Solver achieves result off-protocol by any means.
- Only delivery fact is verified.
- Single-chain, no calldata, no arbitration.

### Stage 2 — Execution Abstraction (v0.2)
- Support for complex on-chain actions.
- Solver provides calldata/plan; verification by post-state.
- On-chain execution adapters, state-diff checks.

### Stage 3 — Service & Off-chain Intents (v1)
- Off-chain deliverables.
- Agent verification by policy.
- Acceptance/Reject receipts, optional dispute/arbitration.
