---
title: "Repository structure and checks"
description: "High-level repository layout and the standard verification entrypoint (make check)."
sidebarTitle: "Repo structure"
---

# Repository structure and checks

## Structure
- `contracts/` — smart contracts and tests.
- `indexer/` — event indexer.
- `backend/` — API layer.
- `frontend/` — operator UI.
- `docs/` — project documentation.
- `scripts/` — utilities and checks.
- `tests/` — cross-project tests.

## Checks
- `make check` runs structural validation plus fmt/lint/test/coverage/audit.
- Scripts run relevant tools when configuration exists.
