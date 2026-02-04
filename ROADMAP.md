# ROADMAP — path to published MVP (Solvera Markets)

## Key principles
- Code is covered by tests to minimize errors.
- Any code change must be reflected in documentation.
- All checks and validations must pass before release.

## Facts / inferences / hypotheses
- Facts: MVP scope, roles, state machine, economics, contract functions — see `docs/`.
- Inference: release requires independent tracks — contract, indexer, backend, frontend, CI/CD, publication, verification.
- Hypothesis: testnet-first deployment is recommended before mainnet. Unverified and depends on strategy.

## Dependencies (general rule)
- Each task has input artifacts and completion verification.
- The “Verify” block closes the task and unlocks dependents.

---

## Stage 0. Base repository setup

### 0.1 Standardize project structure
- Task: define and create directories: `contracts/`, `indexer/`, `backend/`, `frontend/`, `docs/`, `scripts/`, `tests/`.
- Dependencies: none.
- Verify: structure exists, navigation added to `docs/README.md`.

### 0.2 Documentation policy
- Task: enforce rule “any code change must update documentation.”
- Dependencies: 0.1.
- Verify: rule documented in `docs/README.md` and `CONTRIBUTING.md`.

### 0.3 Base quality tooling
- Task: choose and wire formatting, linting, and tests for all subprojects.
- Dependencies: 0.1.
- Verify: a single `make`/`task`/`npm` entrypoint exists for checks.

### 0.4 Engineering standards
- Task: enforce mandatory linters and auto-formatters across all code.
- Dependencies: 0.3.
- Verify: rules in `CONTRIBUTING.md` and `docs/20-engineering-standards.md`.

---

## Stage 1. Contracts (MVP)

### 1.1 ABI and events
- Task: define ABI and event payloads.
- Dependencies: 0.1.
- Verify: `docs/12-abi-events.md` published.

### 1.2 Contract implementation
- Task: implement `createIntent`, `submitOffer`, `selectWinner`, `fulfill`, `_accept`, `expire`.
- Dependencies: 1.1.
- Verify: contract compiles; ABI matches docs.

### 1.3 Economics and reputation
- Task: implement fee mechanics, bond, and `rep` updates.
- Dependencies: 1.2.
- Verify: unit tests cover all fee/bond branches.

### 1.4 Invariants and tests
- Task: implement scenario tests and property/invariant tests.
- Dependencies: 1.2.
- Verify: all tests pass in CI and locally.

### 1.5 Static analysis and audit readiness
- Task: static analysis (slither/solhint), audit checklist, threat doc.
- Dependencies: 1.2.
- Verify: reports stored in `docs/`.

### 1.6 Deploy to testnet
- Task: deploy contract and record address/chainId.
- Dependencies: 1.4.
- Verify: tx visible in explorer; addresses in `docs/14-deployments.md`.

### 1.7 Verify contract
- Task: verify sources in explorer.
- Dependencies: 1.6.
- Verify: contract verified.

### 1.8 Deploy to mainnet
- Task: deploy to Base mainnet (or chosen chain).
- Dependencies: 1.7, 2.4, 3.4, 4.3.
- Verify: addresses and versions recorded; verification successful.

---

## Stage 2. Indexer

### 2.1 Data model
- Task: define entities (Intent, Offer, Winner, Reputation, EventLog).
- Dependencies: 1.1.
- Verify: schema in `docs/16-indexer-model.md`.

### 2.2 Indexer implementation
- Task: parse events and build state.
- Dependencies: 2.1, 1.6.
- Verify: local run on testnet with correct aggregates.

### 2.3 Publish indexer
- Task: deploy indexer (self-hosted or managed).
- Dependencies: 2.2.
- Verify: SLA/health endpoint and monitoring.

---

## Stage 3. Backend API

### 3.1 API contract
- Task: define agent-first API for intents, offers, statuses, reputation, and config.
- Task: formalize read-first design with stateless responses and event-derived data only.
- Task: include `next_steps` in every successful response (agent guidance).
- Task: publish error model with explicit codes and messages.
- Task: include cursor pagination and discovery filters (status, token_out, reward_token).
- Dependencies: 2.1.
- Verify: `docs/17-backend-api.md`.
 - Note: API must be agent-first and include endpoints for automated agent integration.

### 3.2 Backend implementation
- Task: REST over indexer (no server-side sessions).
- Task: implement tx-builder endpoints (create intent, submit offer, select winner, fulfill, expire).
- Task: return calldata only; do not sign or submit transactions.
- Task: expose `GET /api/config` for contract address, fee params, bond params, and network.
- Dependencies: 3.1, 2.3.
- Verify: API integration tests.

### 3.3 Security and limits
- Task: rate limits for write endpoints and abuse protection.
- Task: optional auth for tx-builder endpoints (read remains public).
- Task: confirm API is not a source of truth; all state must be verifiable on-chain.
- Dependencies: 3.2.
- Verify: tests for limits and access policy.

### 3.4 Backend deploy
- Task: deploy backend, setup domains/certs.
- Dependencies: 3.3.
- Verify: prod healthcheck and monitoring.

---

## Stage 4. Frontend (minimal)

### 4.1 Minimum screens
- Task: intent list, intent detail, statuses.
- Task: landing page content aligned with site sources (no hackathon mentions).
- Task: publish `/skill`, `/docs`, `/api` static pages matching agent-first copy.
- Dependencies: 3.2.
- Verify: data matches backend output.

### 4.2 Operator tools
- Task: view events and state.
- Task: operator filters for intents/events and empty/error states.
- Dependencies: 4.1.
- Verify: correct state machine rendering.

### 4.2a Agent integration guide (SKILL.md)
- Task: create `frontend/SKILL.md` with best practices for AI agents to connect and use the market.
- Dependencies: 4.2.
- Verify: `frontend/SKILL.md` published and referenced in docs.

### 4.3 Frontend deploy
- Task: deploy (CDN/Pages) + basic analytics.
- Dependencies: 4.2.
- Verify: prod availability and stability.

---

## Stage 5. CI/CD and release

### 5.1 CI pipeline
- Task: run tests for contracts, indexer, backend, frontend.
- Dependencies: 1.4, 2.3, 3.2, 4.2.
- Verify: checks pass on every PR.

### 5.1a Dockerization and Dokploy
- Task: project must start with `docker compose up`.
- Dependencies: 0.4.
- Verify: `docker-compose.yml` builds and starts services without manual steps.

### 5.1b Dokploy pipeline
- Task: deploy via GitHub auto-build in Dokploy.
- Dependencies: 5.1a.
- Verify: Dokploy builds and runs services from the repo.

### 5.2 Release policy
- Task: versioning, changelog, tags.
- Dependencies: 5.1.
- Verify: process in `docs/16-release-process.md`.

### 5.3 Pre-release validation
- Task: repeatable checklist (contract, indexer, backend, frontend).
- Dependencies: 5.2.
- Verify: checklist completed and signed.

---

## Stage 6. Final MVP release

### 6.1 End-to-end testing
- Task: integration testing end-to-end.
- Dependencies: 1.8, 2.3, 3.4, 4.3.
- Verify: report in `docs/17-e2e-report.md`.

### 6.2 Publish MVP
- Task: announce release, publish contract addresses, API, and links.
- Dependencies: 6.1.
- Verify: `docs/14-deployments.md` and `docs/16-release-process.md` updated.

### 6.3 Monitoring and post-release
- Task: SLA metrics, errors, invariant deviations.
- Dependencies: 6.2.
- Verify: monitoring and alerts enabled.
