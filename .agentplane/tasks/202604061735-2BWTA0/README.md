---
id: "202604061735-2BWTA0"
title: "Make base-wallet chain-aware for Status"
result_summary: "Made the wallet helper Status-aware with Base compatibility aliases and verified help/address/balance flows against Status Sepolia."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604061735-2CPW0M"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T18:31:57.364Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: make the wallet helper truly Status-aware now, then let the later docs task update published markdown against the stabilized behavior."
verification:
  state: "ok"
  updated_at: "2026-04-06T18:43:17.011Z"
  updated_by: "REVIEWER"
  note: "Status wallet helper verified"
commit:
  hash: "13f9ca9ac6b853dbf9c952bf9a81cb0da704eaad"
  message: "🚧 2BWTA0 wallet: make helper Status-aware"
comments:
  -
    author: "CODER"
    body: "Start: make the wallet helper default to Status Sepolia, preserve Base aliases for compatibility, and verify against the funded Status deployer before touching the published markdown docs."
  -
    author: "INTEGRATOR"
    body: "Verified: the wallet helper now defaults to Status Sepolia, preserves Base compatibility aliases, and successfully resolves the funded deployer plus live Status balance through the updated runtime path."
events:
  -
    type: "status"
    at: "2026-04-06T18:32:01.990Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make the wallet helper default to Status Sepolia, preserve Base aliases for compatibility, and verify against the funded Status deployer before touching the published markdown docs."
  -
    type: "verify"
    at: "2026-04-06T18:43:17.011Z"
    author: "REVIEWER"
    state: "ok"
    note: "Status wallet helper verified"
  -
    type: "status"
    at: "2026-04-06T18:43:52.018Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: the wallet helper now defaults to Status Sepolia, preserves Base compatibility aliases, and successfully resolves the funded deployer plus live Status balance through the updated runtime path."
doc_version: 3
doc_updated_at: "2026-04-06T18:43:52.019Z"
doc_updated_by: "INTEGRATOR"
description: "Refactor base-wallet internals so operators can sign and broadcast on Status Sepolia while preserving temporary Base compatibility aliases. Tracking: 202604061614-XSEJDG."
sections:
  Summary: |-
    Make base-wallet chain-aware for Status
    
    Refactor base-wallet internals so operators can sign and broadcast on Status Sepolia while preserving temporary Base compatibility aliases. Tracking: 202604061614-XSEJDG.
  Scope: |-
    - In scope: Refactor base-wallet internals so operators can sign and broadcast on Status Sepolia while preserving temporary Base compatibility aliases. Tracking: 202604061614-XSEJDG.
    - Out of scope: unrelated refactors not required for "Make base-wallet chain-aware for Status".
  Plan: |-
    1. Implement the change for "Make base-wallet chain-aware for Status".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Risks: |-
    - If the wallet helper defaults remain Base-only, operators may sign valid transactions against the wrong chain after a future publish. Mitigation: make Status Sepolia the runtime default while retaining explicit Base aliases for backwards compatibility.
    - Changing wallet path/env precedence can orphan existing operator setups. Mitigation: preserve legacy `BASE_*` aliases and fall back to the old wallet filename when present.
    - Live RPC verification can fail intermittently on public Status endpoints. Mitigation: keep verification commands deterministic and allow explicit `--rpc` overrides.
  Verify Steps: |-
    1. Run the wallet CLI help and address flows with the Status deployer key. Expected: help text shows Status-aware defaults and the derived address remains `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`.
    2. Query a live Status Sepolia balance through the helper with an explicit Status RPC. Expected: the command succeeds and reports the Status chain metadata rather than Base.
    3. Review the changed wallet docs/help/env handling. Expected: Status is the default path, while legacy `BASE_*` aliases remain explicitly supported.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T18:43:17.011Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Status wallet helper verified
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:43:16.001Z, excerpt_hash=sha256:7727dc6b651f3e12c7ec75d16c67efb939b9a270e37134c142bfa9648511b7e4
    
    Details:
    
    Verified that the wallet helper now defaults to Status Sepolia, still supports explicit Base mode, and accepts the legacy deployer secret format from the repo-local env setup. After installing `base-wallet` dependencies, the CLI help showed Status defaults, the address command derived `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` on `--chain status-sepolia`, and the balance command returned live Status Sepolia balance metadata for the funded deployer through `https://public.sepolia.rpc.status.network`.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. `base-wallet` is no longer hardcoded to Base. It now resolves chain metadata dynamically, defaults to `status-sepolia`, and still supports explicit `--chain base` for temporary backwards compatibility.
    2. RPC, wallet-path, and private-key env precedence were generalized for Status while retaining legacy Base aliases. In particular, the helper now accepts `BASE_DEPLOYER_PRIVATE_KEY` and legacy raw 64-char hex secrets without requiring a manual `0x` migration.
    3. Wallet storage now prefers `~/.solvera-wallet.json` but falls back to the old `~/.solvera-base-wallet.json` when that legacy file already exists, avoiding accidental operator lockout.
    4. Verification passed after installing local dependencies in `base-wallet/`: `node src/cli.js help` shows Status Sepolia defaults, `node src/cli.js address --json --chain status-sepolia` derives `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` from the legacy deployer key source, `node src/cli.js address --json --chain base` preserves Base compatibility, and `node src/cli.js balance --address 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d --json --rpc https://public.sepolia.rpc.status.network --chain status-sepolia` returns live Status balance data.
    5. Residual follow-up remains in docs/public artifacts: the site-exported markdown copies under `frontend/public/` still mention Base-specific wallet wording and should be updated in the docs publishing task after this stabilized runtime behavior.
id_source: "generated"
---
## Summary

Make base-wallet chain-aware for Status

Refactor base-wallet internals so operators can sign and broadcast on Status Sepolia while preserving temporary Base compatibility aliases. Tracking: 202604061614-XSEJDG.

## Scope

- In scope: Refactor base-wallet internals so operators can sign and broadcast on Status Sepolia while preserving temporary Base compatibility aliases. Tracking: 202604061614-XSEJDG.
- Out of scope: unrelated refactors not required for "Make base-wallet chain-aware for Status".

## Plan

1. Implement the change for "Make base-wallet chain-aware for Status".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Risks

- If the wallet helper defaults remain Base-only, operators may sign valid transactions against the wrong chain after a future publish. Mitigation: make Status Sepolia the runtime default while retaining explicit Base aliases for backwards compatibility.
- Changing wallet path/env precedence can orphan existing operator setups. Mitigation: preserve legacy `BASE_*` aliases and fall back to the old wallet filename when present.
- Live RPC verification can fail intermittently on public Status endpoints. Mitigation: keep verification commands deterministic and allow explicit `--rpc` overrides.

## Verify Steps

1. Run the wallet CLI help and address flows with the Status deployer key. Expected: help text shows Status-aware defaults and the derived address remains `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d`.
2. Query a live Status Sepolia balance through the helper with an explicit Status RPC. Expected: the command succeeds and reports the Status chain metadata rather than Base.
3. Review the changed wallet docs/help/env handling. Expected: Status is the default path, while legacy `BASE_*` aliases remain explicitly supported.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T18:43:17.011Z — VERIFY — ok

By: REVIEWER

Note: Status wallet helper verified

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:43:16.001Z, excerpt_hash=sha256:7727dc6b651f3e12c7ec75d16c67efb939b9a270e37134c142bfa9648511b7e4

Details:

Verified that the wallet helper now defaults to Status Sepolia, still supports explicit Base mode, and accepts the legacy deployer secret format from the repo-local env setup. After installing `base-wallet` dependencies, the CLI help showed Status defaults, the address command derived `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` on `--chain status-sepolia`, and the balance command returned live Status Sepolia balance metadata for the funded deployer through `https://public.sepolia.rpc.status.network`.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. `base-wallet` is no longer hardcoded to Base. It now resolves chain metadata dynamically, defaults to `status-sepolia`, and still supports explicit `--chain base` for temporary backwards compatibility.
2. RPC, wallet-path, and private-key env precedence were generalized for Status while retaining legacy Base aliases. In particular, the helper now accepts `BASE_DEPLOYER_PRIVATE_KEY` and legacy raw 64-char hex secrets without requiring a manual `0x` migration.
3. Wallet storage now prefers `~/.solvera-wallet.json` but falls back to the old `~/.solvera-base-wallet.json` when that legacy file already exists, avoiding accidental operator lockout.
4. Verification passed after installing local dependencies in `base-wallet/`: `node src/cli.js help` shows Status Sepolia defaults, `node src/cli.js address --json --chain status-sepolia` derives `0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d` from the legacy deployer key source, `node src/cli.js address --json --chain base` preserves Base compatibility, and `node src/cli.js balance --address 0xc9EF33216b7EDa860Fd1F6CC991cc51257dC532d --json --rpc https://public.sepolia.rpc.status.network --chain status-sepolia` returns live Status balance data.
5. Residual follow-up remains in docs/public artifacts: the site-exported markdown copies under `frontend/public/` still mention Base-specific wallet wording and should be updated in the docs publishing task after this stabilized runtime behavior.
