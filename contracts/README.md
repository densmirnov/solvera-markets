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
- Deploy: `forge script script/DeployIntentMarketplace.s.sol --rpc-url <RPC> --broadcast`
