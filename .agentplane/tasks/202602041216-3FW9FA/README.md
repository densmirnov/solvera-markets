---
id: "202602041216-3FW9FA"
title: "Base wallet for agents"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["code"]
verify: ["1"]
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: inspect Wallet integration, design Base optional wallet feature, update SKILL, remove Wallet." }
doc_version: 2
doc_updated_at: "2026-02-04T13:31:52.140Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement optional Base wallet support for agents with generation flow; integrate dependencies; update docs; remove Wallet folder after replacement."
id_source: "generated"
---
## Summary

Implemented optional Base wallet helper (base-wallet) with local key storage, tx broadcasting, balance checks, and contract calls; updated SKILL documentation; removed legacy wallet folder from repo.

Implemented optional Base wallet helper (base-wallet) and a tx runner script for signing/broadcasting API calldata; updated SKILL documentation; removed legacy wallet folder from repo.

Implemented optional Base wallet helper and tx runner, updated SKILL docs, refreshed landing and skill pages to mention wallet support and provide direct SKILL.md link.

## Scope

Added base-wallet package (CLI + docs), created root SKILL.md and updated frontend/SKILL.md with wallet guidance, removed wallet directory from the repo.

Added base-wallet package (CLI + docs), added scripts/agent-tx.mjs for calldata signing/broadcast, created root SKILL.md and updated frontend/public docs, removed wallet directory from the repo.

Added base-wallet package and scripts/agent-tx.mjs; updated SKILL documentation, landing page, skill page, and frontend README; removed legacy wallet directory earlier.

## Risks

Default public RPC endpoints may degrade or rate-limit; operators should override via BASE_RPC_URL(S). Wallet file security depends on host filesystem protections.

## Verify Steps

1. cd base-wallet\n2. npm install\n3. node src/cli.js help

1. cd base-wallet\n2. npm install\n3. node src/cli.js help\n4. node ../scripts/agent-tx.mjs --help

## Rollback Plan

Remove base-wallet directory and SKILL.md updates; restore previous wallet folder if needed from version control; revert to prior commit via agentplane guard commit.
