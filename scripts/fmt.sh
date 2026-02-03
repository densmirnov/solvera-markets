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
run_if_exists contracts/foundry.toml forge fmt
run_if_exists contracts/hardhat.config.js npx hardhat fmt
run_if_exists contracts/hardhat.config.ts npx hardhat fmt

# backend/indexer/frontend (node)
run_if_exists backend/package.json npm --prefix backend run fmt
run_if_exists indexer/package.json npm --prefix indexer run fmt
run_if_exists frontend/package.json npm --prefix frontend run fmt

# python
run_if_exists backend/pyproject.toml python -m ruff format backend
run_if_exists indexer/pyproject.toml python -m ruff format indexer

# go
run_if_exists backend/go.mod gofmt -w backend
run_if_exists indexer/go.mod gofmt -w indexer

# rust
run_if_exists backend/Cargo.toml cargo fmt --manifest-path backend/Cargo.toml
run_if_exists indexer/Cargo.toml cargo fmt --manifest-path indexer/Cargo.toml

# docs
if command -v markdownlint >/dev/null 2>&1; then
  echo "running: markdownlint docs"
  markdownlint docs
fi

echo "fmt done"
