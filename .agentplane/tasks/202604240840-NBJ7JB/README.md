---
id: "202604240840-NBJ7JB"
title: "Wire Brevo waitlist form into production deploy"
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
  updated_at: "2026-04-24T08:42:12.364Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T08:43:41.084Z"
  updated_by: "CODER"
  note: "Validated the frontend deploy wiring for the live Brevo waitlist endpoint with eslint, a production build using the real Brevo URL, and a scoped diff over the deploy surface."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: wire the live Brevo waitlist endpoint through the approved frontend build and deployment surface, verify the production build locally, and attempt deployment only through the existing repository path."
events:
  -
    type: "status"
    at: "2026-04-24T08:42:21.983Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wire the live Brevo waitlist endpoint through the approved frontend build and deployment surface, verify the production build locally, and attempt deployment only through the existing repository path."
  -
    type: "verify"
    at: "2026-04-24T08:43:41.084Z"
    author: "CODER"
    state: "ok"
    note: "Validated the frontend deploy wiring for the live Brevo waitlist endpoint with eslint, a production build using the real Brevo URL, and a scoped diff over the deploy surface."
doc_version: 3
doc_updated_at: "2026-04-24T08:43:41.088Z"
doc_updated_by: "CODER"
description: "Add the real Brevo waitlist endpoint to the frontend deployment pipeline, update build-time env wiring, verify local production build with the live endpoint, and prepare or execute deployment through the repository's Dokploy/GitHub path."
sections:
  Summary: "Wire the live Brevo waitlist form into the production frontend build and deploy the updated homepage if the repository's deployment path is reachable from this environment."
  Scope: |-
    - In scope: Add the real Brevo waitlist endpoint to the frontend deployment pipeline, update build-time env wiring, verify local production build with the live endpoint, and prepare or execute deployment through the repository's Dokploy/GitHub path.
    - Out of scope: unrelated refactors not required for "Wire Brevo waitlist form into production deploy".
  Plan: |-
    1. Implement the change for "Wire Brevo waitlist form into production deploy".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - The deploy path may depend on external Dokploy or GitHub credentials that are not available in this shell.
    - Brevo embed specifics may require additional hidden fields beyond the simple action URL wiring.
    - Production and local env sources may diverge if deployment variables are managed outside the repository.
  Verify Steps: |-
    - Run: npm --prefix frontend run lint
    - Run: VITE_WAITLIST_FORM_URL=<brevo-url> VITE_WAITLIST_EMAIL_FIELD=EMAIL npm --prefix frontend run build
    - Run: git diff -- docker-compose.yml frontend/Dockerfile frontend/src/pages/Home.tsx env.example
  Verification: |-
    Pending implementation and deployment verification.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T08:43:41.084Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the frontend deploy wiring for the live Brevo waitlist endpoint with eslint, a production build using the real Brevo URL, and a scoped diff over the deploy surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:42:21.989Z, excerpt_hash=sha256:1c4f246b12179020548ea88b5b01ca8607cf4b9112a0eee07877baea9afdb2a2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the deploy-surface env wiring and frontend waitlist integration changes, then rebuild the frontend to restore the previous production artifact inputs."
  Findings: ""
id_source: "generated"
---
## Summary

Wire the live Brevo waitlist form into the production frontend build and deploy the updated homepage if the repository's deployment path is reachable from this environment.

## Scope

- In scope: Add the real Brevo waitlist endpoint to the frontend deployment pipeline, update build-time env wiring, verify local production build with the live endpoint, and prepare or execute deployment through the repository's Dokploy/GitHub path.
- Out of scope: unrelated refactors not required for "Wire Brevo waitlist form into production deploy".

## Plan

1. Implement the change for "Wire Brevo waitlist form into production deploy".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- The deploy path may depend on external Dokploy or GitHub credentials that are not available in this shell.
- Brevo embed specifics may require additional hidden fields beyond the simple action URL wiring.
- Production and local env sources may diverge if deployment variables are managed outside the repository.

## Verify Steps

- Run: npm --prefix frontend run lint
- Run: VITE_WAITLIST_FORM_URL=<brevo-url> VITE_WAITLIST_EMAIL_FIELD=EMAIL npm --prefix frontend run build
- Run: git diff -- docker-compose.yml frontend/Dockerfile frontend/src/pages/Home.tsx env.example

## Verification

Pending implementation and deployment verification.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T08:43:41.084Z — VERIFY — ok

By: CODER

Note: Validated the frontend deploy wiring for the live Brevo waitlist endpoint with eslint, a production build using the real Brevo URL, and a scoped diff over the deploy surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:42:21.989Z, excerpt_hash=sha256:1c4f246b12179020548ea88b5b01ca8607cf4b9112a0eee07877baea9afdb2a2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the deploy-surface env wiring and frontend waitlist integration changes, then rebuild the frontend to restore the previous production artifact inputs.

## Findings
