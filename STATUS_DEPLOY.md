# Status Network Testnet Deployment Roadmap for Solvera Markets

## Objective

Adapt Solvera Markets from its current Base-oriented setup to a Status Network testnet deployment path without changing contract semantics. The immediate deliverable is a repository-specific execution plan, not a live deploy.

## Verified facts

- Status Network builder surface is currently the testnet.
- Official Status Network testnet constants:
  - RPC: `https://public.sepolia.rpc.status.network`
  - Chain ID: `1660990954`
  - Explorer: `https://sepoliascan.status.network`
  - Bridge: `https://bridge.status.network`
- Public RPC limits are low: `10 req/s` and `100,000 req/day` per IP.
- Status contract verification is done on the Status explorer / Blockscout surface, not through Etherscan assumptions.
- Status transaction-fee UX must use `linea_estimateGas` with `from`; standard `eth_*` fee methods are not the correct user-facing source.
- Status docs are internally inconsistent about whether testnet ETH is optional. The safer deployment assumption is: keep a funded deployer wallet.
- The Graph supported-networks page lists Base and many other chains, but not Status Network. The same page explicitly says unsupported chains require running your own Graph Node for EVM indexing.

## Inferences

- There is no separate builder-facing "Status account registration" flow in the official docs for normal contract deployment. Operationally, use a fresh EOA wallet, add the Status network, and only use `hub.status.network` sign-in if a specific faucet flow requires it.
- Contracts and backend logic are mostly chain-agnostic. The highest migration pressure is in configuration, explorer links, wallet tooling, indexing, public docs, and Base-specific naming.
- The indexer is the most likely architectural blocker because the current repo assumes The Graph hosted/studio deployment on a supported chain.

## Hypotheses that must remain explicit

- Status Network may be indexable through self-hosted Graph Node without major subgraph schema changes. This is plausible, not yet proven in this repo.
- Gasless support may reduce runtime costs for user actions, but should not be treated as a deploy-time guarantee for contract broadcast and verification flows.
- The current frontend can run on Status without wallet-layer rewrite if it remains read-first and delegates signing to external wallets or local tooling.

## Repository impact map

| Surface | Current state | Status impact | Blocker level |
| --- | --- | --- | --- |
| `contracts/` | Foundry project, generic contract logic, Base-specific deploy env var | Low code change, medium deploy-script change | Medium |
| `indexer/` | `network: base`, The Graph deploy script | Likely needs self-hosted Graph strategy or alternate indexing | High |
| `backend/` | Mostly generic, config-driven `NETWORK_NAME` / `CHAIN_ID` | Low code change, medium config/test/docs change | Medium |
| `frontend/` | Base explorer URLs, Base USDC special-case, Base wallet references in docs | Medium UI/config/docs change | Medium |
| `base-wallet/` | Hardcoded Base RPCs, Base explorer, Base env var names, Base file names | High rename / abstraction pressure | High |
| `docs/` and root docs | Base deployment records and instructions | Medium documentation rewrite | Medium |

## Critical path

1. Preserve current Base deployment data as historical state.
2. Create a Status-specific configuration layer without breaking local development.
3. Adapt Foundry deployment and verification flow.
4. Resolve indexing strategy for Status.
5. Rewire backend and frontend to new chain constants.
6. Rework wallet tooling and any fee-estimation UX for Status rules.
7. Run end-to-end validation on Status testnet.

## Atomic roadmap

### 0. Freeze the current Base state before any Status work

Files:
- `README.md`
- `docs/operations/deployments-and-addresses.md`
- `docs/index.md`
- `indexer/subgraph.yaml`
- `env.example`

Action:
- Treat current Base mainnet / Base Sepolia addresses as historical deployments.
- Do not overwrite Base references in place until Status addresses exist.
- Decide whether Solvera will remain dual-chain in docs or switch its primary documented chain to Status.

Output:
- A clear decision: dual-chain docs or Status-first docs with archived Base references.

Exit criteria:
- Base addresses remain recoverable and no Status plan step depends on deleting historical deployment evidence.

### 1. Establish the Status operator wallet model

Files:
- `base-wallet/README.md`
- `base-wallet/SKILL.md`
- `SKILL.md`

Action:
- Create a fresh EOA for Status deployment and operations.
- Add Status Network Testnet to the wallet using the official constants.
- Record the hidden premise explicitly: for deployment there is no separate Status-native account registration requirement beyond wallet/network setup.
- Keep `hub.status.network` sign-in only as an optional STT-faucet path, not as a universal prerequisite.

Output:
- One dedicated Status deployer wallet address and a documented operator flow.

Exit criteria:
- The plan distinguishes between wallet setup, optional hub sign-in, and actual chain deployment.

### 2. Fund the Status operator wallet using the safe path

Files:
- `STATUS_DEPLOY.md`
- future deployment runbook notes

Action:
- First try the official Status faucet: `https://faucet.status.network`.
- Keep the documented faucet caveat visible: some docs snapshots require the destination address to hold at least `0.01 ETH` on mainnet.
- Prepare a fallback path:
  - obtain Sepolia ETH,
  - bridge via `https://bridge.status.network`,
  - track both Sepolia and Status explorer transactions.
- If Solvera needs Status-native test assets later, use the STT faucet through `hub.status.network`.

Output:
- A deterministic funding order: faucet first, bridge second, STT only if required.

Exit criteria:
- The deployer wallet has enough Status testnet ETH for contract deploy, verify retries, and smoke transactions.

### 3. Introduce a chain-profile abstraction before renaming anything

Files:
- `env.example`
- `docker-compose.yml`
- `backend/test/api.test.ts`
- `scripts/agent-tx.mjs`

Action:
- Replace Base-only env naming with chain-neutral or dual-compatible naming.
- Recommended target variables:
  - `RPC_URL`
  - `CHAIN_ID`
  - `NETWORK_NAME`
  - `DEPLOYER_PRIVATE_KEY`
  - `EXPLORER_BASE_URL`
  - `SUBGRAPH_URL`
- Keep backward compatibility temporarily:
  - accept existing `BASE_*` env vars,
  - prefer new generic vars,
  - remove legacy names only after all consumers are migrated.

Output:
- One shared configuration surface that can point to Base or Status without code forks.

Exit criteria:
- Backend, scripts, and wallet tooling can read Status config without hardcoded Base names.

### 4. Adapt Foundry deployment to Status Network testnet

Files:
- `contracts/foundry.toml`
- `contracts/script/DeployIntentMarketplace.s.sol`
- `contracts/README.md`

Action:
- Add Status RPC alias to `foundry.toml`, for example:
  - `[rpc_endpoints]`
  - `status_testnet = "https://public.sepolia.rpc.status.network"`
- Change the deploy script to read a generic or Status-specific deployer key instead of `BASE_DEPLOYER_PRIVATE_KEY`.
- Keep the contract constructor unchanged unless Status product logic requires Karma-aware gating later.
- Record compiler version, optimizer settings, and constructor args during deploy for later Blockscout verification.

Output:
- A Foundry deployment path that is native to this repository and targets Status testnet.

Exit criteria:
- `forge script script/DeployIntentMarketplace.s.sol:DeployIntentMarketplace --rpc-url https://public.sepolia.rpc.status.network --broadcast` is the canonical deploy command.

### 5. Deploy `IntentMarketplace` to Status testnet

Files:
- deployment artifacts to be recorded after execution
- `docs/operations/deployments-and-addresses.md`

Action:
- Broadcast the Foundry deployment with the funded Status deployer wallet.
- Capture:
  - deployer address,
  - contract address,
  - transaction hash,
  - block number,
  - constructor parameters,
  - git commit used for the deploy.
- Preserve the current Base deployment records instead of overwriting them.

Output:
- First Status testnet `IntentMarketplace` deployment.

Exit criteria:
- Contract exists on `sepoliascan.status.network` and constructor parameters match expected values.

### 6. Verify the contract on Status explorer

Files:
- `docs/operations/mainnet-checklist.md`
- `docs/operations/deployments-and-addresses.md`

Action:
- Use the Status explorer verification entrypoint:
  - `https://sepoliascan.status.network/contract-verification`
- Do not rely on Etherscan-specific assumptions or Base scan tooling.
- If automation is desired later, validate whether Foundry can target this Blockscout surface directly; until then, keep manual verification as the safe path.

Output:
- Verified contract source on Status explorer.

Exit criteria:
- Source code is visible on the explorer and the verified artifact is linked in deployment docs.

### 7. Resolve the indexing strategy before touching backend consumers

Files:
- `indexer/subgraph.yaml`
- `indexer/package.json`
- `indexer/README.md`
- `docs/operations/indexer-and-backend.md`

Action:
- Treat The Graph support as the highest-risk dependency.
- Because Status does not appear on the official supported-networks list, choose one of these paths explicitly:
  - Path A: confirm supported Studio deployment exists for Status now.
  - Path B: run your own Graph Node against Status RPC.
  - Path C: replace the subgraph with a repo-native event indexer.
- Do not assume the current `deploy:base` script can be repointed trivially.
- If using Graph Node:
  - determine the correct network identifier,
  - verify Graph Node version support for Status / EVM chain config,
  - provision RPC and IPFS endpoints,
  - update `subgraph.yaml` network/address/startBlock.

Output:
- One explicit indexing architecture decision for Status.

Exit criteria:
- There is a credible path to query `Intent`, `Offer`, `Reputation`, and `EventLog` on Status without unsupported-network ambiguity.

### 8. Rewire backend configuration and tests

Files:
- `backend/src/intents.controller.ts`
- `backend/test/api.test.ts`
- `env.example`
- `backend/README.md`

Action:
- Move backend config to Status values:
  - `NETWORK_NAME=status`
  - `CHAIN_ID=1660990954`
  - `CONTRACT_ADDRESS=<Status deployment>`
  - `SUBGRAPH_URL=<Status indexer endpoint>`
- Update tests that hardcode Base values.
- Keep backend logic generic: it already mostly emits config and calldata, so the main work is configuration, fixtures, and docs.

Output:
- Backend API reporting Status chain metadata and Status deployment address.

Exit criteria:
- `GET /api/config` returns Status values and tests no longer assert Base-specific chain metadata.

### 9. Rewire frontend chain references and token assumptions

Files:
- `frontend/src/lib/format.ts`
- any future chain config module
- `frontend/README.md`
- `frontend/SKILL.md`
- `frontend/public/base-wallet-skill.md`
- `frontend/public/SKILL.md`
- `frontend/SOLVERA_SKILL/SKILL.md`
- `frontend/SOLVERA_SKILL/README.md`

Action:
- Replace `https://basescan.org` with a chain-config-driven explorer base URL.
- Remove or generalize the hardcoded Base USDC assumption:
  - current logic special-cases one Base mainnet token address,
  - Status may not expose the same canonical reward token surface.
- Audit all public-facing skill and wallet docs that still tell agents to use a Base wallet.

Output:
- Frontend links and token formatting that work on Status without silently mislabeling assets.

Exit criteria:
- Explorer links point to Status explorer and no UI copy implies Base-only execution.

### 10. Refactor `base-wallet` into chain-aware tooling

Files:
- `base-wallet/package.json`
- `base-wallet/src/lib/config.js`
- `base-wallet/src/lib/env.js`
- `base-wallet/src/lib/rpc.js`
- `base-wallet/src/cli.js`
- `base-wallet/README.md`
- `base-wallet/SKILL.md`
- `scripts/agent-tx.mjs`
- root `SKILL.md`

Action:
- This component is currently the most Base-opinionated part of the repo.
- Decide between two paths:
  - conservative: keep folder name `base-wallet` temporarily, but make internals chain-agnostic,
  - cleaner: rename to a neutral wallet tool after Status validation.
- Minimum required refactor:
  - replace `BASE_CHAIN` with configurable chain metadata,
  - replace Base RPC defaults with Status RPC defaults plus fallback support,
  - replace `BASE_PRIVATE_KEY`, `BASE_RPC_URL`, `BASE_RPC_URLS`, `BASE_WALLET_PATH` with generic aliases and temporary compatibility fallbacks,
  - replace `~/.solvera-base-wallet.json` with a neutral default path.

Output:
- Wallet CLI that can sign and broadcast on Status without Base naming leakage.

Exit criteria:
- The wallet tool can display balances, send ETH, and broadcast contract calls against Status RPC and explorer surfaces.

### 11. Add Status-specific gasless and Karma integration where it matters

Files:
- wallet tooling or future frontend signer layer
- any future fee-estimation utilities

Action:
- Keep scope discipline:
  - backend currently returns calldata only,
  - frontend currently appears read-first,
  - the immediate deploy blocker is not gasless UX.
- Still plan the Status-specific integration now:
  - add raw `linea_estimateGas` support,
  - always include `from`,
  - compute `maxFeePerGas = baseFeePerGas + priorityFeePerGas`,
  - never use `eth_gasPrice` / `eth_maxPriorityFeePerGas` / `eth_feeHistory` as the user-facing fee source.
- If Solvera later wants gating or reputation surfaces on Status:
  - read `Karma.balanceOf(account)`,
  - resolve tier via `KarmaTiers.getTierIdByKarmaBalance(balance)` and `getTierById(tierId)`.

Output:
- A Status-native plan for transaction UX and reputation-aware features.

Exit criteria:
- Fee-estimation logic is explicitly separated from normal EVM defaults in the roadmap and future implementation plan.

### 12. Rewrite deployment and ops documentation for dual reality

Files:
- `README.md`
- `docs/index.md`
- `docs/operations/deployments-and-addresses.md`
- `docs/operations/mainnet-checklist.md`
- `docs/reference/indexer/data-model.md`
- `docs/overview/*`
- `PITCH.md`

Action:
- Replace Status-blind deployment instructions with explicit chain tables.
- Decide whether Base remains legacy/historical or a maintained secondary target.
- Update every address, explorer link, chain ID reference, and wallet recommendation.
- Document the indexing caveat prominently; do not bury it.

Output:
- Docs that match the actual chain strategy instead of the old Base-first story.

Exit criteria:
- A new operator can deploy or inspect Solvera on Status without reading Base-specific instructions by mistake.

### 13. Run end-to-end Status validation

Files:
- deployment checklist artifacts
- backend and frontend smoke-test notes

Action:
- Validate the full flow in this order:
  1. wallet connected to Status testnet,
  2. deployer funded,
  3. contract deployed,
  4. contract verified,
  5. indexer synced,
  6. backend returns Status config and live data,
  7. frontend opens live intents and explorer links correctly,
  8. local wallet / tx runner can submit at least one write transaction,
  9. rate limits are acceptable for current test traffic.

Output:
- One complete Status smoke test with recorded evidence.

Exit criteria:
- Solvera can be demonstrated end to end on Status testnet without hidden Base dependencies.

### 14. Define rollback and contingency paths before execution

Files:
- deployment notes
- future runbook

Action:
- Keep rollback options explicit:
  - if indexing on Status is blocked, keep contract deployment but pause frontend/backend cutover,
  - if wallet tooling refactor expands too much, use temporary compatibility env aliases,
  - if public RPC rate limits hurt tests, move to fallback RPC or private RPC planning,
  - if Status verification automation is flaky, use manual Blockscout verification and store exact compiler metadata.

Output:
- A go/no-go framework instead of a one-way migration.

Exit criteria:
- Every high-risk step has a fallback that does not destroy the existing Base deployment history.

## Highest-risk gaps

1. **Indexer support**
   The current repo assumes The Graph on a supported chain. Status support is not established from the official supported-networks page. This is the primary blocker.

2. **Wallet tooling**
   `base-wallet` hardcodes Base RPCs, explorer URLs, env var names, and file names. This is the densest migration surface.

3. **Token assumptions**
   The frontend special-cases a Base USDC address. That assumption is invalid on a new chain unless proven.

4. **Gasless ambiguity**
   Status promotes gasless UX, but official deploy tutorials still assume a funded test wallet. Deployment planning should follow the funded-wallet path.

## Minimum implementation order if execution starts next

1. Generic config layer
2. Foundry deploy refactor
3. Status testnet deploy
4. Status explorer verification
5. Indexer architecture decision
6. Backend rewiring
7. Frontend explorer/token rewiring
8. Wallet tooling refactor
9. Docs cutover
10. End-to-end validation

## Source set used for this roadmap

Official Status docs:
- Network details: `https://docs.status.network/overview/general-info/network-details`
- Add network: `https://docs.status.network/general-info/add-status-network`
- RPC and limits: `https://docs.status.network/tools/rpc`
- Testnet faucets: `https://docs.status.network/tools/testnet-faucets`
- Block explorer: `https://docs.status.network/tools/block-explorers/`
- Testnet contracts: `https://docs.status.network/general-info/contract-addresses/testnet-contracts`
- Quick start: `https://docs.status.network/introduction/quick-start`
- Hardhat tutorial: `https://docs.status.network/tutorials/deploying-contracts/using-hardhat`
- Foundry tutorial: `https://docs.status.network/tutorials/deploying-contracts/using-foundry`
- Scaffold-ETH 2 tutorial: `https://docs.status.network/tutorials/deploying-contracts/using-se2`
- Gasless integration: `https://docs.status.network/ja/build-for-karma/guides/gasless-integration`
- Reputation integration: `https://docs.status.network/ja/build-for-karma/guides/reputation-integration`
- Private RPC tutorial: `https://docs.status.network/tutorials/running-an-rpc`

Official The Graph docs:
- Supported networks: `https://thegraph.com/docs/en/supported-networks/`

Local repository references:
- `skills/status-network-web3/`
- `contracts/`
- `backend/`
- `frontend/`
- `indexer/`
- `base-wallet/`
- `env.example`
