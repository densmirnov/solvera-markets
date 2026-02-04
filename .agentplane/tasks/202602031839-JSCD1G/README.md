---
id: "202602031839-JSCD1G"
title: "Ignore _in and remove mentions"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["backend"]
verify: ["rg \"_in\""]
commit: { hash: "3208ea3d92f7eda97b8f77cc5d52a938f05d6811", message: "🧹 JSCD1G ignore _in and remove doc mentions" }
comments:
  - { author: "DOCS", body: "Start: add _in to gitignore and purge references to the input folder from docs." }
  - { author: "DOCS", body: "Verified: _in is now ignored and removed from docs/README; rg shows no _in references in docs." }
doc_version: 2
doc_updated_at: "2026-02-03T18:41:06.979Z"
doc_updated_by: "DOCS"
description: "Add _in/ to .gitignore and remove references to the _in folder from repo text."
id_source: "generated"
---
## Summary

Ignore the _in folder and remove references to it from repository text.

## Scope

Update .gitignore to include _in/ and remove textual references to _in from docs or readmes.

## Risks

Removing references may obscure internal doc inputs if still needed; ensure no workflow depends on _in.

## Verify Steps

1) rg "_in"\n2) git status --short --untracked-files=no

## Rollback Plan

Remove _in/ from .gitignore and restore any required references if needed.
