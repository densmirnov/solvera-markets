---
id: "202602051458-9BFSE1"
title: "Hero redesign + ETHGlobal chip"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "manual:visual-check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:30:45.457Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: hero chip and redesign present in frontend/src/pages/Home.tsx with ETHGlobal HackMoney 2026 Submission chip and updated layout."
commit:
  hash: "af31e747defcb7ec04f3c77fbc6f826ac5c8f1fe"
  message: "✨ 9BFSE1 refine hero shell styling"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Locate homepage hero, redesign layout/visuals, add ETHGlobal HackMoney 2026 Submission chip, keep adaptive layout intact."
  -
    author: "ORCHESTRATOR"
    body: "Verified: hero redesign and ETHGlobal HackMoney 2026 Submission chip present in home hero; layout updated."
events:
  -
    type: "verify"
    at: "2026-02-07T08:30:45.457Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: hero chip and redesign present in frontend/src/pages/Home.tsx with ETHGlobal HackMoney 2026 Submission chip and updated layout."
  -
    type: "status"
    at: "2026-02-07T08:30:55.790Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: hero redesign and ETHGlobal HackMoney 2026 Submission chip present in home hero; layout updated."
doc_version: 2
doc_updated_at: "2026-02-07T08:30:55.790Z"
doc_updated_by: "ORCHESTRATOR"
description: "Redesign homepage hero to be more designer/fashionable and add ETHGlobal HackMoney 2026 Submission chip."
id_source: "generated"
---
## Summary

Redesigned the homepage hero with layered background styling, a right-side signal panel, and added the ETHGlobal HackMoney 2026 Submission chip.

## Scope

Update hero layout and visuals in frontend/src/pages/Home.tsx and add hero-specific styles in frontend/src/index.css.

## Risks

Hero visuals are more layered and could feel busy on smaller screens; the new right-side panel is static and could be misread as data if not treated as decorative.

## Verify Steps

manual: visually inspect homepage hero on desktop and mobile breakpoints.

## Rollback Plan

Revert frontend/src/pages/Home.tsx and frontend/src/index.css to the previous hero markup and styles.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:30:45.457Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: hero chip and redesign present in frontend/src/pages/Home.tsx with ETHGlobal HackMoney 2026 Submission chip and updated layout.

<!-- END VERIFICATION RESULTS -->
