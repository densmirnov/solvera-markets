---
id: "202602040437-24KDFM"
title: "Fix frontend hook lint warnings"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["rg \"useEffect\" frontend/src/pages/monitor-*.tsx"]
commit: { hash: "7becc0a03b4080cc26c4eaee816ff846b26bf0be", message: "🧹 24KDFM fix react-hooks deps" }
comments:
  - { author: "CODER", body: "Start: fix react-hooks dependency warnings in monitor pages." }
  - { author: "CODER", body: "Verified: monitor pages use stable callbacks and satisfy react-hooks deps." }
doc_version: 2
doc_updated_at: "2026-02-04T04:39:16.843Z"
doc_updated_by: "CODER"
description: "Adjust monitor pages to satisfy react-hooks exhaustive-deps warnings."
id_source: "generated"
---
## Summary

Resolve react-hooks dependency warnings in monitor pages.

## Scope

Refactor monitor pages to use stable callbacks or dependencies in useEffect.

## Risks

Incorrect dependencies could cause extra fetches; ensure behavior stays the same.

## Verify Steps

1) npm --prefix frontend run lint\n2) git status --short --untracked-files=no

## Rollback Plan

Revert monitor page changes if they introduce regressions.
