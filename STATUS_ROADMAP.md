# Status Execution Roadmap

## Objective

Turn the existing Status planning work into an execution sequence that results in a demonstrable, end-to-end Solvera deployment on Status Sepolia.

## Completed prerequisites

- `202604061644-W01S34` Workflow artifacts normalized for the current `agentplane` runtime.
- `202604061644-8Q1433` Self-hosted Graph Node viability on Status Sepolia proven.
- `202604061729-3R3K82` Local multi-network env overlays added and the funded Status deployer `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` validated.

## Execution principles

1. Keep Base history intact. Status execution must not overwrite historical Base deployment records.
2. Keep secrets out of tracked files. Only non-secret examples and task artifacts are committed.
3. Preserve sequence discipline. Later steps must not start before their input artifacts exist.
4. Treat smoke completion as the real finish line, not contract deployment alone.

## Atomic task sequence

### 1. Create Status execution roadmap

- Task ID: `202604061735-5SVEY0`
- Owner: `DOCS`
- Depends on: none
- Goal: make the execution graph explicit in-repo and align downstream work on one canonical sequence.
- Done when: this file exists, references downstream task IDs, and the sequence is unambiguous.

### 2. Make Foundry deploy path Status-aware

- Task ID: `202604061735-2CPW0M`
- Owner: `CODER`
- Depends on: `202604061735-5SVEY0`
- Goal: remove Base-only assumptions from the Foundry deploy path so the repository can broadcast to Status Sepolia.
- Scope:
  - `contracts/foundry.toml`
  - `contracts/script/DeployIntentMarketplace.s.sol`
  - related contract docs if required by the touched deploy surface
- Done when:
  - Status RPC alias exists in Foundry config,
  - deploy script resolves a generic or Status-aware deployer key,
  - local dry-run commands are documented and pass basic validation.

### 3. Deploy `IntentMarketplace` to Status Sepolia

- Task ID: `202604061735-NPQ61C`
- Owner: `CODER`
- Depends on: `202604061735-2CPW0M`
- Goal: perform the first real Status Sepolia deployment with the funded deployer.
- Scope:
  - broadcast from the validated deployer address,
  - capture contract address, tx hash, block number, constructor values, and git commit
- Done when:
  - deployment is visible on `https://sepoliascan.status.network`,
  - deployment metadata is preserved for later indexer/backend/frontend rewiring.

### 4. Prepare real Status indexer manifest

- Task ID: `202604061735-RF7VW9`
- Owner: `CODER`
- Depends on: `202604061735-NPQ61C`
- Goal: convert the Status spike into a real Solvera indexing path.
- Scope:
  - `indexer/subgraph.status-spike.yaml`
  - `indexer/docker-compose.graph-node.yml`
  - supporting indexer docs if required
- Done when:
  - manifest points to the real Status deployment address,
  - exact `startBlock` is set,
  - Graph Node syncs against real Solvera events rather than an empty placeholder deployment.

### 5. Switch backend defaults to Status-ready config

- Task ID: `202604061735-3JCAD3`
- Owner: `CODER`
- Depends on: `202604061735-RF7VW9`
- Goal: make backend config and tests reflect the Status chain and real Status indexer.
- Scope:
  - backend config surfaces
  - backend tests and fixtures
  - shared env-facing documentation if directly touched
- Done when:
  - `GET /api/config` can return Status values,
  - tests stop relying on Base-only defaults in touched paths.

### 6. Switch frontend chain surfaces to Status

- Task ID: `202604061735-WDW5JH`
- Owner: `CODER`
- Depends on: `202604061735-3JCAD3`
- Goal: make frontend explorer links, chain labels, and token handling Status-correct.
- Scope:
  - explorer link builders
  - network labels and copy
  - token-formatting assumptions that are currently Base-shaped
- Done when:
  - frontend no longer silently implies Base in touched user-facing flows,
  - live Status resources can be opened from the UI.

### 7. Make `base-wallet` chain-aware for Status

- Task ID: `202604061735-2BWTA0`
- Owner: `CODER`
- Depends on: `202604061735-2CPW0M`
- Goal: allow operator tooling to sign and broadcast on Status without breaking temporary Base compatibility.
- Scope:
  - `base-wallet/src/lib/*`
  - `base-wallet/src/cli.js`
  - wallet docs and skill references if directly affected
- Done when:
  - wallet tooling can resolve Status RPC and explorer surfaces,
  - signing/broadcast paths are no longer hard-wired to Base internals.

### 8. Run Status end-to-end smoke

- Task ID: `202604061735-XM276Y`
- Owner: `TESTER`
- Depends on:
  - `202604061735-NPQ61C`
  - `202604061735-RF7VW9`
  - `202604061735-3JCAD3`
  - `202604061735-WDW5JH`
  - `202604061735-2BWTA0`
- Goal: prove one real Solvera lifecycle on Status Sepolia.
- Scope:
  - onchain interaction
  - indexer visibility
  - backend visibility
  - frontend visibility
  - wallet-tooling execution path
- Done when:
  - at least one real intent lifecycle is observable across all layers.

### 9. Publish Status operator docs and deployment records

- Task ID: `202604061735-GH834T`
- Owner: `DOCS`
- Depends on: `202604061735-XM276Y`
- Goal: make Status a first-class documented target after the real smoke succeeds.
- Scope:
  - deployment records
  - operator runbooks
  - root and docs-site references that still imply Base-first operation
- Done when:
  - a new operator can follow the docs and reproduce the Status deployment surface without reading Base-only instructions.

## Immediate execution target

Current active next step: `202604061735-2CPW0M` — make the Foundry deploy path Status-aware.

Why this is first:

- It unlocks the first real Status deployment.
- The indexer cannot be finalized before a real contract address and block number exist.
- Backend, frontend, smoke, and final docs all depend on the contract being live first.
