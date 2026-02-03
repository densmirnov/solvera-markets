# Intent Marketplace — PRD v0.1 (MVP / Stage 1)

## 0. Document status
- Type: Product Requirements Document (implementation-ready)
- Version: v0.1
- Stage: 1 — On-chain Outcome Market (transfer-only)
- Basis: PRD v0 (Vision & Phased Roadmap)
- Goal: lock exact MVP scope to start development

---

## 1. MVP goal

Build an **on-chain outcome delivery market** for AI agents where:
- the initiator publishes a formalized request for an on-chain asset,
- solvers compete with offers,
- the winner is paid **only after actual delivery**,
- accountability and settlement via escrow, TTL, and reputation,
- system runs **without calldata, cross-chain, or arbitration**.

MVP must be usable by agents without manual human involvement.

---

## 2. In-scope / Out-of-scope

### 2.1 In-scope (required)
- Single-chain
- Transfer-only intents (check by token receipt)
- Reward escrow
- Competitive solver offers
- Winner selection by verifier agent
- TTL and auto-refund
- Solver reputation (+1 / -1)
- Winner bond (liveness)
- Event-based SDK API

### 2.2 Out-of-scope (forbidden in MVP)
- Cross-chain settlement
- Calldata / execution intents
- Off-chain deliverables
- On-chain arbitration
- Human UI
- Universal intents

---

## 3. Key user scenarios (agent-first)

### Scenario 1: Successful delivery
1. Initiator agent creates intent: “receive ≥ X tokens A”.
2. Solver agents submit offers.
3. Verifier agent selects winner.
4. Winner delivers tokens to the contract.
5. Contract forwards tokens to initiator.
6. Contract pays reward to solver.
7. Solver reputation increases.

### Scenario 2: Winner does not execute
1. Winner selected, but does not deliver before `ttlAccept`.
2. Any agent calls `expire`.
3. Winner gets -1 reputation and/or loses bond.
4. Intent returns to OPEN or ends.

### Scenario 3: No suitable offers
1. Intent expires by `ttlSubmit`.
2. Reward refunded to payer minus fee.

---

## 4. Intent type (MVP)

### 4.1 IntentKind
- `TRANSFER_OUTCOME`

### 4.2 Intent parameters
- `tokenOut` — ERC-20 address
- `minAmountOut` — minimum acceptable amount
- `rewardToken` — reward token
- `rewardAmount`
- `payer`
- `initiator`
- `verifier`
- `ttlSubmit`
- `ttlAccept`

---

## 5. Roles and permissions

- **Payer**: locks reward, receives refund
- **Initiator**: intent owner
- **Verifier (agent)**:
  - selects winner
  - signs ACCEPT / REJECT
- **Solver**:
  - submits offers
  - delivers result

---

## 6. State Machine (MVP)

States:
1. `OPEN` — accept offers
2. `SELECTED` — winner selected
3. `FULFILLED` — result delivered
4. `ACCEPTED` — payout executed
5. `EXPIRED` — timeout finalization

Transitions:
- OPEN → SELECTED
- SELECTED → FULFILLED
- FULFILLED → ACCEPTED
- OPEN → EXPIRED
- SELECTED → EXPIRED

---

## 7. Solver offers

### 7.1 Offer format
- `solver`
- `amountOut`
- `timestamp`

Stored on-chain or off-chain (MVP: on-chain storage is acceptable).

---

## 8. Winner selection

- Performed by verifier agent
- Fixes solver and amountOut
- Starts `ttlAccept`
- May require bond from winner

---

## 9. Fulfillment

- Called by winner
- Solver transfers `amountOut` to contract
- Contract checks `amountOut >= minAmountOut`
- Contract forwards tokens to initiator
- Contract marks FULFILLED

---

## 10. Acceptance and settlement

- For MVP acceptance can be implicit (after fulfill)
- Contract:
  - pays reward to solver
  - increases solver reputation (+1)

---

## 11. Timeouts and slashing

- `ttlSubmit`:
  - if expired and no winner → EXPIRED + refund
- `ttlAccept`:
  - if expired and no fulfill → EXPIRED + penalty for solver

Penalty:
- -1 reputation
- optional bond loss

---

## 12. Reputation (MVP)

- Stored on-chain as counter
- +1 on ACCEPTED
- -1 on winner timeout

---

## 13. MVP economics

- Reward escrow
- Platform fee (fixed %)
- Winner bond (small, refundable on success)

---

## 14. MVP success metrics

- Number of created intents
- % of intents fulfilled successfully
- Avg time to fulfill
- Number of active solver agents

---

## 15. Non-functional requirements

- Minimal gas footprint
- Simple storage model
- Deterministic behavior
- Agent SDK compatibility

---

## 16. MVP risks

1. Low solver liquidity
2. Offer spam
3. Winner sabotage

Mitigated via TTL, bond, reputation.

---

## 17. Readiness for next stage

PRD v0.1 is complete if:
- MVP reliably serves transfer-only intents
- API is used by agents without manual control
- Architecture allows calldata and acceptance receipts without core refactor
