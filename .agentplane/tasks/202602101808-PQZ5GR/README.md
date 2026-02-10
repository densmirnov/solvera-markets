---
id: "202602101808-PQZ5GR"
title: "Make agentplane doctor pass in fresh clones"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "[\"202602101803-XP89QJ\"]"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-10T18:09:13.237Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Adding tracked placeholder directories under packages/agentplane/src/* so agentplane doctor passes on a fresh clone after the framework upgrade."
events:
  -
    type: "status"
    at: "2026-02-10T18:09:28.936Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding tracked placeholder directories under packages/agentplane/src/* so agentplane doctor passes on a fresh clone after the framework upgrade."
doc_version: 2
doc_updated_at: "2026-02-10T18:09:28.936Z"
doc_updated_by: "ORCHESTRATOR"
description: "After upgrading agentplane framework bundle, agentplane doctor expects packages/agentplane/src/{cli,usecases,ports} to exist. Add minimal tracked placeholders so doctor passes without manual mkdir."
id_source: "generated"
---
## Summary


## Scope


## Risks


## Verify Steps

1. Run agentplane doctor and ensure it returns OK.
2. Confirm packages/agentplane/src/{cli,usecases,ports} are tracked (git status shows them staged when added).
3. Confirm no unrelated files (PITCH.md/README.md) are included in the commit.

## Rollback Plan


## Plan

1. Add .gitkeep placeholders under packages/agentplane/src/cli, packages/agentplane/src/usecases, packages/agentplane/src/ports.
2. Run agentplane doctor to validate.
3. Commit only packages/ placeholders and the new task README.
