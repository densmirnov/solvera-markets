---
id: "202602071104-DCMHP3"
title: "Geist as primary font + pixel HUD statuses"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "1"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T11:05:25.558Z"
  updated_by: "densmirnov"
  note: "Approved in chat on 2026-02-07: apply Geist fonts + pixel status/HUD everywhere status/health/online appears."
verification:
  state: "ok"
  updated_at: "2026-02-07T11:16:55.222Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran make check (fmt/lint/tests/coverage/audit) and frontend build; verified pixel status chips render for intent state and NET/API online HUD appears in header."
commit:
  hash: "dce42f7b8ca836671bf65d66fbca5bfdc4b1cfc5"
  message: "✨ DCMHP3 frontend: switch to Geist + pixel HUD statuses"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: install Geist (sans/mono/pixel), make it default typography, and add pixel status/HUD across all status/health/online surfaces."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Geist is now the default font (sans/mono/pixel). Pixel status chips replace intent state badges and a NET/API HUD strip is shown globally; make check and frontend build/test/lint passed."
events:
  -
    type: "status"
    at: "2026-02-07T11:05:32.895Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: install Geist (sans/mono/pixel), make it default typography, and add pixel status/HUD across all status/health/online surfaces."
  -
    type: "verify"
    at: "2026-02-07T11:16:55.222Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Ran make check (fmt/lint/tests/coverage/audit) and frontend build; verified pixel status chips render for intent state and NET/API online HUD appears in header."
  -
    type: "status"
    at: "2026-02-07T11:17:04.388Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Geist is now the default font (sans/mono/pixel). Pixel status chips replace intent state badges and a NET/API HUD strip is shown globally; make check and frontend build/test/lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T11:17:04.388Z"
doc_updated_by: "ORCHESTRATOR"
description: "Install Vercel Geist (sans/mono/pixel) and make it the default site type system. Add pixel-style status/health/online chips and a small Watch Dogs-inspired HUD layer for those indicators (CSS-only, no copied assets). Update all UI surfaces where status/health/online appears."
id_source: "generated"
---
## Summary

Install Geist (sans/mono/pixel) and make it the primary type system for the site. Add pixel-style status/health/online indicators with a Watch Dogs-inspired HUD treatment (CSS-only).

## Scope

- Frontend only: install the `geist` package in `frontend/`.
- Wire Geist Sans as default (body), Geist Mono for code/numbers, Geist Pixel for HUD/status components.
- Update existing status/health/online UI surfaces to use the pixel status component(s).
- Add minimal HUD visuals (scanlines/glitch/pixel borders) without copying any Watch Dogs assets.

## Risks

- Visual regressions due to global font switch (layout reflow).
- Over-stylized effects (glitch/scanlines) harming readability/accessibility.
- Performance risk if effects are overused; mitigate by confining to HUD/status surfaces and using lightweight CSS.

## Verify Steps

1. Run the repo verify flow (e.g. `make check`) or the task's configured verify profile (`verify: 1`).
2. Frontend: `npm --prefix frontend run build`, `npm --prefix frontend run lint`, `npm --prefix frontend test`.
3. Manual smoke test: home + marketplace list + marketplace detail; confirm status/health/online indicators render in pixel style and remain readable.

## Rollback Plan

Revert the implementation commit for this task. If partial rollback is needed: remove Geist font wiring (CSS variables + font-face) and restore previous font tokens; remove pixel HUD/status components and revert their call sites.

## Context

Request: switch the website to Vercel Geist (npm package 'geist') as the default font. Use sans + mono + pixel variants. Apply pixel-style status chips and small HUD elements wherever status/health/online appears.

## Plan

1. Inspect current frontend typography wiring (Tailwind v4 CSS-first config + global CSS).
2. Install `geist` in `frontend/` and wire Geist Sans/Mono/Pixel via `@font-face` + CSS variables.
3. Add HUD primitives (pixel chip, scanlines, minimal glitch on hover).
4. Replace existing status badges with `PixelStatusChip` and add NET/API online indicators.
5. Verify build/lint/tests + quick manual smoke test.
6. Commit with tight allowlist (exclude unrelated files like `PITCH.md`).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T11:16:55.222Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran make check (fmt/lint/tests/coverage/audit) and frontend build; verified pixel status chips render for intent state and NET/API online HUD appears in header.

<!-- END VERIFICATION RESULTS -->
