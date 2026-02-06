# Documentation (Mintlify)

This folder contains the Mintlify documentation for Solvera Markets.

## Key files
- `docs.json`: Mintlify configuration and navigation.
- `index.md`: documentation home page.

## Conventions
- Every page must include frontmatter with `title` and `description`.
- Prefer stable, semantic slugs (use folders like `overview/`, `concepts/`, `reference/`).
- Keep pages focused: concepts vs reference vs operations.
- Internal links should use Mintlify paths (for example: `/reference/contracts/contract-spec`).

## Updating navigation
Add new pages to `docs/docs.json` under the appropriate `navigation.groups` entry.

