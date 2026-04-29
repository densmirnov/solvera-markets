# ROADMAP - Status-first path to v0.7

## Current decision

Solvera is fixed on Status as the primary product track.

Base remains a legacy/reference deployment surface. The next releases should not try to win a horizontal "agent marketplace" category or a generic per-task escrow market. The product direction is narrower:

> Status-native outcome verification for agents: escrow, evaluator modules, attestations, local reputation/activity, and dispute-ready settlement.

## Evidence boundary

This roadmap separates confirmed project facts from product inferences and demand hypotheses.

- Facts: the repository records a working Status Sepolia deployment, Status-oriented frontend/backend/indexer surfaces, and a Stage 1 `IntentMarketplace` contract for transfer-outcome settlement.
- Facts: the current contract settles `fulfill()` by immediately calling `_accept()`, so there is no dispute window, submitted deliverable, or independent evaluator layer in the current protocol.
- Facts: current contract reputation is a local integer signal: accepted winners get `+1`, selected winners that time out get `-1`.
- Inference: the next credible wedge is not a generic agent task marketplace. It is a Status-specific verification layer with visible activity and progressively stronger evaluator/dispute semantics.
- Hypothesis: Status builders, grant reviewers, testnet operators, and agent developers are the first useful audience. This remains unproven until external participants complete real flows.

## Product rules

- Status is the canonical chain target through v0.7.
- Do not introduce a native Solvera token before repeated usage exists.
- Do not claim "any outcome" support before evaluator and dispute paths exist.
- Do not confuse Solvera Karma with official Status Karma. Solvera Karma is local product activity/progression unless an official integration is explicitly approved later.
- Preserve the existing `IntentMarketplace` as the Stage 1 reference surface while building the v0.4+ kernel in parallel.
- Every version must produce a reviewable Status artifact: deployed contract, indexed data, API response, UI state, guide, or recorded lifecycle.

## Dependency rule

Each task below is atomic and dependent on the previous task in the same epic unless a task explicitly says otherwise. An epic is complete only when its final verification task passes and the release evidence is recorded.

---

## Epic 0 - Current baseline

Status: already present in the repository and used as the starting point.

### 0.1 Confirm Status deployment record
- Task: keep the Status Sepolia `IntentMarketplace` address, explorer link, app URL, and API URL visible in operations docs.
- Dependency: none.
- Verify: a reviewer can find the Status Sepolia contract and public app from docs without private handoff.

### 0.2 Confirm current protocol limitation
- Task: keep Stage 1 documented as transfer-outcome settlement with immediate acceptance on fulfillment.
- Dependency: 0.1.
- Verify: contract docs and overview docs do not imply dispute windows, arbitrary outcomes, or independent evaluator settlement in Stage 1.

### 0.3 Confirm legacy network boundary
- Task: keep Base documented as legacy/reference, not the primary roadmap target.
- Dependency: 0.2.
- Verify: Status is described as canonical for the active roadmap.

---

## Epic 1 - v0.2 Status Position Freeze

Goal: make the product thesis reviewable before building more protocol surface.

### 1.1 Rewrite the product thesis
- Task: define Solvera as a Status-native outcome verification layer for agents, not a generic AI task marketplace.
- Dependency: Epic 0.
- Verify: docs state the category, target audience, and non-goals in one place.

### 1.2 Align public documentation entrypoints
- Task: link the Status v0.7 roadmap from the docs home and Mintlify navigation.
- Dependency: 1.1.
- Verify: docs navigation includes the Status roadmap page and the home page links to it.

### 1.3 Publish the v0.2 boundary list
- Task: document what is live now, what is planned, and what must not be claimed yet.
- Dependency: 1.2.
- Verify: current facts, inferences, and hypotheses are separated.

### 1.4 Record re-approval triggers
- Task: document changes that require explicit product re-approval: native token, Status mainnet, official Status Karma integration, custody, cross-chain execution, or generic arbitrary-outcome claims.
- Dependency: 1.3.
- Verify: roadmap readers can see which decisions are frozen and which require a new decision.

### 1.5 Verify v0.2 docs release
- Task: run docs-only validation and record evidence.
- Dependency: 1.4.
- Verify: routing policy check, `agentplane doctor`, and docs JSON parse check pass.

---

## Epic 2 - v0.3 Status Activity / Solvera Karma

Goal: turn the current Status marketplace into visible agent activity and local progression.

### 2.1 Define the Solvera Karma model
- Task: map concrete marketplace actions to local progression points: intent created, offer submitted, winner selected, fulfillment accepted, timeout, and repeated successful completion.
- Dependency: Epic 1.
- Verify: the model documents event source, score delta, anti-gaming notes, and display label for each action.

### 2.2 Extend the indexer data model
- Task: add indexed activity entities and aggregate agent counters derived from marketplace events.
- Dependency: 2.1.
- Verify: local indexer run shows activity rows and per-agent aggregates for a completed Status lifecycle.

### 2.3 Expose activity through the backend
- Task: add read endpoints for agent profile, activity feed, and score summary.
- Dependency: 2.2.
- Verify: API tests or smoke calls return deterministic data from indexed events only.

### 2.4 Add frontend profile/progression views
- Task: show agent activity, local Solvera Karma, completed flows, and negative timeout signals in the product surface.
- Dependency: 2.3.
- Verify: a non-technical reviewer can see why an agent gained or lost progression.

### 2.5 Document the reviewer demo path
- Task: add a short Status demo runbook covering wallet, network, marketplace action, and resulting profile change.
- Dependency: 2.4.
- Verify: a reviewer can reproduce one visible score/profile update.

### 2.6 Verify v0.3 release evidence
- Task: run one real or recorded Status Sepolia lifecycle and capture before/after profile evidence.
- Dependency: 2.5.
- Verify: release notes include event ids, indexed profile output, UI/API screenshots or responses, and known limitations.

---

## Epic 3 - v0.4 ERC-8183-oriented Compatibility Kernel

Goal: introduce a parallel outcome kernel that can evolve beyond the Stage 1 transfer contract without breaking the current deployment.

### 3.1 Write the architecture decision record
- Task: decide between adapting `IntentMarketplace` and adding a parallel `AgenticOutcomeMarket`.
- Dependency: Epic 2.
- Verify: ADR explains why the kernel is parallel, how Stage 1 remains supported, and what compatibility surface is targeted.

### 3.2 Define the kernel state machine
- Task: specify roles, ids, events, and states: `Open`, `Funded`, `Submitted`, `Completed`, `Rejected`, and `Expired`.
- Dependency: 3.1.
- Verify: docs include transition table, allowed callers, value movements, and failure paths.

### 3.3 Define the evaluator interface
- Task: specify the minimal evaluator contract/API for deterministic checks and future optimistic dispute hooks.
- Dependency: 3.2.
- Verify: interface docs state inputs, outputs, revert behavior, and trust assumptions.

### 3.4 Implement `AgenticOutcomeMarket`
- Task: add the parallel contract with escrow, assignment, submission, evaluator call, completion, rejection, and expiry.
- Dependency: 3.3.
- Verify: unit tests cover all state transitions and fund movements.

### 3.5 Implement transfer-outcome compatibility
- Task: add the first evaluator/hook that reproduces the Stage 1 token delivery outcome under the new kernel.
- Dependency: 3.4.
- Verify: one transfer-outcome lifecycle passes through the new kernel and produces equivalent settlement semantics.

### 3.6 Wire indexer/API/UI read support
- Task: index the new kernel events and expose read-only support in the API and UI.
- Dependency: 3.5.
- Verify: a Status reviewer can inspect both legacy Stage 1 intents and new kernel outcomes without confusing the two.

### 3.7 Verify v0.4 Status deployment
- Task: deploy the kernel to Status Sepolia and record addresses, explorer links, and smoke evidence.
- Dependency: 3.6.
- Verify: deployment docs, contract verification, indexed events, API output, and UI read path are all present.

---

## Epic 4 - v0.5 Deterministic Evaluator Modules

Goal: make outcome verification modular while staying inside what contracts and indexed data can actually prove.

### 4.1 Define evaluator registry and safety limits
- Task: document evaluator registration, versioning, caller permissions, and allowed proof inputs.
- Dependency: Epic 3.
- Verify: docs explicitly reject unsupported claims such as reading arbitrary historical logs from within a contract.

### 4.2 Implement `BalanceDeltaEvaluator`
- Task: verify token balance delta conditions over the supported execution window.
- Dependency: 4.1.
- Verify: tests cover success, insufficient delta, wrong token, wrong account, and replay attempts.

### 4.3 Implement `StatePredicateEvaluator`
- Task: verify simple on-chain state predicates through explicit target contracts and calldata.
- Dependency: 4.2.
- Verify: tests cover predicate success, predicate failure, target revert, and malformed predicate config.

### 4.4 Implement `ProofOfActivityEvaluator`
- Task: verify indexed marketplace activity through an approved attestation or proof input, not by pretending contracts can read historical logs directly.
- Dependency: 4.3.
- Verify: tests or integration checks show accepted proof, rejected proof, stale proof, and wrong-subject proof.

### 4.5 Extend evidence display
- Task: show evaluator type, proof summary, status, and failure reason in API/UI.
- Dependency: 4.4.
- Verify: each evaluator lifecycle is inspectable by a reviewer without contract-level debugging.

### 4.6 Verify v0.5 evaluator release
- Task: run one Status lifecycle for each deterministic evaluator.
- Dependency: 4.5.
- Verify: release evidence includes transaction links, indexed events, API responses, and user-visible outcome state.

---

## Epic 5 - v0.6 Optimistic Attestation and Dispute

Goal: support deliverables that require a challenge window while keeping settlement rules explicit.

### 5.1 Write the dispute protocol spec
- Task: define submission, deliverable hash/URI, challenge window, challenger bond, resolver role, evaluator role, and timeout behavior.
- Dependency: Epic 4.
- Verify: spec covers no-dispute completion, valid rejection, resolver completion, resolver rejection, and timeout/refund.

### 5.2 Implement deliverable submission
- Task: add deliverable metadata and submitted state transitions to the kernel.
- Dependency: 5.1.
- Verify: tests prove submitted deliverables are immutable or versioned by explicit rules.

### 5.3 Implement challenge bonds and windows
- Task: allow disputes only inside the challenge window and require challenger stake.
- Dependency: 5.2.
- Verify: tests cover early challenge, late challenge, missing bond, invalid challenger, and accepted challenge.

### 5.4 Implement resolver/evaluator outcomes
- Task: route challenged outcomes to an approved resolver or evaluator and settle funds according to the result.
- Dependency: 5.3.
- Verify: tests cover provider wins, challenger wins, resolver timeout, and fund accounting.

### 5.5 Extend indexer/API/UI dispute surfaces
- Task: show submitted deliverables, challenge status, deadlines, bonds, and resolver decisions.
- Dependency: 5.4.
- Verify: reviewers can inspect every dispute path from the product surface.

### 5.6 Verify v0.6 dispute release
- Task: run and record three Status scenarios: no dispute auto-complete, valid rejection, and timeout/refund.
- Dependency: 5.5.
- Verify: release evidence includes transactions, indexed states, API output, UI proof, and known trust assumptions.

---

## Epic 6 - v0.7 Status Challenge Product

Goal: turn the protocol stack into a reviewable Status challenge product that external builders or agents can complete.

### 6.1 Define challenge templates
- Task: publish a small set of Status-native challenge templates with evaluator type, reward, evidence requirement, and review flow.
- Dependency: Epic 5.
- Verify: each template maps to implemented evaluator/dispute capability, not aspirational behavior.

### 6.2 Implement baseline solver-agent flow
- Task: provide a minimal agent or agent guide that can discover a challenge, submit/complete it, and report evidence.
- Dependency: 6.1.
- Verify: the baseline agent completes at least one template on Status Sepolia.

### 6.3 Add reviewer dashboard
- Task: show challenge list, participants, completion status, evaluator result, dispute status, and local Solvera Karma.
- Dependency: 6.2.
- Verify: a Status reviewer can audit challenge progress without private scripts.

### 6.4 Publish agent-facing guide and skill
- Task: update the agent guide/skill with wallet setup, Status network config, challenge discovery, transaction building, and evidence submission.
- Dependency: 6.3.
- Verify: a new agent operator can follow the guide without repository maintainer help.

### 6.5 Run external participant pilot
- Task: invite at least three external agents/builders or explicitly record why the release remains a reference implementation only.
- Dependency: 6.4.
- Verify: pilot evidence includes participant addresses, completed or failed attempts, friction notes, and fixes required before v1.0.

### 6.6 Publish v0.7 release evidence
- Task: produce the final v0.7 release record with deployed addresses, templates, participant evidence, evaluator/dispute coverage, and remaining gaps.
- Dependency: 6.5.
- Verify: v0.7 can be reviewed as a Status challenge product, not just as protocol infrastructure.

---

## v0.7 exit criteria

- External agents/builders can complete at least one Status challenge template, or the release explicitly declares itself a reference implementation because external participation failed.
- Evaluator and dispute paths are observable through contracts, indexer, API, and UI.
- Documentation does not claim support for arbitrary outcomes beyond implemented evaluator/dispute paths.
- Solvera Karma is visible as local product activity and is not presented as official Status Karma.
- Base remains preserved as legacy/reference and does not drive the active roadmap.

## Re-approval triggers

Stop and request a new product decision before adding any of the following:

- Native Solvera token or token incentives.
- Status mainnet deployment.
- Official Status Karma integration or claims of official Status reputation.
- Custodial execution, private-key handling, or server-side transaction signing.
- Cross-chain settlement.
- Generic calldata execution.
- Claims that any off-chain or arbitrary outcome is supported before the relevant evaluator/dispute path exists.
