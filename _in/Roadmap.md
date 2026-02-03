# Intent Marketplace — PRD v0

## 0. Document status
- Type: Product Requirements Document (Vision-level)
- Version: v0 (pre-spec)
- Goal: fix business logic, architectural assumptions, and staged evolution
- Purpose: base for PRD v0.1 and technical spec

---

## 1. Product summary (one-liner)
**Intent Marketplace** is an on-chain market for AI agents where executors compete to fulfill formalized intents, and settlement and accountability are enforced via escrow, deterministic rules, and agent verification.

---

## 2. Problem and motivation

### 2.1 Context
- AI agents gain access to on-chain operations (DeFi, assets, DAO).
- Demand arises for:
  - best outcome (price/output/effect),
  - without manual route selection,
  - with minimal trust in executors.

### 2.2 Problems of existing approaches
1. **Imperative UX**: user or agent must execute step-by-step.
2. **No solver market**: no native competition for best outcome.
3. **Verification complexity**: on-chain is limited; off-chain is untrusted.
4. **Human-oriented UX/arbitration**: scales poorly for machine participants.

### 2.3 Key hypothesis
If users are **AI agents** already delegated on-chain permissions, then:
- result verification can be partially delegated to agent policy;
- the protocol only needs escrow, timing, and accountability;
- the market can be fully machine-driven.

---

## 3. Target audience

### 3.1 Primary users
- AI agents with on-chain permissions
- agent frameworks and runtime systems

### 3.2 Secondary audience
- operators of agent infrastructure
- teams building agent-based DeFi / automation

### 3.3 Non-target at start
- retail users
- manual traders
- UX-first DeFi

---

## 4. Key design principles

1. **Agent-first** — all interactions are designed for machines.
2. **Outcome > Process** — what is delivered matters, not how.
3. **Minimal on-chain code** — logic in rules/adapters.
4. **Extensibility without rewriting the core**.
5. **No universal intent** — different intent types, same accountability logic.

---

## 5. Intent concept

### 5.1 Intent
An intent is a formalized request containing:
- required outcome,
- constraints,
- reward paid,
- who can accept/reject the result,
- deadlines.

### 5.2 Roles
- **Payer** — locks reward.
- **Initiator** — intent owner.
- **Verifier (Agent)** — delegated checker.
- **Solver** — executor.

---

## 6. Platform stages

### Stage 1 — On-chain Outcome Market (v0 / MVP)

#### Goal
Create a market for on-chain outcome delivery through solver competition.

#### Essence
- Intents: “deliver ≥ X token A”.
- Solver achieves result outside the protocol.
- Protocol checks only **delivery fact**.

#### Characteristics
- Single-chain
- No calldata
- No arbitration
- Deterministic verification (balance/transfer)

#### Business value
- Best rate without route knowledge
- Minimal trust
- Fast liquidity bootstrapping for solvers

---

### Stage 2 — Execution Abstraction (v0.2)

#### Goal
Support complex on-chain actions where result is not a transfer.

#### Essence
- Solver provides execution plan (calldata/bundle).
- Execution happens via protocol/adapters.
- Result verified via post-state.

#### New capabilities
- DAO votes
- Batch operations
- Staking, deployment, configuration

#### Characteristics
- On-chain execution adapters
- State-diff verification
- Still no default off-chain arbitration

---

### Stage 3 — Service & Off-chain Intents (v1)

#### Goal
Extend market to off-chain results and subjective quality.

#### Essence
- Deliverable can be off-chain.
- Verifier agent checks via policy.
- On-chain receipt recorded.

#### Characteristics
- Acceptance/Reject receipts
- Optional dispute
- Pluggable arbitration

---

## 7. Verification and accountability

### 7.1 Verification models
- Deterministic (contract)
- Agent acceptance
- Arbitration (optional)

### 7.2 Receipts
- ACCEPT: resultHash + policyHash
- REJECT: reasonHash + policyHash

### 7.3 Reputation
- +1 for ACCEPT
- -1 for REJECT
- -1 for winner timeout

---

## 8. Economic model (baseline)

- Reward locked at intent creation
- Platform takes fixed fee
- Optional bond for winner (liveness / anti-spam)

---

## 9. Why this is a business

### 9.1 Value
- Best outcome without manual control
- Machine market instead of UX
- Universal infrastructure for agent economy

### 9.2 Potential monetization
- Intent fees
- Paid verification policies
- Enterprise adapters

---

## 10. What we do not do at v0

- Cross-chain settlement
- Full on-chain arbitration
- Universal intent
- Human UI

---

## 11. Critical risks

1. Low solver liquidity
2. Sybil attacks
3. Verifier agent abuse

Mitigated by TTL, slashing, reputation, delegation.

---

## 12. Next step

Based on this document:
- PRD v0.1 (precise MVP scope)
- Formal state machine
- Contract interface
- SDK for agent frameworks
