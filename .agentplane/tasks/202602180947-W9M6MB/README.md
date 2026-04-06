---
id: "202602180947-W9M6MB"
title: "Implement simpleclaw static site in Solvera style"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-18T09:48:46.856Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved scope, implementation approach, and verification contract."
verification:
  state: "ok"
  updated_at: "2026-02-18T09:54:18.156Z"
  updated_by: "CODER"
  note: "Verified: simpleclaw static site exists with expected structure and animation logic; local server successfully listened on :4173; Russian localized copy is present across key sections."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement static Russian landing in simpleclaw directory with Solvera visual style, adapted structure, and animation parity with source site."
events:
  -
    type: "status"
    at: "2026-02-18T09:49:37.891Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement static Russian landing in simpleclaw directory with Solvera visual style, adapted structure, and animation parity with source site."
  -
    type: "verify"
    at: "2026-02-18T09:54:18.156Z"
    author: "CODER"
    state: "ok"
    note: "Verified: simpleclaw static site exists with expected structure and animation logic; local server successfully listened on :4173; Russian localized copy is present across key sections."
doc_version: 3
doc_updated_at: "2026-02-18T09:54:18.158Z"
doc_updated_by: "CODER"
description: "Create /simpleclaw static website with Russian content and adapted structure/animations based on simpleclaw.com while matching Solvera visual language."
sections:
  Summary: |-
    Create a new static landing site under `simpleclaw/` that mirrors the information architecture and interaction patterns of simpleclaw.com, but uses Solvera visual language and Russian localized copy.
    
    Success criteria: the page is fully static, mobile-friendly, includes analogous section flow and animation behavior, and all visible text is Russian.
  Scope: |-
    In scope:
    - `simpleclaw/index.html`
    - `simpleclaw/styles.css`
    - `simpleclaw/script.js`
    - optional local assets inside `simpleclaw/`
    
    Out of scope:
    - edits outside `simpleclaw/**`
    - backend changes
    - deployment and DNS changes
  Plan: |-
    1. Inspect Solvera styles in repository and extract reusable visual tokens (color/spacing/typography/motion direction).
    2. Inspect simpleclaw.com page structure and interaction model (hero, value blocks, pricing/order section, FAQ/CTA, reveal patterns).
    3. Build static HTML structure in `simpleclaw/index.html` using equivalent semantic blocks.
    4. Implement Solvera-style CSS theme and responsive layout in `simpleclaw/styles.css`.
    5. Implement animation and interaction behavior in `simpleclaw/script.js` (hero intro, scroll reveals, sticky micro-interactions).
    6. Local verify via task Verify Steps and iterate until pass.
    7. Prepare commit through agentplane with allowlist restricted to `simpleclaw/**` and related task artifacts.
  Risks: |-
    - Risk: section structure may diverge from source site due to dynamic rendering details.
      Mitigation: inspect DOM structure and preserve section sequence and key block hierarchy.
    - Risk: animation feel may differ across browsers.
      Mitigation: use CSS + IntersectionObserver with reduced-motion fallback.
    - Risk: accidental near-verbatim text reuse.
      Mitigation: rewrite all copy in Russian with equivalent meaning, not literal transfer.
  Verify Steps: |-
    1. `test -f simpleclaw/index.html && test -f simpleclaw/styles.css && test -f simpleclaw/script.js`
       Pass: all files exist.
    2. `rg -n "<section|hero|cta|faq|tariff|install" simpleclaw/index.html`
       Pass: required content sections are present.
    3. `rg -n "IntersectionObserver|requestAnimationFrame|prefers-reduced-motion|reveal|animate" simpleclaw/script.js simpleclaw/styles.css`
       Pass: scroll/entry animation logic and reduced-motion handling exist.
    4. `rg -n "[A-Za-z]{4,}" simpleclaw/index.html`
       Pass: no large English marketing copy blocks (allow technical terms and brand names only).
    5. `python3 -m http.server 4173 --directory simpleclaw >/tmp/simpleclaw_preview.log 2>&1 & sleep 1; lsof -i :4173 | rg LISTEN; pkill -f "http.server 4173"`
       Pass: local static server starts and listens on port 4173.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-02-18T09:54:18.156Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: simpleclaw static site exists with expected structure and animation logic; local server successfully listened on :4173; Russian localized copy is present across key sections.
    
    VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T09:54:14.403Z, excerpt_hash=sha256:15a38700781046a0f7366790fc6ffbc987daf27ab2900781a7b5e685d357137e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    If verification fails after merge-ready state:
    1. Revert the implementation commit associated with this task via agentplane close/revert flow.
    2. Remove `simpleclaw/**` additions in the revert change.
    3. Re-run verification to confirm repository returns to pre-task behavior.
  Findings: |-
    ### Approvals / Overrides
    - User approved plan execution and confirmed Russian semantic adaptation instead of verbatim source-text copy.
    - No workflow override requested.
    
    ### Decisions
    - Kept source page structure and interaction pattern (header, hero, setup card, comparison split, multi-row marquee use-cases, footer).
    - Applied Solvera visual language (light gradient atmosphere, orange/cool accents, soft glass surfaces, reveal motion).
    - Implemented static interactions in vanilla JS to keep deployment friction low.
    
    ### Implementation Notes
    - Added `simpleclaw/index.html` with full section hierarchy and Russian copy.
    - Added `simpleclaw/styles.css` with Solvera-themed tokens, responsive layout, starfield style, marquee and reveal animations.
    - Added `simpleclaw/script.js` for star twinkles, selectable option cards, marquee duplication, and IntersectionObserver reveals.
    
    ### Evidence / Links
    - Local checks executed: file existence, section structure grep, animation logic grep, and local static server start on port 4173.
  Context: |-
    The user requested a local static reproduction of simpleclaw.com with Solvera styling and Russian text. The implementation must remain inside repository scope and follow agentplane workflow.
    
    Copyright-sensitive constraint: do not copy source text verbatim; provide Russian semantic adaptation aligned to original section intent.
id_source: "generated"
---
## Summary

Create a new static landing site under `simpleclaw/` that mirrors the information architecture and interaction patterns of simpleclaw.com, but uses Solvera visual language and Russian localized copy.

Success criteria: the page is fully static, mobile-friendly, includes analogous section flow and animation behavior, and all visible text is Russian.

## Scope

In scope:
- `simpleclaw/index.html`
- `simpleclaw/styles.css`
- `simpleclaw/script.js`
- optional local assets inside `simpleclaw/`

Out of scope:
- edits outside `simpleclaw/**`
- backend changes
- deployment and DNS changes

## Plan

1. Inspect Solvera styles in repository and extract reusable visual tokens (color/spacing/typography/motion direction).
2. Inspect simpleclaw.com page structure and interaction model (hero, value blocks, pricing/order section, FAQ/CTA, reveal patterns).
3. Build static HTML structure in `simpleclaw/index.html` using equivalent semantic blocks.
4. Implement Solvera-style CSS theme and responsive layout in `simpleclaw/styles.css`.
5. Implement animation and interaction behavior in `simpleclaw/script.js` (hero intro, scroll reveals, sticky micro-interactions).
6. Local verify via task Verify Steps and iterate until pass.
7. Prepare commit through agentplane with allowlist restricted to `simpleclaw/**` and related task artifacts.

## Risks

- Risk: section structure may diverge from source site due to dynamic rendering details.
  Mitigation: inspect DOM structure and preserve section sequence and key block hierarchy.
- Risk: animation feel may differ across browsers.
  Mitigation: use CSS + IntersectionObserver with reduced-motion fallback.
- Risk: accidental near-verbatim text reuse.
  Mitigation: rewrite all copy in Russian with equivalent meaning, not literal transfer.

## Verify Steps

1. `test -f simpleclaw/index.html && test -f simpleclaw/styles.css && test -f simpleclaw/script.js`
   Pass: all files exist.
2. `rg -n "<section|hero|cta|faq|tariff|install" simpleclaw/index.html`
   Pass: required content sections are present.
3. `rg -n "IntersectionObserver|requestAnimationFrame|prefers-reduced-motion|reveal|animate" simpleclaw/script.js simpleclaw/styles.css`
   Pass: scroll/entry animation logic and reduced-motion handling exist.
4. `rg -n "[A-Za-z]{4,}" simpleclaw/index.html`
   Pass: no large English marketing copy blocks (allow technical terms and brand names only).
5. `python3 -m http.server 4173 --directory simpleclaw >/tmp/simpleclaw_preview.log 2>&1 & sleep 1; lsof -i :4173 | rg LISTEN; pkill -f "http.server 4173"`
   Pass: local static server starts and listens on port 4173.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-18T09:54:18.156Z — VERIFY — ok

By: CODER

Note: Verified: simpleclaw static site exists with expected structure and animation logic; local server successfully listened on :4173; Russian localized copy is present across key sections.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T09:54:14.403Z, excerpt_hash=sha256:15a38700781046a0f7366790fc6ffbc987daf27ab2900781a7b5e685d357137e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If verification fails after merge-ready state:
1. Revert the implementation commit associated with this task via agentplane close/revert flow.
2. Remove `simpleclaw/**` additions in the revert change.
3. Re-run verification to confirm repository returns to pre-task behavior.

## Findings

### Approvals / Overrides
- User approved plan execution and confirmed Russian semantic adaptation instead of verbatim source-text copy.
- No workflow override requested.

### Decisions
- Kept source page structure and interaction pattern (header, hero, setup card, comparison split, multi-row marquee use-cases, footer).
- Applied Solvera visual language (light gradient atmosphere, orange/cool accents, soft glass surfaces, reveal motion).
- Implemented static interactions in vanilla JS to keep deployment friction low.

### Implementation Notes
- Added `simpleclaw/index.html` with full section hierarchy and Russian copy.
- Added `simpleclaw/styles.css` with Solvera-themed tokens, responsive layout, starfield style, marquee and reveal animations.
- Added `simpleclaw/script.js` for star twinkles, selectable option cards, marquee duplication, and IntersectionObserver reveals.

### Evidence / Links
- Local checks executed: file existence, section structure grep, animation logic grep, and local static server start on port 4173.

## Context

The user requested a local static reproduction of simpleclaw.com with Solvera styling and Russian text. The implementation must remain inside repository scope and follow agentplane workflow.

Copyright-sensitive constraint: do not copy source text verbatim; provide Russian semantic adaptation aligned to original section intent.
