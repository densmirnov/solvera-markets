---
title: "Status v0.7 Roadmap"
description: "Status-first product direction, release sequence, non-goals, and critical risks through v0.7."
sidebarTitle: "Status v0.7"
---

# Status v0.7 Roadmap

## Product category

Solvera is fixed on Status as a Status-native outcome verification layer for agents.

The active product is not a horizontal marketplace for arbitrary AI tasks. The target shape is narrower: escrowed outcomes, deterministic evaluator modules, attestations, local agent activity, and dispute-ready settlement on Status.

## Fixed decisions

- Status is the canonical chain target through v0.7.
- Base deployments remain legacy/reference surfaces.
- The current Stage 1 contract remains the transfer-outcome reference surface.
- A parallel v0.4+ kernel should carry the broader evaluator and dispute roadmap.
- Solvera Karma means local product activity/progression unless an official Status integration is separately approved.
- No native token is part of the v0.7 plan.

## Current facts

- The repository records a working Status Sepolia deployment and public app surface.
- The current `IntentMarketplace` supports transfer-outcome settlement, not arbitrary outcomes.
- `fulfill()` immediately accepts the result in the current contract, so Stage 1 has no dispute window.
- Contract reputation is local and minimal: accepted winners increment, selected winners that time out decrement.

## Release sequence

### v0.2 - Status Position Freeze

Publish the Status-first thesis, live-vs-planned boundary, and re-approval triggers. The purpose is to prevent the roadmap from drifting back into a generic agent marketplace claim.

### v0.3 - Status Activity / Solvera Karma

Turn marketplace events into visible agent activity and local progression. A reviewer should be able to see how a concrete Status action changes an agent profile.

### v0.4 - ERC-8183-oriented Compatibility Kernel

Introduce a parallel `AgenticOutcomeMarket` kernel with explicit roles, outcome states, evaluator hooks, and transfer-outcome compatibility. Keep the existing `IntentMarketplace` as the Stage 1 reference surface.

### v0.5 - Deterministic Evaluator Modules

Add evaluator modules for balance deltas, explicit state predicates, and proof-of-activity attestations. Do not claim arbitrary log/event verification from inside contracts.

### v0.6 - Optimistic Attestation and Dispute

Add deliverable submission, challenge windows, challenger bonds, resolver/evaluator outcomes, and visible dispute state.

### v0.7 - Status Challenge Product

Package the protocol into Status-native challenge templates with a baseline solver-agent flow, reviewer dashboard, agent-facing guide, and release evidence from external participants or an explicit reference-implementation decision.

## Non-goals through v0.7

- Generic marketplace for arbitrary AI work.
- Native token launch.
- Status mainnet deployment without a separate product decision.
- Official Status Karma integration without explicit approval.
- Cross-chain settlement.
- Custodial execution or server-side transaction signing.
- Claims of arbitrary outcome verification before the relevant evaluator and dispute path ships.

## Critical risk

The weakest link is demand validation, not smart contract implementation. v0.7 is only a product proof if external agents or builders complete challenge templates on Status. Without that, the correct positioning is a Status reference implementation rather than product-market fit.

The operational task graph lives in the repository root `ROADMAP.md`.
