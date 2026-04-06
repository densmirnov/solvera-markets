---
id: "202604061644-W01S34"
title: "Normalize agentplane artifacts for runtime 0.3.10"
result_summary: "Workflow artifacts normalized for runtime 0.3.10 and task scan/verify restored."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "agentplane doctor"
  - "agentplane task list >/tmp/agentplane-task-list.txt && ! rg -n \"invalid_readme_frontmatter|skipped [0-9]+ task files\" /tmp/agentplane-task-list.txt"
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T16:47:49.837Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: normalize runtime/task artifacts before Status graph spike."
verification:
  state: "ok"
  updated_at: "2026-04-06T16:53:31.026Z"
  updated_by: "REVIEWER"
  note: "Workflow normalization complete: doctor passes, task scan no longer skips invalid READMEs, XP89QJ parses cleanly, and verify-path works after aligning repo config with runtime expectations."
commit:
  hash: "f861c20cb084650f252f09aed2fb6f56d37e7bc0"
  message: "✅ W01S34 agentplane: normalize runtime task docs"
comments:
  -
    author: "CODER"
    body: "Start: normalize current agentplane runtime artifacts, identify broken migrated task docs, and restore clean task scanning before any Status Graph spike work."
  -
    author: "CODER"
    body: "Verified: normalized repo-local agentplane task artifacts for runtime 0.3.10, repaired the malformed XP89QJ migration output, and restored working verify/task-scan behavior for the repository."
events:
  -
    type: "status"
    at: "2026-04-06T16:48:13.296Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize current agentplane runtime artifacts, identify broken migrated task docs, and restore clean task scanning before any Status Graph spike work."
  -
    type: "verify"
    at: "2026-04-06T16:53:31.026Z"
    author: "REVIEWER"
    state: "ok"
    note: "Workflow normalization complete: doctor passes, task scan no longer skips invalid READMEs, XP89QJ parses cleanly, and verify-path works after aligning repo config with runtime expectations."
  -
    type: "status"
    at: "2026-04-06T16:55:49.013Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: normalized repo-local agentplane task artifacts for runtime 0.3.10, repaired the malformed XP89QJ migration output, and restored working verify/task-scan behavior for the repository."
doc_version: 3
doc_updated_at: "2026-04-06T16:55:49.016Z"
doc_updated_by: "CODER"
description: "Refresh repo-local agentplane managed files and task README artifacts to the current runtime format, repair invalid migrated task docs, and restore clean task scanning/verification behavior. Tracking: 202604061614-XSEJDG."
sections:
  Summary: "Normalize repo-local agentplane artifacts to the current 0.3.10 runtime contract. This task upgrades managed files when needed, repairs broken task README migrations, and leaves the repository with a clean task scan path and deterministic verification metadata."
  Scope: |-
    - In scope: `.agentplane/**`, managed workflow files, task README normalization, and task metadata updates required to make the current runtime parse and verify repository tasks correctly.
    - Out of scope: product code, Status deployment logic, and Graph/indexer changes unrelated to the workflow layer.
  Plan: |-
    1. Inspect the current runtime expectations and identify where migrated task docs still violate the v3 contract.
    2. Run the canonical framework upgrade flow for the installed 0.3.10 runtime if it changes managed files, then re-run task doc migration only as needed.
    3. Repair any remaining invalid task README artifacts through agentplane-managed doc updates rather than manual edits.
    4. Re-run `agentplane doctor` and `agentplane task list` until no invalid README scan warnings remain.
    5. Review the final `.agentplane` diff and keep the scope limited to workflow artifacts.
  Risks: |-
    - Upgrade automation may rewrite a large set of workflow files, creating noisy churn that obscures the real fix. Mitigation: review the diff and keep only managed artifact changes that the runtime now expects.
    - Re-running migration against already-migrated tasks may duplicate or corrupt sections again. Mitigation: validate one broken task first and prefer targeted normalization over blind repeated migration.
    - `task plan set` and `verify` may still fail if the runtime has a separate bug beyond repo artifacts. Mitigation: distinguish repo-format failures from binary/runtime failures with `runtime explain`, `doctor`, and clean task scanning evidence.
  Verify Steps: |-
    1. Run `agentplane doctor`. Expected: `doctor (OK)` with no workflow findings.
    2. Run `agentplane task list >/tmp/agentplane-task-list.txt && ! rg -n "invalid_readme_frontmatter|skipped [0-9]+ task files" /tmp/agentplane-task-list.txt`. Expected: the task scan shows no skipped invalid README files.
    3. Inspect the repaired task file `202602101803-XP89QJ`. Expected: frontmatter parses cleanly, `doc_version: 3` is preserved, and there are no stray malformed YAML keys from migration.
    4. Review `git diff --stat -- .agentplane AGENTS.md`. Expected: changes are limited to workflow/runtime artifacts needed for 0.3.10 compatibility.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T16:53:31.026Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Workflow normalization complete: doctor passes, task scan no longer skips invalid READMEs, XP89QJ parses cleanly, and verify-path works after aligning repo config with runtime expectations.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:53:30.869Z, excerpt_hash=sha256:15d15aeafd14a39d381cb273887ad609d9cbf63baa2501adbdbcd9b2fa13f2f5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Revert the workflow-artifact commit produced by this task.
    2. Re-run `agentplane doctor` and `agentplane task list` to confirm the repository returned to the prior known-good state.
    3. If the upgrade path introduces broader regressions, restore the last known good `.agentplane` files from git history and retry with a narrower normalization strategy.
  Findings: |-
    Decision: repo-local workflow artifacts are now aligned with the current `agentplane 0.3.10` runtime contract.
    Key findings: `agentplane upgrade --dry-run` reported no pending managed-file updates; the real breakage was a malformed migrated task README (`202602101803-XP89QJ`) plus a repo config mismatch where `Findings` was absent from allowed sections and `Verification` was absent from required sections.
    Next steps: export task state, commit the workflow-only migration, then start the Status Graph Node spike from task `202604061644-8Q1433`.
id_source: "generated"
---
## Summary

Normalize repo-local agentplane artifacts to the current 0.3.10 runtime contract. This task upgrades managed files when needed, repairs broken task README migrations, and leaves the repository with a clean task scan path and deterministic verification metadata.

## Scope

- In scope: `.agentplane/**`, managed workflow files, task README normalization, and task metadata updates required to make the current runtime parse and verify repository tasks correctly.
- Out of scope: product code, Status deployment logic, and Graph/indexer changes unrelated to the workflow layer.

## Plan

1. Inspect the current runtime expectations and identify where migrated task docs still violate the v3 contract.
2. Run the canonical framework upgrade flow for the installed 0.3.10 runtime if it changes managed files, then re-run task doc migration only as needed.
3. Repair any remaining invalid task README artifacts through agentplane-managed doc updates rather than manual edits.
4. Re-run `agentplane doctor` and `agentplane task list` until no invalid README scan warnings remain.
5. Review the final `.agentplane` diff and keep the scope limited to workflow artifacts.

## Risks

- Upgrade automation may rewrite a large set of workflow files, creating noisy churn that obscures the real fix. Mitigation: review the diff and keep only managed artifact changes that the runtime now expects.
- Re-running migration against already-migrated tasks may duplicate or corrupt sections again. Mitigation: validate one broken task first and prefer targeted normalization over blind repeated migration.
- `task plan set` and `verify` may still fail if the runtime has a separate bug beyond repo artifacts. Mitigation: distinguish repo-format failures from binary/runtime failures with `runtime explain`, `doctor`, and clean task scanning evidence.

## Verify Steps

1. Run `agentplane doctor`. Expected: `doctor (OK)` with no workflow findings.
2. Run `agentplane task list >/tmp/agentplane-task-list.txt && ! rg -n "invalid_readme_frontmatter|skipped [0-9]+ task files" /tmp/agentplane-task-list.txt`. Expected: the task scan shows no skipped invalid README files.
3. Inspect the repaired task file `202602101803-XP89QJ`. Expected: frontmatter parses cleanly, `doc_version: 3` is preserved, and there are no stray malformed YAML keys from migration.
4. Review `git diff --stat -- .agentplane AGENTS.md`. Expected: changes are limited to workflow/runtime artifacts needed for 0.3.10 compatibility.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T16:53:31.026Z — VERIFY — ok

By: REVIEWER

Note: Workflow normalization complete: doctor passes, task scan no longer skips invalid READMEs, XP89QJ parses cleanly, and verify-path works after aligning repo config with runtime expectations.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:53:30.869Z, excerpt_hash=sha256:15d15aeafd14a39d381cb273887ad609d9cbf63baa2501adbdbcd9b2fa13f2f5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the workflow-artifact commit produced by this task.
2. Re-run `agentplane doctor` and `agentplane task list` to confirm the repository returned to the prior known-good state.
3. If the upgrade path introduces broader regressions, restore the last known good `.agentplane` files from git history and retry with a narrower normalization strategy.

## Findings

Decision: repo-local workflow artifacts are now aligned with the current `agentplane 0.3.10` runtime contract.
Key findings: `agentplane upgrade --dry-run` reported no pending managed-file updates; the real breakage was a malformed migrated task README (`202602101803-XP89QJ`) plus a repo config mismatch where `Findings` was absent from allowed sections and `Verification` was absent from required sections.
Next steps: export task state, commit the workflow-only migration, then start the Status Graph Node spike from task `202604061644-8Q1433`.
