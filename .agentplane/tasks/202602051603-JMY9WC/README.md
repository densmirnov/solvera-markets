---
id: "202602051603-JMY9WC"
title: "Fix frontend docker build with ethers"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "frontend"
verify:
  - "manual:docker-compose"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:30:45.391Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: ethers dependency present in frontend/package.json and ens helper imports ethers."
commit:
  hash: "91467f18fc6aa2dc6d8dbdf8db6587cc6b5fb4a6"
  message: "✨ JMY9WC add ethers to frontend"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add ethers to frontend deps to fix Docker build, validate compose up."
  -
    author: "ORCHESTRATOR"
    body: "Verified: frontend includes ethers dependency to support ENS and Docker build."
events:
  -
    type: "verify"
    at: "2026-02-07T08:30:45.391Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: ethers dependency present in frontend/package.json and ens helper imports ethers."
  -
    type: "status"
    at: "2026-02-07T08:30:55.804Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: frontend includes ethers dependency to support ENS and Docker build."
doc_version: 2
doc_updated_at: "2026-02-07T08:30:55.804Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add ethers dependency to frontend to fix Docker build failure after ENS integration."
id_source: "generated"
---
## Summary

Added ethers to frontend dependencies so Docker builds succeed after ENS integration.

## Scope

Update frontend/package.json and frontend/package-lock.json with ethers dependency.

## Risks

Minimal: adds ethers to frontend bundle, increasing JS size slightly.

## Verify Steps

manual: docker compose up -d --build completes and frontend build succeeds.

## Rollback Plan

Remove ethers from frontend dependencies and revert lockfile, then adjust ENS integration to avoid ethers import.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:30:45.391Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: ethers dependency present in frontend/package.json and ens helper imports ethers.

<!-- END VERIFICATION RESULTS -->
