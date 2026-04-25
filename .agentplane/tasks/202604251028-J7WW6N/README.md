---
id: "202604251028-J7WW6N"
title: "Accent waitlist subscribe button and redeploy"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T10:29:01.803Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T10:29:44.967Z"
  updated_by: "CODER"
  note: "Validated the accent button treatment on the homepage waitlist CTA with eslint, a production build using the live Brevo URL, and a scoped diff over the homepage UI."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: apply an accent-driven visual treatment to the homepage waitlist subscribe button, verify the frontend build, and repeat the established main-branch deploy plus live probe path."
events:
  -
    type: "status"
    at: "2026-04-25T10:29:09.045Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: apply an accent-driven visual treatment to the homepage waitlist subscribe button, verify the frontend build, and repeat the established main-branch deploy plus live probe path."
  -
    type: "verify"
    at: "2026-04-25T10:29:44.967Z"
    author: "CODER"
    state: "ok"
    note: "Validated the accent button treatment on the homepage waitlist CTA with eslint, a production build using the live Brevo URL, and a scoped diff over the homepage UI."
doc_version: 3
doc_updated_at: "2026-04-25T10:29:44.972Z"
doc_updated_by: "CODER"
description: "Increase the visual salience of the homepage waitlist subscribe button, verify the frontend build, and redeploy through the existing main branch workflow with a live probe."
sections:
  Summary: "Increase the visual prominence of the homepage waitlist subscribe button and redeploy the site through the existing main-branch workflow."
  Scope: |-
    - Make the whitelist submit button visually accent-driven without changing the waitlist form behavior.
    - Limit code changes to homepage/UI styling unless a deploy-surface tweak is strictly required.
    - Re-run frontend verification and redeploy through main.
    - Confirm live status by probing the public site after push.
  Plan: |-
    1. Implement the change for "Accent waitlist subscribe button and redeploy".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - A stronger accent could clash with the landing page palette if the treatment is too loud.
    - The public site may again fail to reflect the new push even if local verification passes.
    - Existing deploy automation remains externally controlled, so live rollout can only be confirmed by probing the published artifact.
  Verify Steps: |-
    - Run: npm --prefix frontend run lint
    - Run: VITE_WAITLIST_FORM_URL=<brevo-url> VITE_WAITLIST_EMAIL_FIELD=EMAIL npm --prefix frontend run build
    - Run: git diff -- frontend/src/pages/Home.tsx frontend/src/index.css
    - Probe: curl -I https://solvera.markets
  Verification: |-
    Pending implementation and redeploy verification.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T10:29:44.967Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the accent button treatment on the homepage waitlist CTA with eslint, a production build using the live Brevo URL, and a scoped diff over the homepage UI.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T10:29:09.050Z, excerpt_hash=sha256:527607daf25d308bf44f0c93ddc41043a8d3db7224ebd5fd473e3047db4049c0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the waitlist button style changes, rebuild the frontend, and redeploy the previous visual treatment if the accent degrades the landing page hierarchy."
  Findings: ""
id_source: "generated"
---
## Summary

Increase the visual prominence of the homepage waitlist subscribe button and redeploy the site through the existing main-branch workflow.

## Scope

- Make the whitelist submit button visually accent-driven without changing the waitlist form behavior.
- Limit code changes to homepage/UI styling unless a deploy-surface tweak is strictly required.
- Re-run frontend verification and redeploy through main.
- Confirm live status by probing the public site after push.

## Plan

1. Implement the change for "Accent waitlist subscribe button and redeploy".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- A stronger accent could clash with the landing page palette if the treatment is too loud.
- The public site may again fail to reflect the new push even if local verification passes.
- Existing deploy automation remains externally controlled, so live rollout can only be confirmed by probing the published artifact.

## Verify Steps

- Run: npm --prefix frontend run lint
- Run: VITE_WAITLIST_FORM_URL=<brevo-url> VITE_WAITLIST_EMAIL_FIELD=EMAIL npm --prefix frontend run build
- Run: git diff -- frontend/src/pages/Home.tsx frontend/src/index.css
- Probe: curl -I https://solvera.markets

## Verification

Pending implementation and redeploy verification.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T10:29:44.967Z — VERIFY — ok

By: CODER

Note: Validated the accent button treatment on the homepage waitlist CTA with eslint, a production build using the live Brevo URL, and a scoped diff over the homepage UI.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T10:29:09.050Z, excerpt_hash=sha256:527607daf25d308bf44f0c93ddc41043a8d3db7224ebd5fd473e3047db4049c0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the waitlist button style changes, rebuild the frontend, and redeploy the previous visual treatment if the accent degrades the landing page hierarchy.

## Findings
