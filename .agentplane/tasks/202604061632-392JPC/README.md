---
id: "202604061632-392JPC"
title: "Apply repo-level agentplane plumbing fix"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:33:36.431Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved minimal config/workflow fix and replay of blocked task closure."
verification:
  state: "ok"
  updated_at: "2026-04-06T16:52:41.910Z"
  updated_by: "REVIEWER"
  note: "Post-migration spot check: workflow config includes Verification/Findings, doctor passes, and the historically broken XP89QJ task README now parses cleanly."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add the missing Verification section, publish WORKFLOW.md, and replay blocked task closure."
events:
  -
    type: "status"
    at: "2026-04-06T16:33:41.747Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add the missing Verification section, publish WORKFLOW.md, and replay blocked task closure."
  -
    type: "verify"
    at: "2026-04-06T16:52:41.910Z"
    author: "REVIEWER"
    state: "ok"
    note: "Post-migration spot check: workflow config includes Verification/Findings, doctor passes, and the historically broken XP89QJ task README now parses cleanly."
doc_version: 3
doc_updated_at: "2026-04-06T16:52:42.038Z"
doc_updated_by: "CODER"
description: "Update config/workflow contract so agentplane verify and finish work again, then close the blocked Status planning tasks. Tracking: 202604061632-S7HEFR."
sections:
  Summary: |-
    Apply repo-level agentplane plumbing fix
    
    Update config/workflow contract so agentplane verify and finish work again, then close the blocked Status planning tasks. Tracking: 202604061632-S7HEFR.
  Scope: |-
    - In scope: add the missing `Verification` section to task doc config, publish `WORKFLOW.md`, verify/finalize the two blocked Status tasks, and commit the plumbing fix.
    - Out of scope: changing Status roadmap content or implementing Status deployment code.
  Plan: |-
    1. Update `.agentplane/config.json` so `tasks.doc.sections` includes `Verification`.
    2. Build and publish `WORKFLOW.md` with `agentplane workflow build --validate`.
    3. Run `agentplane preflight --json` and `agentplane task verify ok` on the blocked tasks.
    4. Finish the blocked tasks and this plumbing-fix task.
    5. Commit only the minimal config/workflow/task-state changes.
  Risks: |-
    - The generated workflow may still be semantically weak even after publication; this fix targets validity, not policy quality.
    - Task close-out may still fail on unrelated metadata constraints, in which case a second repo bug exists.
    - The Graph support for Status remains an architectural risk independent of this tooling fix.
  Verify Steps: |-
    1. Run `agentplane preflight --json`. Expected: `workflow_loaded.ok=true` and no `workflow_contract_invalid`.
    2. Run `agentplane task verify ok 202604061614-2GVQD2 ...` and `agentplane task verify ok 202604061614-XSEJDG ...`. Expected: both commands succeed without `Unknown doc section`.
    3. Run `agentplane finish` for the blocked tasks. Expected: both tasks can be moved to `DONE` without force hacks tied to the old verification bug.
  Verification: |-
    - Smoke check after config fix.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T16:52:41.910Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Post-migration spot check: workflow config includes Verification/Findings, doctor passes, and the historically broken XP89QJ task README now parses cleanly.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:34:48.066Z, excerpt_hash=sha256:0adb45ddb16fd0f92e333128ff27890aaeb2401713f0440edef7a21706ce16ea
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the config/workflow/task-state commit if `agentplane verify` or `finish` starts failing in a new way.
    - If the generated `WORKFLOW.md` is the only problem, revert that file independently and rebuild once the template issue is understood.
    - Keep the previously created Status roadmap commits intact; this task only fixes workflow plumbing.
  Findings: ""
  Context: |-
    The repo currently has valid task READMEs that include `Verification`, but `.agentplane/config.json` does not declare that section, so `agentplane verify` fails with `Unknown doc section: Verification`.
    
    Separately, `WORKFLOW.md` is missing, so `preflight` reports `workflow_contract_invalid` with `WF_MISSING_FILE:file`.
    
    This task applies the minimal repo fix and then closes the two blocked Status planning tasks.
id_source: "generated"
---
## Summary

Apply repo-level agentplane plumbing fix

Update config/workflow contract so agentplane verify and finish work again, then close the blocked Status planning tasks. Tracking: 202604061632-S7HEFR.

## Scope

- In scope: add the missing `Verification` section to task doc config, publish `WORKFLOW.md`, verify/finalize the two blocked Status tasks, and commit the plumbing fix.
- Out of scope: changing Status roadmap content or implementing Status deployment code.

## Plan

1. Update `.agentplane/config.json` so `tasks.doc.sections` includes `Verification`.
2. Build and publish `WORKFLOW.md` with `agentplane workflow build --validate`.
3. Run `agentplane preflight --json` and `agentplane task verify ok` on the blocked tasks.
4. Finish the blocked tasks and this plumbing-fix task.
5. Commit only the minimal config/workflow/task-state changes.

## Risks

- The generated workflow may still be semantically weak even after publication; this fix targets validity, not policy quality.
- Task close-out may still fail on unrelated metadata constraints, in which case a second repo bug exists.
- The Graph support for Status remains an architectural risk independent of this tooling fix.

## Verify Steps

1. Run `agentplane preflight --json`. Expected: `workflow_loaded.ok=true` and no `workflow_contract_invalid`.
2. Run `agentplane task verify ok 202604061614-2GVQD2 ...` and `agentplane task verify ok 202604061614-XSEJDG ...`. Expected: both commands succeed without `Unknown doc section`.
3. Run `agentplane finish` for the blocked tasks. Expected: both tasks can be moved to `DONE` without force hacks tied to the old verification bug.

## Verification

- Smoke check after config fix.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T16:52:41.910Z — VERIFY — ok

By: REVIEWER

Note: Post-migration spot check: workflow config includes Verification/Findings, doctor passes, and the historically broken XP89QJ task README now parses cleanly.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:34:48.066Z, excerpt_hash=sha256:0adb45ddb16fd0f92e333128ff27890aaeb2401713f0440edef7a21706ce16ea

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the config/workflow/task-state commit if `agentplane verify` or `finish` starts failing in a new way.
- If the generated `WORKFLOW.md` is the only problem, revert that file independently and rebuild once the template issue is understood.
- Keep the previously created Status roadmap commits intact; this task only fixes workflow plumbing.

## Findings


## Context

The repo currently has valid task READMEs that include `Verification`, but `.agentplane/config.json` does not declare that section, so `agentplane verify` fails with `Unknown doc section: Verification`.

Separately, `WORKFLOW.md` is missing, so `preflight` reports `workflow_contract_invalid` with `WF_MISSING_FILE:file`.

This task applies the minimal repo fix and then closes the two blocked Status planning tasks.
