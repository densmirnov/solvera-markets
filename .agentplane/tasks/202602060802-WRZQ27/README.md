---
id: "202602060802-WRZQ27"
title: "Harden base-wallet storage + skill docs"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify:
  - "manual:read"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "35bd2c6d22c5bed23e51adeb79668e089fbc43cd"
  message: "🛠 WRZQ27 harden wallet storage + agent artifacts"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: Updated base-wallet storage defaults and skill docs, added public AI artifacts; no automated tests run."
events: []
doc_version: 2
doc_updated_at: "2026-02-06T08:07:28.203Z"
doc_updated_by: "ORCHESTRATOR"
description: "Store base-wallet private key under ~/. and minimize persisted files; update SKILL.md formatting and references."
id_source: "generated"
---
## Summary

Moved wallet pack defaults to ~/.solvera-wallet-pack, minimized stored pack files, added base-wallet skill frontmatter, and wired public base-wallet skill doc for agents.

## Scope

base-wallet storage defaults, wallet pack behavior, SKILL.md references, and public AI artifacts updated.

## Risks

Requires site redeploy for public artifacts; agents relying on old wallet-pack path must update BASE_WALLET_PATH.

## Verify Steps

1) Confirm base-wallet pack defaults to ~/.solvera-wallet-pack. 2) Confirm SKILL.md files include YAML frontmatter. 3) Confirm public base-wallet skill exists in frontend/public.

## Rollback Plan

Revert base-wallet CLI/storage changes and SKILL.md edits, remove new public files, then redeploy.
