---
id: "202602180957-WPT28J"
title: "Refine simpleclaw domains, contacts, and registration form redesign"
status: "DOING"
priority: "high"
owner: "CODER"
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
  updated_at: "2026-02-18T10:00:46.848Z"
  updated_by: "CODER"
  note: "Verified: replaced domain/email/contact references as requested, redesigned setup form using app.simpleclaw.ru onboarding structure in Solvera style, moved login CTA to bottom, and confirmed static preview server on :4173."
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
doc_version: 2
doc_updated_at: "2026-02-18T10:00:46.850Z"
doc_updated_by: "CODER"
description: "Apply domain/contact replacements to simpleclaw.ru and redesign registration form block based on app.simpleclaw.ru in Solvera style, including moving login button to bottom."
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

## Rollback Plan

Revert this task commit to restore previous `simpleclaw/` state.

## Context

Follow-up changes requested by user after rollback of unintended metadata commit. Scope remains within `simpleclaw/**` and task artifacts.

## Plan

1. Roll back unintended auto-generated metadata commit.
2. Analyze `app.simpleclaw.ru` registration form structure and required UI states.
3. Update domain/email/contact references to `simpleclaw.ru` and `helpme@simpleclaw.ru`.
4. Redesign setup/registration form block in Solvera style, placing login button at the bottom.
5. Run verification checks and finalize task.

## Notes

### Approvals / Overrides
- User requested rollback of the unintended auto-generated metadata commit and provided explicit revision requirements.

### Decisions
- Kept static architecture and reproduced onboarding structure from `app.simpleclaw.ru`: mode switch (`Быстрый старт` / `Войти`), token input, model select, payment method, Telegram login block.
- Placed login CTA at the bottom of the form as requested.
- Replaced all project domain/email mentions to `simpleclaw.ru` / `helpme@simpleclaw.ru` and replaced footer contacts with `https://t.me/@@openclawru`.

### Implementation Notes
- Updated `simpleclaw/index.html` structure of setup block and footer.
- Updated `simpleclaw/styles.css` with form redesign styles in Solvera language.
- Updated `simpleclaw/script.js` for mode switch + selection behavior.

### Evidence / Links
- Verified no `simpleclaw.com` or old support email occurrences in `simpleclaw/**`.
- Verified local static server starts and listens on `:4173`.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-18T10:00:46.848Z — VERIFY — ok

By: CODER

Note: Verified: replaced domain/email/contact references as requested, redesigned setup form using app.simpleclaw.ru onboarding structure in Solvera style, moved login CTA to bottom, and confirmed static preview server on :4173.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-18T10:00:42.082Z, excerpt_hash=sha256:f4afed5b1fe5b87f5962b38679d3f5197d57467579453aa58d6e9640d7f13f8d

<!-- END VERIFICATION RESULTS -->
