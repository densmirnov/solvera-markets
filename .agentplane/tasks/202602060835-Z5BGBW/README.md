---
id: "202602060835-Z5BGBW"
title: "Include public/ in frontend image"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
revision: 1
depends_on: []
tags:
  - "frontend"
verify:
  - "manual:build"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "4769d7f8be032f1320d275fd86f9ad3157c066ab"
  message: "🛠 Z5BGBW include public/ in frontend image"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Add public/ copy to frontend Docker image so static AI artifacts deploy."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Dockerfile now copies public/ so llms.txt, llms-full.txt, sitemap.xml, and base-wallet skill are served by nginx after redeploy."
events: []
doc_version: 3
doc_updated_at: "2026-02-06T08:36:55.882Z"
doc_updated_by: "ORCHESTRATOR"
description: "Ensure frontend Docker build copies public/ so llms.txt, sitemap.xml, and wallet skill are deployed."
sections:
  Summary: "Copy frontend/public into the build image so llms.txt, sitemap.xml, and skill files are served by nginx."
  Scope: "frontend/Dockerfile only."
  Plan: |-
    1. Implement the change for "Include public/ in frontend image".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: "If Dockerfile not used in deployment, change will not take effect."
  Verify Steps: "1) Confirm Dockerfile copies public/. 2) Redeploy and verify llms.txt and sitemap.xml return files."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert frontend/Dockerfile change and redeploy."
  Findings: ""
id_source: "generated"
---
## Summary

Copy frontend/public into the build image so llms.txt, sitemap.xml, and skill files are served by nginx.

## Scope

frontend/Dockerfile only.

## Plan

1. Implement the change for "Include public/ in frontend image".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

If Dockerfile not used in deployment, change will not take effect.

## Verify Steps

1) Confirm Dockerfile copies public/. 2) Redeploy and verify llms.txt and sitemap.xml return files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert frontend/Dockerfile change and redeploy.

## Findings
