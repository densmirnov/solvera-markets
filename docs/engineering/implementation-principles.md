---
title: "Implementation principles"
description: "Documentation for Implementation principles."
---

# Implementation principles

## Error minimization
- Prefer deterministic dependencies and lockfiles.
- Avoid hidden state and implicit side effects.
- Keep behaviors deterministic and explicitly validated.

## Linting and formatting
- Linting and auto-formatting are mandatory for all code.
- Strict modes are enabled by default.
- Rule exceptions require documentation.

## Safety
- Validate all inputs at boundaries.
- Fail fast on invariants.
- Keep external calls minimal and auditable.
