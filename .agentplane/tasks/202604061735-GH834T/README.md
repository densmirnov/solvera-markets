---
id: "202604061735-GH834T"
title: "Publish Status operator docs and deployment records"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604061735-XM276Y"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:02:44.020Z"
  updated_by: "DOCS"
  note: "Status-facing docs and public skill surfaces were updated and rebuilt"
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: publish the Status Sepolia operator docs, deployment records, and public skill surfaces so the next site deployment does not regress to Base-first instructions."
events:
  -
    type: "status"
    at: "2026-04-06T19:01:01.517Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: publish the Status Sepolia operator docs, deployment records, and public skill surfaces so the next site deployment does not regress to Base-first instructions."
  -
    type: "verify"
    at: "2026-04-06T19:02:44.020Z"
    author: "DOCS"
    state: "ok"
    note: "Status-facing docs and public skill surfaces were updated and rebuilt"
doc_version: 3
doc_updated_at: "2026-04-06T19:02:44.027Z"
doc_updated_by: "DOCS"
description: "Update deployment docs, runbooks, and records so Status Sepolia becomes a first-class Solvera target with explicit Base-history preservation. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Publish Status operator docs and deployment records
    
    Update deployment docs, runbooks, and records so Status Sepolia becomes a first-class Solvera target with explicit Base-history preservation. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Update deployment docs, runbooks, and records so Status Sepolia becomes a first-class Solvera target with explicit Base-history preservation. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Publish Status operator docs and deployment records".
  Plan: |-
    1. Implement the change for "Publish Status operator docs and deployment records".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - Public docs can silently revert to Base-first wording if generated files are edited instead of their source. Mitigation: update frontend/SKILL.md and rebuild frontend so public copies are regenerated from the Status-aware source.
    - Operator docs can overstate production readiness if they omit the exact Status deployment evidence. Mitigation: publish the verified contract address, smoke token addresses, tx hashes, and note that Status indexing currently relies on the self-hosted Graph path.
    - Historical Base addresses must remain available for auditability. Mitigation: preserve Base sections as legacy records while moving Status Sepolia to the canonical top position.
  Verify Steps: |-
    1. Rebuild the frontend after updating frontend/SKILL.md. Expected: generated public SKILL files reflect Status-aware wallet and network instructions.
    2. Review published-facing docs and README paths touched by this task. Expected: Status Sepolia is the canonical live target, exact deployment records are present, and Base history is preserved as legacy context rather than implied default.
    3. Search the touched publish/docs surfaces for stale Base-only wallet/explorer wording. Expected: no remaining Base-first instructions in frontend public files, docs overview, deployment records, backend API reference, or root README except clearly-labeled historical references.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:02:44.020Z — VERIFY — ok
    
    By: DOCS
    
    Note: Status-facing docs and public skill surfaces were updated and rebuilt
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:02:34.255Z, excerpt_hash=sha256:30238392c73517ab7aceb88d96b9c36d06e14b0f78f44b3c5deddca807105ecd
    
    Details:
    
    Updated frontend/SKILL.md plus generated public skill files, wallet guide, llms manifests, docs overview, deployment records, backend API reference, and root README. Rebuilt frontend so public/SKILL.md was regenerated from the Status-aware source. Searched touched publish/docs surfaces to ensure no remaining Base-first wallet or explorer instructions outside clearly historical references.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Updated publish-facing skill surfaces so Status Sepolia is the primary live target instead of implicit Base-first wording.
    - Regenerated frontend/public/SKILL.md from the corrected frontend/SKILL.md source to avoid the next frontend build reintroducing stale Base instructions.
    - Published exact Status deployment records, StatusScan link, smoke token addresses, and the full proven lifecycle tx sequence in README and docs deployment pages.
    - Preserved Base addresses as historical records instead of deleting them.
id_source: "generated"
---
## Summary

Publish Status operator docs and deployment records

Update deployment docs, runbooks, and records so Status Sepolia becomes a first-class Solvera target with explicit Base-history preservation. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Update deployment docs, runbooks, and records so Status Sepolia becomes a first-class Solvera target with explicit Base-history preservation. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Publish Status operator docs and deployment records".

## Plan

1. Implement the change for "Publish Status operator docs and deployment records".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- Public docs can silently revert to Base-first wording if generated files are edited instead of their source. Mitigation: update frontend/SKILL.md and rebuild frontend so public copies are regenerated from the Status-aware source.
- Operator docs can overstate production readiness if they omit the exact Status deployment evidence. Mitigation: publish the verified contract address, smoke token addresses, tx hashes, and note that Status indexing currently relies on the self-hosted Graph path.
- Historical Base addresses must remain available for auditability. Mitigation: preserve Base sections as legacy records while moving Status Sepolia to the canonical top position.

## Verify Steps

1. Rebuild the frontend after updating frontend/SKILL.md. Expected: generated public SKILL files reflect Status-aware wallet and network instructions.
2. Review published-facing docs and README paths touched by this task. Expected: Status Sepolia is the canonical live target, exact deployment records are present, and Base history is preserved as legacy context rather than implied default.
3. Search the touched publish/docs surfaces for stale Base-only wallet/explorer wording. Expected: no remaining Base-first instructions in frontend public files, docs overview, deployment records, backend API reference, or root README except clearly-labeled historical references.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:02:44.020Z — VERIFY — ok

By: DOCS

Note: Status-facing docs and public skill surfaces were updated and rebuilt

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:02:34.255Z, excerpt_hash=sha256:30238392c73517ab7aceb88d96b9c36d06e14b0f78f44b3c5deddca807105ecd

Details:

Updated frontend/SKILL.md plus generated public skill files, wallet guide, llms manifests, docs overview, deployment records, backend API reference, and root README. Rebuilt frontend so public/SKILL.md was regenerated from the Status-aware source. Searched touched publish/docs surfaces to ensure no remaining Base-first wallet or explorer instructions outside clearly historical references.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Updated publish-facing skill surfaces so Status Sepolia is the primary live target instead of implicit Base-first wording.
- Regenerated frontend/public/SKILL.md from the corrected frontend/SKILL.md source to avoid the next frontend build reintroducing stale Base instructions.
- Published exact Status deployment records, StatusScan link, smoke token addresses, and the full proven lifecycle tx sequence in README and docs deployment pages.
- Preserved Base addresses as historical records instead of deleting them.
