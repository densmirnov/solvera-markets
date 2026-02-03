#!/usr/bin/env sh
set -eu

missing=0

check_dir() {
  if [ ! -d "$1" ]; then
    echo "missing dir: $1"
    missing=1
  fi
}

check_file() {
  if [ ! -f "$1" ]; then
    echo "missing file: $1"
    missing=1
  fi
}

check_dir contracts
check_dir indexer
check_dir backend
check_dir frontend
check_dir scripts
check_dir tests
check_dir docs

check_file docs/README.md
check_file ROADMAP.md
check_file CONTRIBUTING.md

if [ $missing -ne 0 ]; then
  echo "structure validation failed"
  exit 1
fi

echo "structure validation ok"
