---
id: "202602180957-WPT28J"
title: "Refine simpleclaw domains, contacts, and registration form redesign"
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
  updated_at: "2026-02-18T09:58:06.317Z"
  updated_by: "ORCHESTRATOR"
  note: "Revision plan approved."
verification:
  state: "ok"
  updated_at: "2026-02-18T10:24:35.510Z"
  updated_by: "CODER"
  note: "Verified: added inline SVG icons for Card and SBP payment pills; layout and interaction preserved; static preview server listens on :4173."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: apply user-requested rollback revisions (domain/contact replacement and Solvera redesign of registration form based on app.simpleclaw.ru) within simpleclaw static site."
events:
  -
    type: "status"
    at: "2026-02-18T09:58:13.536Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: apply user-requested rollback revisions (domain/contact replacement and Solvera redesign of registration form based on app.simpleclaw.ru) within simpleclaw static site."
  -
    type: "verify"
    at: "2026-02-18T10:00:46.848Z"
    author: "CODER"
    state: "ok"
    note: "Verified: replaced domain/email/contact references as requested, redesigned setup form using app.simpleclaw.ru onboarding structure in Solvera style, moved login CTA to bottom, and confirmed static preview server on :4173."
  -
    type: "verify"
    at: "2026-02-18T10:07:41.040Z"
    author: "CODER"
    state: "ok"
    note: "Verified: footer link changed to t.me/@openclawru; form restyled in Solvera visual language with highlighted steps block, large top tabs, and bottom login CTA; static preview server confirmed on :4173."
  -
    type: "verify"
    at: "2026-02-18T10:21:26.021Z"
    author: "CODER"
    state: "ok"
    note: "Verified: moved Быстрый старт/Войти tabs above the entire form block, removed steps text background card, made steps text accent-only, and kept onboarding/login structure intact; static preview server listens on :4173."
  -
    type: "verify"
    at: "2026-02-18T10:24:35.510Z"
    author: "CODER"
    state: "ok"
    note: "Verified: added inline SVG icons for Card and SBP payment pills; layout and interaction preserved; static preview server listens on :4173."
doc_version: 3
doc_updated_at: "2026-02-18T10:24:35.512Z"
doc_updated_by: "CODER"
description: "Apply domain/contact replacements to simpleclaw.ru and redesign registration form block based on app.simpleclaw.ru in Solvera style, including moving login button to bottom."
sections:
  Summary: "Refine the existing `simpleclaw/` static site with updated Russian-market domain/contact data and redesign the registration/setup form according to app.simpleclaw.ru interaction structure in Solvera style."
  Scope: |-
    In scope:
    - `simpleclaw/index.html`
    - `simpleclaw/styles.css`
    - `simpleclaw/script.js`
    - task docs for this task
    
    Out of scope:
    - backend/API implementation
    - deployment changes
  Plan: |-
    1. Roll back unintended auto-generated metadata commit.
    2. Analyze `app.simpleclaw.ru` registration form structure and required UI states.
    3. Update domain/email/contact references to `simpleclaw.ru` and `helpme@simpleclaw.ru`.
    4. Redesign setup/registration form block in Solvera style, placing login button at the bottom.
    5. Run verification checks and finalize task.
  Risks: |-
    - Risk: dynamic registration behavior on app.simpleclaw.ru cannot be fully replicated in static mode.
      Mitigation: replicate layout hierarchy and interaction affordances with static controls.
    - Risk: inconsistent domain/email mentions.
      Mitigation: grep replacement checks for `simpleclaw.com` and old support email.
  Verify Steps: |-
    1. `rg -n "simpleclaw\\.com|support@simpleclaw\\.com" simpleclaw/index.html simpleclaw/styles.css simpleclaw/script.js`
       Pass: no matches.
    2. `rg -n "simpleclaw\\.ru|helpme@simpleclaw\\.ru|t\\.me/@@openclawru" simpleclaw/index.html`
       Pass: required replacements found.
    3. `rg -n "google-btn|auth-group|setup-group|option-row|card-frame" simpleclaw/index.html simpleclaw/styles.css`
       Pass: redesigned registration/setup form structure and styles present.
    4. `python3 -m http.server 4173 --directory simpleclaw >/tmp/simpleclaw_preview.log 2>&1 & SERVER_PID=$!; sleep 1; lsof -i :4173 | rg LISTEN; kill $SERVER_PID; wait $SERVER_PID 2>/dev/null || true`
       Pass: local static server starts and listens.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-02-18T10:00:46.848Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: replaced domain/email/contact references as requested, redesigned setup form using app.simpleclaw.ru onboarding structure in Solvera style, moved login CTA to bottom, and confirmed static preview server on :4173.
    
    VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:00:42.082Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d
    
    #### 2026-02-18T10:07:41.040Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: footer link changed to t.me/@openclawru; form restyled in Solvera visual language with highlighted steps block, large top tabs, and bottom login CTA; static preview server confirmed on :4173.
    
    VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:07:32.621Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d
    
    #### 2026-02-18T10:21:26.021Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: moved Быстрый старт/Войти tabs above the entire form block, removed steps text background card, made steps text accent-only, and kept onboarding/login structure intact; static preview server listens on :4173.
    
    VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:07:41.041Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d
    
    #### 2026-02-18T10:24:35.510Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: added inline SVG icons for Card and SBP payment pills; layout and interaction preserved; static preview server listens on :4173.
    
    VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:21:26.023Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert this task commit to restore previous `simpleclaw/` state."
  Findings: |-
    ### Approvals / Overrides
    - User requested additional visual revision pass: strict Solvera design language for the registration form, highlighted instruction block, and larger tabs above the full form.
    
    ### Decisions
    - Kept static architecture and onboarding logic from `app.simpleclaw.ru`.
    - Converted form container to the same light Solvera visual language as the page (soft gradients, orange/blue accents, glassy borders, subtle depth).
    - Made `Быстрый старт` / `Войти` large full-width tabs above the complete login form.
    - Highlighted the instruction sentence block with accent border and background emphasis.
    - Updated footer contact to `https://t.me/@openclawru`.
    
    ### Implementation Notes
    - Updated `simpleclaw/index.html` with highlighted steps block, large tab controls, and corrected Telegram footer link.
    - Updated `simpleclaw/styles.css` with Solvera-styled form redesign, large tab styling, and stronger visual hierarchy.
    - Updated `simpleclaw/script.js` to bind interactions to `.mode-tab` controls.
    
    ### Evidence / Links
    - Verified no stale `@@openclawru` link and no old support domain/email occurrences.
    - Verified local static server starts and listens on `:4173`.
  Context: "Follow-up changes requested by user after rollback of unintended metadata commit. Scope remains within `simpleclaw/**` and task artifacts."
id_source: "generated"
---
## Summary

Refine the existing `simpleclaw/` static site with updated Russian-market domain/contact data and redesign the registration/setup form according to app.simpleclaw.ru interaction structure in Solvera style.

## Scope

In scope:
- `simpleclaw/index.html`
- `simpleclaw/styles.css`
- `simpleclaw/script.js`
- task docs for this task

Out of scope:
- backend/API implementation
- deployment changes

## Plan

1. Roll back unintended auto-generated metadata commit.
2. Analyze `app.simpleclaw.ru` registration form structure and required UI states.
3. Update domain/email/contact references to `simpleclaw.ru` and `helpme@simpleclaw.ru`.
4. Redesign setup/registration form block in Solvera style, placing login button at the bottom.
5. Run verification checks and finalize task.

## Risks

- Risk: dynamic registration behavior on app.simpleclaw.ru cannot be fully replicated in static mode.
  Mitigation: replicate layout hierarchy and interaction affordances with static controls.
- Risk: inconsistent domain/email mentions.
  Mitigation: grep replacement checks for `simpleclaw.com` and old support email.

## Verify Steps

1. `rg -n "simpleclaw\\.com|support@simpleclaw\\.com" simpleclaw/index.html simpleclaw/styles.css simpleclaw/script.js`
   Pass: no matches.
2. `rg -n "simpleclaw\\.ru|helpme@simpleclaw\\.ru|t\\.me/@@openclawru" simpleclaw/index.html`
   Pass: required replacements found.
3. `rg -n "google-btn|auth-group|setup-group|option-row|card-frame" simpleclaw/index.html simpleclaw/styles.css`
   Pass: redesigned registration/setup form structure and styles present.
4. `python3 -m http.server 4173 --directory simpleclaw >/tmp/simpleclaw_preview.log 2>&1 & SERVER_PID=$!; sleep 1; lsof -i :4173 | rg LISTEN; kill $SERVER_PID; wait $SERVER_PID 2>/dev/null || true`
   Pass: local static server starts and listens.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-18T10:00:46.848Z — VERIFY — ok

By: CODER

Note: Verified: replaced domain/email/contact references as requested, redesigned setup form using app.simpleclaw.ru onboarding structure in Solvera style, moved login CTA to bottom, and confirmed static preview server on :4173.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:00:42.082Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d

#### 2026-02-18T10:07:41.040Z — VERIFY — ok

By: CODER

Note: Verified: footer link changed to t.me/@openclawru; form restyled in Solvera visual language with highlighted steps block, large top tabs, and bottom login CTA; static preview server confirmed on :4173.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:07:32.621Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d

#### 2026-02-18T10:21:26.021Z — VERIFY — ok

By: CODER

Note: Verified: moved Быстрый старт/Войти tabs above the entire form block, removed steps text background card, made steps text accent-only, and kept onboarding/login structure intact; static preview server listens on :4173.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:07:41.041Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d

#### 2026-02-18T10:24:35.510Z — VERIFY — ok

By: CODER

Note: Verified: added inline SVG icons for Card and SBP payment pills; layout and interaction preserved; static preview server listens on :4173.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:21:26.023Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit to restore previous `simpleclaw/` state.

## Findings

### Approvals / Overrides
- User requested additional visual revision pass: strict Solvera design language for the registration form, highlighted instruction block, and larger tabs above the full form.

### Decisions
- Kept static architecture and onboarding logic from `app.simpleclaw.ru`.
- Converted form container to the same light Solvera visual language as the page (soft gradients, orange/blue accents, glassy borders, subtle depth).
- Made `Быстрый старт` / `Войти` large full-width tabs above the complete login form.
- Highlighted the instruction sentence block with accent border and background emphasis.
- Updated footer contact to `https://t.me/@openclawru`.

### Implementation Notes
- Updated `simpleclaw/index.html` with highlighted steps block, large tab controls, and corrected Telegram footer link.
- Updated `simpleclaw/styles.css` with Solvera-styled form redesign, large tab styling, and stronger visual hierarchy.
- Updated `simpleclaw/script.js` to bind interactions to `.mode-tab` controls.

### Evidence / Links
- Verified no stale `@@openclawru` link and no old support domain/email occurrences.
- Verified local static server starts and listens on `:4173`.

## Context

Follow-up changes requested by user after rollback of unintended metadata commit. Scope remains within `simpleclaw/**` and task artifacts.
