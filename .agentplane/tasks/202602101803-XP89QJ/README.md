---
id: "202602101803-XP89QJ"
title: "Upgrade agentplane framework bundle"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-10T18:04:25.221Z"
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
    body: "Start: Running agentplane upgrade to refresh repo-local bundle; will validate with agentplane doctor and commit only .agentplane/ changes (excluding current PITCH.md/README.md edits)."
events:
  -
    type: "status"
    at: "2026-02-10T18:04:25.285Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Running agentplane upgrade to refresh repo-local bundle; will validate with agentplane doctor and commit only .agentplane/ changes (excluding current PITCH.md/README.md edits)."
doc_version: 2
doc_updated_at: "2026-02-10T18:04:25.285Z"
doc_updated_by: "ORCHESTRATOR"
description: "Run agentplane upgrade to refresh the repo-local framework bundle under .agentplane/. Keep unrelated working tree changes (PITCH.md, README.md) untouched and out of the commit."
id_source: "generated"
---
## Summary


## Scope


## Risks


## Verify Steps

1. Run agentplane upgrade in repo root.
2. Run agentplane doctor and ensure it passes.
3. Confirm git status shows only intentional changes under .agentplane/ and does not include PITCH.md or README.md in the commit.

## Rollback Plan


## Plan

1. Ensure no staged files (agentplane guard clean).
2. Run agentplane upgrade.
3. Run agentplane doctor.
4. Review git diff --stat.
5. Stage only .agentplane/ changes.
6. Commit via agentplane commit with --allow .agentplane/.
7. Finish task with agentplane finish referencing commit hash.

Risks: upgrade may touch multiple .agentplane/ files; avoid mixing with unrelated PITCH.md/README.md edits.

Rollback: revert the upgrade commit if doctor fails or regressions appear.

## Plan\n\n1. Pre-check: ensure no staged files.\n2. Run  to refresh repo-local agentplane framework bundle.\n3. Run  to validate workspace invariants.\n4. Inspect  PITCH.md  | 51 +++++++++------------------------------------------

 README.md | 43 +++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 52 insertions(+), 42 deletions(-) and stage only  files related to the upgrade.\n5. Commit via  with tight  allowlist.\n6. Finish task with  referencing the commit hash.\n\n## Risks\n- Upgrade may modify multiple files under ; avoid mixing with unrelated edits in working tree.\n\n## Rollback\n- Revert the upgrade commit (or reset upgraded files to previous revision) if  fails or behavior regresses.
