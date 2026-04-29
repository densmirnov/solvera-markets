# **Grant Proposal: Solvera Markets for Status Network / Executive Pitch**

## **Application type**

Status Network ecosystem grant

## **Applicant**

Solvera Markets team  
Primary contact: Eugene Pavlenko Telegram: @eugenepx  
Project Repository: [https://github.com/densmirnov/solvera-markets](https://github.com/densmirnov/solvera-markets)

# **Introduction**

The rise of decentralized finance (DeFi), non-fungible tokens (NFTs), and blockchain applications has created an ecosystem where users and automated agents can participate in value exchange and task automation. At the same time, Artificial Intelligence (AI) is increasingly used to manage decentralized assets and optimize strategies. However, coordinating tasks and value transfers across multiple blockchain networks remains difficult due to fragmentation between chains, differing infrastructure, and the challenge of reliably verifying task completion and distributing rewards.

Solvera addresses this problem through an Intent Marketplace where AI agents create intents — predefined conditions secured by smart contracts that reward participants for delivering verified outcomes. Tasks such as token swaps, liquidity provision, or cross-chain transfers become competitive markets where solvers propose execution strategies and only the verified result gets paid. This approach simplifies complex cross-chain interactions, allowing agents to focus on high-level objectives while decentralized participants compete to fulfill the underlying tasks.

**One-line summary**

Solvera Markets is the first agent-native outcome market on Status Network — a gasless marketplace where AI agents compete to fulfill on-chain tasks, get paid only for verified results.

## **Use cases and opportunities.**

**On-chain outcomes (Stage 1-2).** A user posts: "Buy me token X, budget 1020 USDC." Funds are locked in escrow. Solver agents submit competing offers with different routes and prices. The requester picks the best one. Only the winner executes and gets paid. The live Stage 1 surface is token delivery; broader state predicates and proof-of-activity flows require the evaluator modules planned for later versions.

**Disputable outcomes via optimistic attestation (later).** When results cannot be deterministically checked by the current contract, the solver can submit a deliverable hash or URI once the optimistic dispute layer exists. Escrow release then depends on the challenge window, bonds, and resolver/evaluator outcome.

**What this unlocks**

- **Competition replaces trust.** Multiple agents compete. Only the verified result gets paid. No one gets full wallet access.
- **Supported outcome templates become markets.** The intent abstraction scales only as far as the implemented evaluator and dispute paths can verify.
- **One protocol surface for supported integrations.** Status services that register as solvers can become accessible to agents through one standard interface, within the evaluator and dispute capabilities that have shipped.
- **Agents compose.** An agent can be both requester and solver, creating task chains organically.
- **Humans and agents on equal terms.** Solvera doesn't distinguish who fulfills the intent — there is only intent, offer, fulfillment, and settlement.

## **Ecosystem context**

The agent intent category is active: Olas has 7.38M+ agent-to-agent transactions, CoW Protocol handles $87B in intent-based trading volume, and Virtuals ACP serves 50K+ users. But no project has deployed a working outcome marketplace on Status.  
Arina Finance is building a lending marketplace for AI agents on Status. Solvera provides the execution and settlement layer.  
Together, they represent two distinct agent-native app categories for the ecosystem. The emergence of draft ERC-8183 (programmable escrow for agent commerce) signals that this is becoming a recognized protocol category.

## **What already works on Status**

This is not a zero-to-one feasibility request. The core system already runs on Status Sepolia today.

**Live deployment:**

- IntentMarketplace contract: [0xF79367dAB12D8E12146685dA2830f112F02De71a](https://sepoliascan.status.network/address/0xF79367dAB12D8E12146685dA2830f112F02De71a) (verified on Blockscout)
- Base mainnet deployment: 0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A
- Public app: [solvera.markets](https://solvera.markets) with Status Sepolia as the canonical live network

**Completed lifecycle on Status Sepolia:**

The team has executed a full end-to-end intent lifecycle: deploy → create intent → submit offer → select winner → fulfill → accept. This is not a constructor deploy. It is a working product flow.

## **The grant purpose (Phase 1\)**

A narrow, milestone-based Phase 1 focused on turning the already working Solvera deployment on Status Sepolia into a documented, reviewable, and reproducible pilot deployment, then adding the first reputation layer for agents on top of that live product surface.

### **Milestone 1: Current working product surface on Status Sepolia**

Target duration: 2 weeks

Deliverables:

1. A clear description of the current Solvera product scope on Status Sepolia is published for both non-technical and technical reviewers, including what already works today and what remains outside Phase 1.
2. Canonical Status Sepolia contract addresses, verification links, and deployment metadata are published in the repository and public-facing docs.
3. A reproducible deployment, verification, and operator wallet runbook for Status Sepolia is published and aligned with the project tooling.
4. The public app exposes a stable Status Sepolia review environment, including network selection and a working marketplace read path.
5. A published AGENT Skill is provided for Status so agents can create and use Status wallets and operate across the current Intent Marketplace flows.
6. An end-to-end demo path is documented for the current intent lifecycle on Status Sepolia: request creation, solver participation, resolution, and settlement.

Acceptance criteria:

1. A Status reviewer can inspect the verified contracts, deployment addresses, and public deployment metadata without relying on private handoff.
2. A third party can follow the published docs to connect a wallet, switch to Status Sepolia, and review the current live marketplace flow.
3. The published materials make clear how the protocol reduces coordination overhead by standardizing request creation, solver participation, resolution, and settlement within one repeatable Status Sepolia flow.
4. The public app exposes the Status Sepolia marketplace state through a working read path suitable for external review.
5. A reviewer can inspect the published AGENT Skill and see documented agent flows for Status wallet creation, wallet usage, and interaction with the current Intent Marketplace capabilities.
6. The proposal and repository make a clear distinction between live Phase 1 functionality and later roadmap items.

### **Milestone 2: Agent Karma and gamification layer**

Target duration: 2 weeks

Deliverables:

1. A written Karma model is defined for Solvera agents, mapping specific marketplace actions to reputation accumulation on Status Sepolia.
2. The first Karma implementation is tied to real marketplace activity so that actions in the live flow change an agent's visible progression.
3. A first gamification layer is introduced as visible agent progression that a non-technical user can understand.
4. User, operator, and agent-facing docs are updated to explain how Karma is earned, how progression is displayed, and what is already implemented in Phase 1.
5. A public demo shows the current marketplace flow together with Karma accumulation and visible progression.

Acceptance criteria:

1. The public documentation explains, in plain language, which agent actions earn Karma and why those actions matter for marketplace quality.
2. At least one concrete set of marketplace actions in the live flow updates Karma or visible progression in a way a reviewer can inspect.
3. The first gamification layer is visible in the product or demo materials and understandable without protocol-level context.
4. The docs distinguish clearly between the implemented Karma/gamification layer in Phase 1 and deeper reputation mechanics planned for later stages.
5. The Status team can review one reproducible end-to-end demo from intent creation to settlement with Karma/progression included.

## **What Status gets**

1. **A real app category.** A working agent-native marketplace running on Status, not just infrastructure without a visible product.
2. **Repeatable on-chain activity.** Each intent lifecycle creates 6-7 on-chain actions per participant. This is closer to a native Status use case than a one-transaction app.
3. **A builder's surface.** Docs, SDK patterns, wallet flows, network-specific operational knowledge, and agent integration examples that other teams can reuse.
4. **A reference implementation.** The first working example of agent task execution, on-chain competition, outcome escrow, and settlement on Status.
5. **A path to shared infrastructure.** The long-term roadmap extends from structured on-chain intents to deterministic evaluator-backed outcomes to optimistic dispute flows. This is how Solvera evolves from a marketplace into a reusable agent execution layer for Status.

## **Status ecosystem alignment**

1. **Karma and progression alignment:** Phase 1 focuses on making agent reputation and progression visible, which fits the broader Status interest in persistent agent identity and on-chain behavior.
2. **Usage before tokenization:** A native Solvera token is not part of the v0.7 plan. Token incentives require separate approval after repeated usage exists.
3. **Privacy alignment:** Solvera is already aligned with privacy-preserving agent operation; deeper integration with the Status privacy layer can follow after Phase 1\.

## **Budget: €15,500**

| Tranche | Amount  | Trigger                                                                                                        |
| :------ | :------ | :------------------------------------------------------------------------------------------------------------- |
| 1       | €10,000 | Milestone 1 accepted: current Status Sepolia product surface is documented, verified, reproducible, and publicly reviewable |
| 2       | €5,500  | Milestone 2 accepted: Karma model, first visible progression layer, updated docs, and end-to-end demo are delivered |

## **What's next (Phase 2+)**

The items below are roadmap only and are not part of the current €15,500 ask. They describe how Solvera expands from the current intent marketplace into a broader infrastructure layer for agents on Status.

### **v0.3-v0.5**

1. Add Solvera Karma as local product activity/progression derived from real Status marketplace events. This is not official Status Karma.
2. Introduce a parallel `AgenticOutcomeMarket` kernel so broader outcome verification does not overload the current Stage 1 `IntentMarketplace`.
3. Add deterministic evaluator modules for balance deltas, explicit state predicates, and proof-of-activity attestations.

### **v0.6-v0.7**

1. Add optimistic attestation and dispute flows: deliverable hash/URI, challenge window, challenger bond, resolver/evaluator result, timeout, and refund paths.
2. Package the protocol into Status-native challenge templates with a baseline solver-agent flow, reviewer dashboard, and agent-facing guide.
3. Treat v0.7 as product evidence only if external agents or builders complete challenge templates. Otherwise, position it as a Status reference implementation.

The roadmap does not include a native token, official Status Karma integration, Status mainnet deployment, cross-chain settlement, or arbitrary-outcome claims without a separate product decision.

## **Team**

**Eugene Pavlenko** — Tech entrepreneur and builder. Co-founder of AXIOMA and WhiteFlo. Background across blockchain, AI product development, and venture building. Leads product, AI integration, and Status-specific implementation. [LinkedIn](https://www.linkedin.com/in/eugene-pavlenko-b31a0430/)

**Denis Smirnov** — Blockchain consultant and protocol designer. Former Lisk and Aragon. Lecturer on DeFi and governance. Leads core protocol, token economics, and delivery architecture. [LinkedIn](https://www.linkedin.com/in/densmirnov/)

**Peter Bel** — Crypto BD and growth lead with deep ecosystem experience since 2014\. Background includes Cointelegraph-era crypto media, marketing, fundraising support, and web3 business development. Founder at Byzantium, co-founder at DAOBUILDERS. Leads ecosystem positioning and partnerships. [LinkedIn](https://www.linkedin.com/in/peterfbel/)

## **Specific ask**

1. A €15,500 milestone-based Phase 1 grant.
2. A technical point of contact for Status-specific questions on the testnet and network behavior.
3. Optional visibility support after milestone completion if the Status team considers the demo valuable.

_Full proposal with market landscape, detailed roadmap, and additional context available as a separate appendix on request._
