---
title: "Engineering Standards"
description: "Documentation for Engineering Standards."
---

# Engineering Standards

## Mandatory Requirements
- All code must pass linters and auto-formatters before any commit.
- Any code change must be reflected in documentation.
- Changes must include tests or an explicit, documented reason why tests are not required.

## Linters and Formatters
- Use the safest strict modes by default.
- Formatting is automated and non-optional.
- Disabling rules is forbidden without documented justification.

## Quality Control
- `make check` is the single entrypoint for validation.
- CI must run the same checks as local workflows.
- `make check` includes `npm audit --audit-level=high` for Node workspaces.

## Audit Exceptions
- Indexer dependency tree currently reports moderate `npm audit` warnings via transitive `gluegun` → `lodash.trim`/`lodash.trimend`.
- The exception is limited to **moderate** severity only; high/critical remain blocking.
- Exception must be revisited on every Graph CLI upgrade or when upstream patches land.

## Error Minimization
- Prefer deterministic dependencies (lockfiles).
- Avoid hidden global state and side effects.
- Log recoverable errors in the backend.
