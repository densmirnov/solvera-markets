---
id: "202604061632-S7HEFR"
title: "Fix agentplane verify and workflow contract"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:33:17.159Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved plumbing fix for verify/workflow lifecycle."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: repair agentplane verification/workflow plumbing and recover the blocked Status tasks."
events:
  -
    type: "status"
    at: "2026-04-06T16:33:41.747Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: repair agentplane verification/workflow plumbing and recover the blocked Status tasks."
doc_version: 3
doc_updated_at: "2026-04-06T16:33:41.753Z"
doc_updated_by: "ORCHESTRATOR"
description: "Restore repo-level agentplane lifecycle by adding the missing Verification doc section, publishing WORKFLOW.md, and closing blocked Status planning tasks."
sections:
  Summary: |-
    Fix agentplane verify and workflow contract
    
    Restore repo-level agentplane lifecycle by adding the missing Verification doc section, publishing WORKFLOW.md, and closing blocked Status planning tasks.
  Scope: |-
    - In scope: `.agentplane/config.json`, published `WORKFLOW.md`, and task lifecycle recovery for `202604061614-2GVQD2` and `202604061614-XSEJDG`.
    - Out of scope: broader agentplane framework upgrades or unrelated workflow refactors.
  Plan: |-
    1. Repair task doc configuration so verification is a declared section.
    2. Publish `WORKFLOW.md` from the current workflow template.
    3. Re-run preflight and confirm `workflow_contract_invalid` is gone.
    4. Replay verification and finish for the blocked Status tasks.
    5. Commit the plumbing fix and report the indexer recommendation.
  Risks: |-
    - Publishing a generated `WORKFLOW.md` may surface existing template assumptions such as narrow in-scope paths.
    - Replaying task verification/finish could create extra task-state commits if the workflow is now healthy; allowlist discipline matters.
    - Fixing the lifecycle bug does not by itself solve Status indexing support.
  Verify Steps: |-
    1. Run `agentplane preflight --json`. Expected: no `WF_MISSING_FILE:file` and no `workflow_contract_invalid`.
    2. Run verification and finish commands for `202604061614-2GVQD2` and `202604061614-XSEJDG`. Expected: both tasks progress through the normal lifecycle.
    3. Review `git status --short --untracked-files=no`. Expected: only intended config/workflow/task-state changes are present before commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
  Context: |-
    User asked to repair the repo-level agentplane lifecycle after the previous Status planning run exposed two hard failures: missing `Verification` in task doc sections and missing published `WORKFLOW.md`.
    
    This task fixes the plumbing and then replays verification/closure for the blocked Status tasks.
id_source: "generated"
---
## Summary

Fix agentplane verify and workflow contract

Restore repo-level agentplane lifecycle by adding the missing Verification doc section, publishing WORKFLOW.md, and closing blocked Status planning tasks.

## Scope

- In scope: `.agentplane/config.json`, published `WORKFLOW.md`, and task lifecycle recovery for `202604061614-2GVQD2` and `202604061614-XSEJDG`.
- Out of scope: broader agentplane framework upgrades or unrelated workflow refactors.

## Plan

1. Repair task doc configuration so verification is a declared section.
2. Publish `WORKFLOW.md` from the current workflow template.
3. Re-run preflight and confirm `workflow_contract_invalid` is gone.
4. Replay verification and finish for the blocked Status tasks.
5. Commit the plumbing fix and report the indexer recommendation.

## Risks

- Publishing a generated `WORKFLOW.md` may surface existing template assumptions such as narrow in-scope paths.
- Replaying task verification/finish could create extra task-state commits if the workflow is now healthy; allowlist discipline matters.
- Fixing the lifecycle bug does not by itself solve Status indexing support.

## Verify Steps

1. Run `agentplane preflight --json`. Expected: no `WF_MISSING_FILE:file` and no `workflow_contract_invalid`.
2. Run verification and finish commands for `202604061614-2GVQD2` and `202604061614-XSEJDG`. Expected: both tasks progress through the normal lifecycle.
3. Review `git status --short --untracked-files=no`. Expected: only intended config/workflow/task-state changes are present before commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Context

User asked to repair the repo-level agentplane lifecycle after the previous Status planning run exposed two hard failures: missing `Verification` in task doc sections and missing published `WORKFLOW.md`.

This task fixes the plumbing and then replays verification/closure for the blocked Status tasks.
