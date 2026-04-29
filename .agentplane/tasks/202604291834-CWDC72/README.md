---
id: "202604291834-CWDC72"
title: "Apply DESIGN.md visual refresh to site"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T18:34:51.425Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T18:40:48.653Z"
  updated_by: "CODER"
  note: "Verified: DESIGN.md visual refresh applied to the Solvera homepage and shared styling. agentplane task verify-show, frontend lint, frontend production build, Playwright desktop/mobile preview smoke, and git diff whitespace check all passed; favicon.ico 404 remains an unrelated non-blocking preview observation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved DESIGN.md visual refresh on the Solvera frontend homepage and shared styling, preserving product identity and avoiding new runtime dependencies unless re-approved."
events:
  -
    type: "status"
    at: "2026-04-29T18:34:56.313Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved DESIGN.md visual refresh on the Solvera frontend homepage and shared styling, preserving product identity and avoiding new runtime dependencies unless re-approved."
  -
    type: "verify"
    at: "2026-04-29T18:40:48.653Z"
    author: "CODER"
    state: "ok"
    note: "Verified: DESIGN.md visual refresh applied to the Solvera homepage and shared styling. agentplane task verify-show, frontend lint, frontend production build, Playwright desktop/mobile preview smoke, and git diff whitespace check all passed; favicon.ico 404 remains an unrelated non-blocking preview observation."
doc_version: 3
doc_updated_at: "2026-04-29T18:40:48.659Z"
doc_updated_by: "CODER"
description: "Update the Solvera frontend to reflect the current root DESIGN.md: warm bounded glass system, square controls, dot-matrix hero atmosphere, and matching homepage surfaces while preserving Solvera product content."
sections:
  Summary: |-
    Apply DESIGN.md visual refresh to site
    
    Update the Solvera frontend to reflect the current root DESIGN.md: warm bounded glass system, square controls, dot-matrix hero atmosphere, and matching homepage surfaces while preserving Solvera product content.
  Scope: |-
    - In scope: Update the Solvera frontend to reflect the current root DESIGN.md: warm bounded glass system, square controls, dot-matrix hero atmosphere, and matching homepage surfaces while preserving Solvera product content.
    - Out of scope: unrelated refactors not required for "Apply DESIGN.md visual refresh to site".
  Plan: |-
    1. Translate the current root DESIGN.md into frontend tokens: warm #FFF7ED background, #4B5563/#111827 text, #1C1C1E primary action, 0px radii, glass border shells, bounded flex composition.
    2. Refresh the homepage hero, waitlist, and role sections while preserving Solvera copy, routes, and waitlist behavior.
    3. Add a CSS/DOM dot-matrix hero atmosphere with reduced-motion safety instead of introducing ThreeJS without separate approval.
    4. Run task verify-show, frontend lint, and frontend build; record verification evidence.
  Risks: |-
    - DESIGN.md appears copied from an Auralis login-section source; implementation will use its visual tokens and interaction model, not its product identity or auth/login content.
    - WebGL/ThreeJS is requested in the design source, but adding a new runtime dependency would widen scope; this task uses a CSS/DOM dot-matrix fallback unless re-approved.
    - Homepage visual refresh can affect perceived brand continuity with marketplace HUD screens; verification will cover build/lint, not full visual regression.
  Verify Steps: |-
    1. agentplane task verify-show 202604291834-CWDC72. Expected: declared verification contract is visible before final verification.
    2. npm run lint --prefix frontend. Expected: ESLint exits 0.
    3. npm run build --prefix frontend. Expected: Vite production build exits 0.
    4. Review final git diff against scope. Expected: only intentional frontend/task artifacts plus the user-provided DESIGN.md remain changed.
  Verification: |-
    - Command: agentplane task verify-show 202604291834-CWDC72
      Result: pass
      Evidence: verify contract printed the expected four steps.
      Scope: AgentPlane task acceptance contract.
    - Command: npm run lint --prefix frontend
      Result: pass
      Evidence: ESLint exited 0.
      Scope: frontend TypeScript/React lint rules.
    - Command: npm run build --prefix frontend
      Result: pass
      Evidence: Vite built 210 modules and emitted dist assets; existing chunk-size warning remains non-blocking.
      Scope: frontend production build.
    - Command: Playwright preview smoke at 1440x1000 and 390x844
      Result: pass
      Evidence: home page loaded, hero/waitlist/role sections were present at desktop and mobile widths.
      Scope: browser load smoke for the refreshed homepage.
    - Command: git diff --check -- frontend/src/pages/Home.tsx frontend/src/index.css
      Result: pass
      Evidence: no whitespace errors.
      Scope: touched frontend source files.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T18:40:48.653Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: DESIGN.md visual refresh applied to the Solvera homepage and shared styling. agentplane task verify-show, frontend lint, frontend production build, Playwright desktop/mobile preview smoke, and git diff whitespace check all passed; favicon.ico 404 remains an unrelated non-blocking preview observation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:40:43.845Z, excerpt_hash=sha256:44fa37c46db4b47ddca45d3d87dd7909d26dd000c6c7d3b649b36d4daa15f36c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Apply DESIGN.md visual refresh to site

Update the Solvera frontend to reflect the current root DESIGN.md: warm bounded glass system, square controls, dot-matrix hero atmosphere, and matching homepage surfaces while preserving Solvera product content.

## Scope

- In scope: Update the Solvera frontend to reflect the current root DESIGN.md: warm bounded glass system, square controls, dot-matrix hero atmosphere, and matching homepage surfaces while preserving Solvera product content.
- Out of scope: unrelated refactors not required for "Apply DESIGN.md visual refresh to site".

## Plan

1. Translate the current root DESIGN.md into frontend tokens: warm #FFF7ED background, #4B5563/#111827 text, #1C1C1E primary action, 0px radii, glass border shells, bounded flex composition.
2. Refresh the homepage hero, waitlist, and role sections while preserving Solvera copy, routes, and waitlist behavior.
3. Add a CSS/DOM dot-matrix hero atmosphere with reduced-motion safety instead of introducing ThreeJS without separate approval.
4. Run task verify-show, frontend lint, and frontend build; record verification evidence.

## Risks

- DESIGN.md appears copied from an Auralis login-section source; implementation will use its visual tokens and interaction model, not its product identity or auth/login content.
- WebGL/ThreeJS is requested in the design source, but adding a new runtime dependency would widen scope; this task uses a CSS/DOM dot-matrix fallback unless re-approved.
- Homepage visual refresh can affect perceived brand continuity with marketplace HUD screens; verification will cover build/lint, not full visual regression.

## Verify Steps

1. agentplane task verify-show 202604291834-CWDC72. Expected: declared verification contract is visible before final verification.
2. npm run lint --prefix frontend. Expected: ESLint exits 0.
3. npm run build --prefix frontend. Expected: Vite production build exits 0.
4. Review final git diff against scope. Expected: only intentional frontend/task artifacts plus the user-provided DESIGN.md remain changed.

## Verification

- Command: agentplane task verify-show 202604291834-CWDC72
  Result: pass
  Evidence: verify contract printed the expected four steps.
  Scope: AgentPlane task acceptance contract.
- Command: npm run lint --prefix frontend
  Result: pass
  Evidence: ESLint exited 0.
  Scope: frontend TypeScript/React lint rules.
- Command: npm run build --prefix frontend
  Result: pass
  Evidence: Vite built 210 modules and emitted dist assets; existing chunk-size warning remains non-blocking.
  Scope: frontend production build.
- Command: Playwright preview smoke at 1440x1000 and 390x844
  Result: pass
  Evidence: home page loaded, hero/waitlist/role sections were present at desktop and mobile widths.
  Scope: browser load smoke for the refreshed homepage.
- Command: git diff --check -- frontend/src/pages/Home.tsx frontend/src/index.css
  Result: pass
  Evidence: no whitespace errors.
  Scope: touched frontend source files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T18:40:48.653Z — VERIFY — ok

By: CODER

Note: Verified: DESIGN.md visual refresh applied to the Solvera homepage and shared styling. agentplane task verify-show, frontend lint, frontend production build, Playwright desktop/mobile preview smoke, and git diff whitespace check all passed; favicon.ico 404 remains an unrelated non-blocking preview observation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:40:43.845Z, excerpt_hash=sha256:44fa37c46db4b47ddca45d3d87dd7909d26dd000c6c7d3b649b36d4daa15f36c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
