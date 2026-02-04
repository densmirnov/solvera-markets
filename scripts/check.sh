#!/usr/bin/env sh
set -eu

./scripts/validate-structure.sh
./scripts/fmt.sh
./scripts/lint.sh
./scripts/test.sh
./scripts/audit.sh
