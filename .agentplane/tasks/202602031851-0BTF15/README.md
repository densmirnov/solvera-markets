---
id: "202602031851-0BTF15"
title: "Stage 3.3 API security and limits"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["backend"]
verify: ["rg \"rate limit\" backend"]
commit: { hash: "a38eb0a97ce1cbb8f2d5a21f03ebc1d28673912c", message: "🛡️ 0BTF15 add write auth and rate limiting" }
comments:
  - { author: "CODER", body: "Start: add write-endpoint auth toggle and rate limiting scoped to write routes." }
  - { author: "CODER", body: "Verified: write endpoints now require optional API key and are the only routes subject to rate limits." }
doc_version: 2
doc_updated_at: "2026-02-03T18:57:58.914Z"
doc_updated_by: "CODER"
description: "Add rate limits and optional auth for write endpoints with tests and docs."
id_source: "generated"
---
## Summary

Add rate limits and optional auth for write endpoints with tests and documentation.

## Scope

Implement rate limiting, auth toggles for tx-builder routes, and update docs/tests to cover access control.

## Risks

Overly strict limits can block legitimate agents; tune defaults and make overrides configurable.

## Verify Steps

1) rg "rate limit" backend\n2) backend tests (if present)\n3) git status --short --untracked-files=no

## Rollback Plan

Disable rate limits/auth middleware and restore previous routing if issues occur.
