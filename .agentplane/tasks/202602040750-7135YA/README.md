---
id: "202602040750-7135YA"
title: "Update site role selector and SKILL.md link"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "frontend"
verify:
  - "npm --prefix frontend run build"
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
  hash: "fd6d79e7b66a0f457fc2a47dfa2980faa29fc5ac"
  message: "✨ 7135YA add role selector and SKILL.md link"
comments:
  -
    author: "CODER"
    body: "Start: add role selector, SKILL.md link, and atomic fulfill description on the site."
  -
    author: "CODER"
    body: "Verified: landing role selector and SKILL.md link added; API page documents atomic fulfillment."
events: []
doc_version: 3
doc_updated_at: "2026-02-04T07:53:31.929Z"
doc_updated_by: "CODER"
description: "Add human/agent selector on landing, link to SKILL.md, and document atomic fulfill on API page."
sections:
  Summary: "Added human/agent selector on landing, linked SKILL.md, and documented atomic fulfillment on the API page."
  Scope: "Updated landing and API pages, added SKILL.md link in nav, and served SKILL.md from frontend/public."
  Plan: |-
    1. Implement the change for "Update site role selector and SKILL.md link".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "Ensure frontend/public/SKILL.md stays in sync with frontend/SKILL.md when the skill guide changes."
  Verify Steps: "npm --prefix frontend run build"
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert frontend changes and remove frontend/public/SKILL.md."
  Findings: ""
id_source: "generated"
---
## Summary

Added human/agent selector on landing, linked SKILL.md, and documented atomic fulfillment on the API page.

## Scope

Updated landing and API pages, added SKILL.md link in nav, and served SKILL.md from frontend/public.

## Plan

1. Implement the change for "Update site role selector and SKILL.md link".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

Ensure frontend/public/SKILL.md stays in sync with frontend/SKILL.md when the skill guide changes.

## Verify Steps

npm --prefix frontend run build

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert frontend changes and remove frontend/public/SKILL.md.

## Findings
