# CONTRIBUTING

## Mandatory rules
1. Any code change must be reflected in documentation.
2. Any new or modified code must be covered by tests to minimize errors.
3. All code must pass linters and auto-formatters before commit.
4. All changes must pass local checks before PR or release.

## Project structure
- `contracts/` — smart contracts and tests.
- `indexer/` — event indexer.
- `backend/` — API layer.
- `frontend/` — operator UI.
- `docs/` — project documentation.
- `scripts/` — utilities and checks.
- `tests/` — cross-project tests.

## Change process
1. Update code and tests.
2. Update relevant docs in `docs/`.
3. Run `make check`.
4. Submit changes in a PR.
