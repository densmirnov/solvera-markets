---
title: "Backend API (MVP)"
description: "List of intents."
---

# Backend API (Summary)

A thin API over the subgraph for fast, deterministic reads.

## Core Endpoints
- Base URL: https://solvera.markets/api
- `GET /api/intents` — list intents.
- `GET /api/intents/:id` — intent details.
- `GET /api/health` — service health.

## Why It Matters
This makes the demo fast, repeatable, and verifiable without hidden logic.
