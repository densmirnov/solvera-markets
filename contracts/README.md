# Contracts

## Purpose
This folder contains the Solidity implementation of the Solvera Markets protocol and its tests. The core contract is `IntentMarketplace` and enforces the MVP state machine, economic rules, and reputation updates.

## Structure
- `src/` — Solidity sources (`IntentMarketplace.sol`).
- `test/` — Foundry tests for scenario and invariant coverage.
- `script/` — deployment scripts (Foundry).
- `foundry.toml` — Foundry configuration.

## Key flows
- Intent creation, solver offers, winner selection, fulfillment, acceptance, and expiry are implemented on-chain.
- All critical transitions emit events for the indexer and SDKs.

## Entry points
- Build/test: `forge test`
- Deploy to Status Sepolia: `forge script ./script/DeployIntentMarketplace.s.sol --rpc-url status_sepolia --broadcast`
- Deployer key resolution order: `DEPLOYER_PRIVATE_KEY` -> `STATUS_DEPLOYER_PRIVATE_KEY` -> `BASE_DEPLOYER_PRIVATE_KEY`
- Foundry note: on the local `forge 1.5.0` used in this repo, `script/DeployIntentMarketplace.s.sol:DeployIntentMarketplace` can fail with a false `No contract bytecode`; `./script/DeployIntentMarketplace.s.sol` is the working form.
- Status note: `foundry.toml` pins `evm_version = "paris"` so the deploy bytecode stays compatible with Status Sepolia. The default `prague` target produced creation bytecode with `PUSH0` and repeatedly failed on-chain.
