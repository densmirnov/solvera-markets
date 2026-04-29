---
id: "202604292032-CQR8ED"
title: "Document Status v0.7 roadmap"
result_summary: "Documented Status-first roadmap through v0.7 as dependent epics and aligned docs entrypoints/proposal language."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:33:25.036Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T20:39:00.059Z"
  updated_by: "DOCS"
  note: "Docs roadmap verified: policy routing passed, agentplane doctor passed with only pre-existing hook warnings, docs/docs.json parsed successfully, and the new Status v0.7 docs entrypoints were found. Updated ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md roadmap language."
commit:
  hash: "fbc1a442f0e9abdff473fd68ca129e1684e49904"
  message: "✅ CQR8ED docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: document the Status-first version plan through v0.7, rewrite ROADMAP.md into dependent epics, and add docs navigation while keeping changes docs-only and leaving the existing DESIGN.md drift untouched."
  -
    author: "DOCS"
    body: "Verified: Status v0.7 documentation roadmap updated and checked with routing validation, agentplane doctor, docs JSON parse, and docs entrypoint search."
events:
  -
    type: "status"
    at: "2026-04-29T20:33:30.677Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the Status-first version plan through v0.7, rewrite ROADMAP.md into dependent epics, and add docs navigation while keeping changes docs-only and leaving the existing DESIGN.md drift untouched."
  -
    type: "verify"
    at: "2026-04-29T20:39:00.059Z"
    author: "DOCS"
    state: "ok"
    note: "Docs roadmap verified: policy routing passed, agentplane doctor passed with only pre-existing hook warnings, docs/docs.json parsed successfully, and the new Status v0.7 docs entrypoints were found. Updated ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md roadmap language."
  -
    type: "status"
    at: "2026-04-29T20:39:54.265Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Status v0.7 documentation roadmap updated and checked with routing validation, agentplane doctor, docs JSON parse, and docs entrypoint search."
doc_version: 3
doc_updated_at: "2026-04-29T20:39:54.266Z"
doc_updated_by: "DOCS"
description: "Fix the Status-first product strategy in docs and rewrite ROADMAP.md as epics of sequential atomic dependent tasks from the current baseline through v0.7."
sections:
  Summary: |-
    Document Status v0.7 roadmap
    
    Fix the Status-first product strategy in docs and rewrite ROADMAP.md as epics of sequential atomic dependent tasks from the current baseline through v0.7.
  Scope: |-
    - In scope: ROADMAP.md, STATUS_PROPOSAL.md, docs/overview/status-v0.7-roadmap.md, docs/overview/vision-roadmap.md, docs/docs.json, docs/index.md, and directly necessary documentation navigation links.
    - Product scope to document: Status-first roadmap through v0.7; Base remains legacy/reference; no native token, official Status Karma integration, mainnet deployment, or generic arbitrary-outcome claim in this task.
    - Out of scope: contract changes, frontend implementation, backend/indexer implementation, deployment, secrets, network actions, and unrelated dirty files such as DESIGN.md.
  Plan: |-
    1. Rewrite ROADMAP.md as the canonical Status-first roadmap from the current deployed baseline through v0.7, using epics made of sequential atomic dependent tasks with verification gates.
    2. Add a Mintlify overview page that fixes the Status-native product thesis, release sequence, non-goals, and critical risks in reader-facing documentation.
    3. Wire the new page into docs/docs.json and docs/index.md without changing implementation code or unrelated dirty files.
    4. Verify docs-only changes with routing policy validation, agentplane doctor, and a targeted docs/docs.json parse check.
  Risks: |-
    - Product risk: documentation can overstate the protocol beyond implemented evaluator/dispute semantics; mitigate by separating current facts, planned inferences, and hypotheses.
    - Scope risk: roadmap edits may drift into implementation commitments; mitigate by marking non-goals and re-approval triggers.
    - Repo-state risk: DESIGN.md is already dirty and unrelated; do not edit, stage, or commit it in this task.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
    2. Run agentplane doctor. Expected: pass or only known non-blocking linked-binary warning outside this repo.
    3. Parse docs/docs.json with Node. Expected: valid JSON after navigation update.
    4. Inspect git status and changed paths. Expected: only intended docs/task files plus pre-existing unrelated DESIGN.md drift remains untouched.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: docs-only routing for ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md alignment.
      Links: ROADMAP.md, docs/overview/status-v0.7-roadmap.md, docs/overview/vision-roadmap.md, docs/index.md, docs/docs.json.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor returned ok=true with 0 errors; it reported two pre-existing hook shim warnings about stale fallback branches.
      Scope: repository workflow health.
      Links: .agentplane policy gateway.
    - Command: node -e "JSON.parse(require('fs').readFileSync('docs/docs.json','utf8')); console.log('docs/docs.json ok')"
      Result: pass
      Evidence: docs/docs.json ok.
      Scope: Mintlify navigation update.
      Links: docs/docs.json, docs/overview/status-v0.7-roadmap.md.
    - Command: test -f docs/overview/status-v0.7-roadmap.md && rg -n "Status v0.7 roadmap|overview/status-v0.7-roadmap|No native token|Status is the canonical" docs/index.md docs/docs.json docs/overview/status-v0.7-roadmap.md ROADMAP.md
      Result: pass
      Evidence: new roadmap page exists; docs home links to it; docs navigation includes it; roadmap records canonical Status target and no-native-token boundary.
      Scope: docs entrypoints and product boundary.
      Links: docs/index.md, docs/docs.json, docs/overview/status-v0.7-roadmap.md, ROADMAP.md.
    
    ### 2026-04-29T20:39:00.059Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs roadmap verified: policy routing passed, agentplane doctor passed with only pre-existing hook warnings, docs/docs.json parsed successfully, and the new Status v0.7 docs entrypoints were found. Updated ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md roadmap language.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:38:56.013Z, excerpt_hash=sha256:148e9c0d3f0fcbe063b4515f679207b2ad960a32bb022e6d008efd5370964b4b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - STATUS_PROPOSAL.md is currently untracked by git in this checkout but was updated because it contained roadmap language that directly conflicted with the Status v0.7 boundary.
    - DESIGN.md was already dirty before this task and was left untouched.
    - agentplane doctor passed with two pre-existing hook shim warnings; no hook mutation was in scope.
id_source: "generated"
---
## Summary

Document Status v0.7 roadmap

Fix the Status-first product strategy in docs and rewrite ROADMAP.md as epics of sequential atomic dependent tasks from the current baseline through v0.7.

## Scope

- In scope: ROADMAP.md, STATUS_PROPOSAL.md, docs/overview/status-v0.7-roadmap.md, docs/overview/vision-roadmap.md, docs/docs.json, docs/index.md, and directly necessary documentation navigation links.
- Product scope to document: Status-first roadmap through v0.7; Base remains legacy/reference; no native token, official Status Karma integration, mainnet deployment, or generic arbitrary-outcome claim in this task.
- Out of scope: contract changes, frontend implementation, backend/indexer implementation, deployment, secrets, network actions, and unrelated dirty files such as DESIGN.md.

## Plan

1. Rewrite ROADMAP.md as the canonical Status-first roadmap from the current deployed baseline through v0.7, using epics made of sequential atomic dependent tasks with verification gates.
2. Add a Mintlify overview page that fixes the Status-native product thesis, release sequence, non-goals, and critical risks in reader-facing documentation.
3. Wire the new page into docs/docs.json and docs/index.md without changing implementation code or unrelated dirty files.
4. Verify docs-only changes with routing policy validation, agentplane doctor, and a targeted docs/docs.json parse check.

## Risks

- Product risk: documentation can overstate the protocol beyond implemented evaluator/dispute semantics; mitigate by separating current facts, planned inferences, and hypotheses.
- Scope risk: roadmap edits may drift into implementation commitments; mitigate by marking non-goals and re-approval triggers.
- Repo-state risk: DESIGN.md is already dirty and unrelated; do not edit, stage, or commit it in this task.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
2. Run agentplane doctor. Expected: pass or only known non-blocking linked-binary warning outside this repo.
3. Parse docs/docs.json with Node. Expected: valid JSON after navigation update.
4. Inspect git status and changed paths. Expected: only intended docs/task files plus pre-existing unrelated DESIGN.md drift remains untouched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK.
  Scope: docs-only routing for ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md alignment.
  Links: ROADMAP.md, docs/overview/status-v0.7-roadmap.md, docs/overview/vision-roadmap.md, docs/index.md, docs/docs.json.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor returned ok=true with 0 errors; it reported two pre-existing hook shim warnings about stale fallback branches.
  Scope: repository workflow health.
  Links: .agentplane policy gateway.
- Command: node -e "JSON.parse(require('fs').readFileSync('docs/docs.json','utf8')); console.log('docs/docs.json ok')"
  Result: pass
  Evidence: docs/docs.json ok.
  Scope: Mintlify navigation update.
  Links: docs/docs.json, docs/overview/status-v0.7-roadmap.md.
- Command: test -f docs/overview/status-v0.7-roadmap.md && rg -n "Status v0.7 roadmap|overview/status-v0.7-roadmap|No native token|Status is the canonical" docs/index.md docs/docs.json docs/overview/status-v0.7-roadmap.md ROADMAP.md
  Result: pass
  Evidence: new roadmap page exists; docs home links to it; docs navigation includes it; roadmap records canonical Status target and no-native-token boundary.
  Scope: docs entrypoints and product boundary.
  Links: docs/index.md, docs/docs.json, docs/overview/status-v0.7-roadmap.md, ROADMAP.md.

### 2026-04-29T20:39:00.059Z — VERIFY — ok

By: DOCS

Note: Docs roadmap verified: policy routing passed, agentplane doctor passed with only pre-existing hook warnings, docs/docs.json parsed successfully, and the new Status v0.7 docs entrypoints were found. Updated ROADMAP.md, docs overview/navigation, and STATUS_PROPOSAL.md roadmap language.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:38:56.013Z, excerpt_hash=sha256:148e9c0d3f0fcbe063b4515f679207b2ad960a32bb022e6d008efd5370964b4b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- STATUS_PROPOSAL.md is currently untracked by git in this checkout but was updated because it contained roadmap language that directly conflicted with the Status v0.7 boundary.
- DESIGN.md was already dirty before this task and was left untouched.
- agentplane doctor passed with two pre-existing hook shim warnings; no hook mutation was in scope.
