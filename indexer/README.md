# Indexer

## Purpose
This folder hosts the The Graph subgraph for Solvera Markets. It converts on-chain events into a queryable data model so the backend and agents do not read RPC directly.

## Structure
- `subgraph.yaml` — subgraph manifest (data sources and handlers).
- `subgraph.status.yaml` — canonical Status Sepolia manifest for the live deployment.
- `schema.graphql` — entity definitions.
- `src/mappings.ts` — event handlers.
- `abis/` — contract ABI JSON.

## Key principles
- No RPC reads. All fields are derived deterministically from events.
- `startBlock` is set to the deployment block to minimize load.
- Base and Status use separate manifest files so one chain's deploy flow cannot silently overwrite the other.

## Entry points
- Codegen: `graph codegen`
- Build: `graph build`
- Build for Status: `npm run build:status`
- Deploy: `graph deploy solvera --version-label v0.0.1`
