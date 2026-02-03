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
- `SUBGRAPH_URL` — The Graph endpoint.
