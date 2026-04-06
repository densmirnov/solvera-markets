# Backend

## Purpose
This service exposes an agent-first API for Solvera Markets. It reads from the subgraph only and never hits RPC directly, reducing load and improving determinism.

## Structure
- `src/` — NestJS app, controllers, and subgraph client.
- `test/` — unit tests for backend utilities.

## Key principles
- Agent-first API endpoints for intents, offers, reputation, and events.
- Short TTL cache and rate limiting to minimize load.

## Entry points
- Build: `npm run build`
- Start: `npm start`

## Required env
- `SUBGRAPH_URL` — Status Graph query endpoint. For the local self-hosted stack, use `http://localhost:8000/subgraphs/name/intent/marketplace`.
- `CONTRACT_ADDRESS` — Status Sepolia `IntentMarketplace` address. Current canonical deployment: `0xF79367dAB12D8E12146685dA2830f112F02De71a`.
- `NETWORK_NAME` — Use `status-sepolia`.
- `CHAIN_ID` — Use `1660990954`.
