#!/usr/bin/env sh
set -eu

run_if_exists() {
  if [ -f "$1" ]; then
    shift
    echo "running: $*"
    "$@"
  fi
}

# contracts
run_if_exists contracts/foundry.toml forge lint --root contracts
run_if_exists contracts/hardhat.config.js npx hardhat lint
run_if_exists contracts/hardhat.config.ts npx hardhat lint

# backend/indexer/frontend (node)
run_if_exists backend/package.json npm --prefix backend run lint
run_if_exists indexer/package.json npm --prefix indexer run lint
run_if_exists frontend/package.json npm --prefix frontend run lint

# python
run_if_exists backend/pyproject.toml python -m ruff check backend
run_if_exists indexer/pyproject.toml python -m ruff check indexer

# go
run_if_exists backend/go.mod golangci-lint run backend/...
run_if_exists indexer/go.mod golangci-lint run indexer/...

# rust
run_if_exists backend/Cargo.toml cargo clippy --manifest-path backend/Cargo.toml -D warnings
run_if_exists indexer/Cargo.toml cargo clippy --manifest-path indexer/Cargo.toml -D warnings

# docs
if command -v markdownlint >/dev/null 2>&1; then
  echo "running: markdownlint docs"
  markdownlint docs
fi

echo "lint done"
