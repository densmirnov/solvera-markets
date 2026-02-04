#!/usr/bin/env sh
set -eu

run_if_exists() {
  if [ -f "$1" ]; then
    shift
    echo "running: $*"
    "$@"
  fi
}

# npm audits
run_if_exists backend/package.json npm --prefix backend audit --audit-level=high
run_if_exists frontend/package.json npm --prefix frontend audit --audit-level=high

# indexer has known moderate warnings from transitive gluegun/lodash.trim.
# We enforce high severity only until upstream fixes land.
run_if_exists indexer/package.json npm --prefix indexer audit --audit-level=high

echo "audit done"
