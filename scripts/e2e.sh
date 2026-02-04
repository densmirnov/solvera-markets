#!/usr/bin/env sh
set -eu

docker compose up -d --build

# simple wait for backend
sleep 5

node scripts/agent-flow.mjs

docker compose down
