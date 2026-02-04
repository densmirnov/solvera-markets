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
run_if_exists contracts/foundry.toml forge test --root contracts
run_if_exists contracts/hardhat.config.js npx hardhat test
run_if_exists contracts/hardhat.config.ts npx hardhat test

# backend/indexer/frontend (node)
run_if_exists backend/package.json npm --prefix backend test
run_if_exists indexer/package.json npm --prefix indexer test
run_if_exists frontend/package.json npm --prefix frontend test

# python
run_if_exists backend/pyproject.toml python -m pytest backend
run_if_exists indexer/pyproject.toml python -m pytest indexer

# go
run_if_exists backend/go.mod go test ./backend/...
run_if_exists indexer/go.mod go test ./indexer/...

# rust
run_if_exists backend/Cargo.toml cargo test --manifest-path backend/Cargo.toml
run_if_exists indexer/Cargo.toml cargo test --manifest-path indexer/Cargo.toml

echo "test done"
