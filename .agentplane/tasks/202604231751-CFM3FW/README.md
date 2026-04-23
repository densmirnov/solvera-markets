---
id: "202604231751-CFM3FW"
title: "Fix home brand typo and add whitelist signup"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:52:48.265Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T17:55:03.507Z"
  updated_by: "CODER"
  note: "Validated homepage typo removal, whitelist signup UI wiring, eslint, and production build for the approved frontend scope."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved homepage typo fix and whitelist signup block without introducing backend persistence, keeping the diff limited to the frontend landing page and its styling."
events:
  -
    type: "status"
    at: "2026-04-23T17:52:56.249Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved homepage typo fix and whitelist signup block without introducing backend persistence, keeping the diff limited to the frontend landing page and its styling."
  -
    type: "verify"
    at: "2026-04-23T17:55:03.507Z"
    author: "CODER"
    state: "ok"
    note: "Validated homepage typo removal, whitelist signup UI wiring, eslint, and production build for the approved frontend scope."
doc_version: 3
doc_updated_at: "2026-04-23T17:55:03.513Z"
doc_updated_by: "CODER"
description: "Correct the Solvera home page brand typo and add a homepage whitelist signup block for future email updates using an external mailing-list provider integration point."
sections:
  Summary: "Fix the homepage brand typo and add a homepage whitelist signup block for future email updates using an external provider integration point."
  Scope: |-
    - Update frontend homepage copy where the brand is misspelled.
    - Add a whitelist signup section on the homepage with email capture UI and provider handoff wiring.
    - Keep changes limited to frontend source and related styling if needed.
    - Do not introduce backend persistence or broader content rewrites.
  Plan: |-
    1. Implement the change for "Fix home brand typo and add whitelist signup".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - Homepage layout could regress if the new section breaks spacing on smaller viewports.
    - Provider integration could be too specific if the final Brevo embed details differ from the placeholder wiring.
    - Existing untracked repository noise must remain untouched.
  Verify Steps: |-
    - Run: rg -n "Solera" frontend/src
    - Run: npm --prefix frontend run lint
    - Run: npm --prefix frontend run build
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T17:55:03.507Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated homepage typo removal, whitelist signup UI wiring, eslint, and production build for the approved frontend scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:52:56.260Z, excerpt_hash=sha256:a08657bd478f438420c794a34158ebda7b08f244822e2fbb416b7052a009099c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the homepage component and stylesheet changes for this task, then rerun frontend lint and build to confirm the previous landing page state is restored."
  Findings: ""
id_source: "generated"
---
## Summary

Fix the homepage brand typo and add a homepage whitelist signup block for future email updates using an external provider integration point.

## Scope

- Update frontend homepage copy where the brand is misspelled.
- Add a whitelist signup section on the homepage with email capture UI and provider handoff wiring.
- Keep changes limited to frontend source and related styling if needed.
- Do not introduce backend persistence or broader content rewrites.

## Plan

1. Implement the change for "Fix home brand typo and add whitelist signup".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- Homepage layout could regress if the new section breaks spacing on smaller viewports.
- Provider integration could be too specific if the final Brevo embed details differ from the placeholder wiring.
- Existing untracked repository noise must remain untouched.

## Verify Steps

- Run: rg -n "Solera" frontend/src
- Run: npm --prefix frontend run lint
- Run: npm --prefix frontend run build

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T17:55:03.507Z — VERIFY — ok

By: CODER

Note: Validated homepage typo removal, whitelist signup UI wiring, eslint, and production build for the approved frontend scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:52:56.260Z, excerpt_hash=sha256:a08657bd478f438420c794a34158ebda7b08f244822e2fbb416b7052a009099c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the homepage component and stylesheet changes for this task, then rerun frontend lint and build to confirm the previous landing page state is restored.

## Findings
