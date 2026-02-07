---
id: "202602061434-3JA1QG"
title: "Mintlify docs refactor"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "code"
verify:
  - "make check"
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
  hash: "b5dcc28658348f3f30b6740e8148a634fda33413"
  message: "📝 3JA1QG docs README + make check fixes"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Refactor Mintlify docs structure and formatting with minimal accidental changes."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Mintlify docs are reorganized with updated docs/docs.json nav (see commits 4e70ba6..16b5302). Added docs/README plus frontend eslint ignores + format tests to restore make check; agentplane verify passed. Latest commit: b5dcc2865834."
events: []
doc_version: 2
doc_updated_at: "2026-02-06T15:08:06.141Z"
doc_updated_by: "ORCHESTRATOR"
description: "Refactor Mintlify documentation: restructure IA/nav, normalize frontmatter and page templates, fix internal links, and reduce duplication. Keep changes deterministic and avoid touching agentplane-managed state unless explicitly required."
id_source: "generated"
---
## Summary

Refactor Mintlify documentation for Solvera Markets: introduce clearer information architecture, normalize page frontmatter/templates, and align navigation with content.

## Scope

- docs/docs.json navigation and metadata\n- docs/*.md pages (renames/moves allowed)\n- Internal links between docs pages\n\nOut of scope: contract/backend behavior changes, production deploy, external content.

## Risks

- Broken links/URLs due to renames. Mitigation: update docs/docs.json + search/replace old slugs; keep titles stable.\n- Mintlify schema mismatch. Mitigation: keep docs.json minimal and compatible; avoid unknown fields.\n- Accidental inclusion of agentplane state changes in commits. Mitigation: commit with tight allowlist (docs/ only) unless user requests otherwise.

## Verify Steps

1. make check\n2. Spot-check Mintlify navigation: docs/docs.json groups resolve to existing pages.\n3. rg for old slugs/paths to ensure internal links updated.

## Rollback Plan

Revert the docs refactor commit(s). If needed, restore previous docs/docs.json and page paths from git history.

## Verification

Status: pass
Verified at: 2026-02-06T15:07:46.674Z
Verified sha: b5dcc28658348f3f30b6740e8148a634fda33413

Commands:
- make check

Manual steps:
- make check\n2. Spot-check Mintlify navigation: docs/docs.json groups resolve to existing pages.\n3. rg for old slugs/paths to ensure internal links updated.
