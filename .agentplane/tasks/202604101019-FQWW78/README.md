---
id: "202604101019-FQWW78"
title: "Add non-technical use cases page to docs and publish it"
result_summary: "Use Cases docs page is live and linked in the documentation navigation."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify:
  - "jq -e '.navigation.groups[] | select(.group==\"Use Cases\") | .pages[] | select(.==\"use-cases/intent-marketplace-use-cases\")' docs/docs.json >/dev/null"
  - "test -f docs/use-cases/intent-marketplace-use-cases.md"
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T10:22:53.722Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after verify steps were finalized; proceed with docs implementation and publication."
verification:
  state: "ok"
  updated_at: "2026-04-10T10:23:07.523Z"
  updated_by: "DOCS"
  note: "Created a new Mintlify Use Cases page, wired it into docs navigation, linked it from overview pages, pushed the docs update, and confirmed the live page returns 200 at https://docs.solvera.markets/use-cases/intent-marketplace-use-cases with the expected title and content."
commit:
  hash: "a5cba55abe6f44bba87afae9a0d5708cbe51a112"
  message: "🚧 FQWW78 docs: add non-technical use cases page"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: added a non-technical Use Cases section to the Mintlify docs, explained practical scenarios across three maturity stages, wired the page into navigation, and published the update live on docs.solvera.markets."
events:
  -
    type: "verify"
    at: "2026-04-10T10:23:07.523Z"
    author: "DOCS"
    state: "ok"
    note: "Created a new Mintlify Use Cases page, wired it into docs navigation, linked it from overview pages, pushed the docs update, and confirmed the live page returns 200 at https://docs.solvera.markets/use-cases/intent-marketplace-use-cases with the expected title and content."
  -
    type: "status"
    at: "2026-04-10T10:23:15.673Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: added a non-technical Use Cases section to the Mintlify docs, explained practical scenarios across three maturity stages, wired the page into navigation, and published the update live on docs.solvera.markets."
doc_version: 3
doc_updated_at: "2026-04-10T10:23:15.674Z"
doc_updated_by: "INTEGRATOR"
description: "Add a new Use Cases section to the Mintlify docs, explain practical intent-marketplace scenarios for non-technical readers across three maturity stages, wire it into navigation, and publish the documentation update to docs.solvera.markets."
sections:
  Summary: |-
    Add non-technical use cases page to docs and publish it
    
    Add a new Use Cases section to the Mintlify docs, explain practical intent-marketplace scenarios for non-technical readers across three maturity stages, wire it into navigation, and publish the documentation update to docs.solvera.markets.
  Scope: |-
    - In scope: Add a new Use Cases section to the Mintlify docs, explain practical intent-marketplace scenarios for non-technical readers across three maturity stages, wire it into navigation, and publish the documentation update to docs.solvera.markets.
    - Out of scope: unrelated refactors not required for "Add non-technical use cases page to docs and publish it".
  Plan: |-
    1. Создать новую Mintlify-страницу с разделом Use Cases и описать практические сценарии простым языком.
    2. Разбить сценарии по трем этапам взросления: изменения балансов, любые ончейн-действия, любые действия включая оффчейн-события.
    3. Подключить страницу в docs navigation и при необходимости добавить ссылку с overview-страниц.
    4. Проверить наличие страницы и навигации локально по файловой структуре.
    5. Закоммитить, опубликовать и проверить live docs.
  Risks: |-
    - Если Use Cases будут описаны слишком технически, страница не решит задачу для нетехнической аудитории.
    - Если этапы взросления проекта будут смешаны, читатель не поймёт, что уже возможно сейчас, а что является следующим шагом.
    - Если страница не будет добавлена в docs navigation, обновление фактически не станет частью документации.
  Verify Steps: |-
    1. Проверить, что существует файл docs/use-cases/intent-marketplace-use-cases.md. Expected: страница создана и содержит frontmatter Mintlify.
    2. Проверить docs/docs.json. Expected: в navigation есть отдельная группа Use Cases со страницей use-cases/intent-marketplace-use-cases.
    3. Прочитать новую страницу. Expected: текст написан простым языком для нетехнических читателей и разделён на три этапа взросления проекта с практическими примерами.
    4. После push открыть https://docs.solvera.markets и страницу Use Cases. Expected: обновление доступно live.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T10:23:07.523Z — VERIFY — ok
    
    By: DOCS
    
    Note: Created a new Mintlify Use Cases page, wired it into docs navigation, linked it from overview pages, pushed the docs update, and confirmed the live page returns 200 at https://docs.solvera.markets/use-cases/intent-marketplace-use-cases with the expected title and content.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T10:19:59.044Z, excerpt_hash=sha256:83bfbf1356bf270d1ec61bdb32112a759c4f9b52dfe9b24bca1e6455b6140c4b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Notes: |-
    ### Approvals / Overrides
    - Пользователь явно разрешил выполнить изменение и отдельно указал не создавать новую задачу agentplane для proposal-работы в предыдущем запросе; для текущего docs-изменения tracking task создана штатно.
    
    ### Decisions
    - Раздел Use Cases будет отдельной навигационной группой, а не спрятан внутри reference или concepts, чтобы его легко находили нетехнические читатели.
    - Повествование будет построено вокруг трёх стадий взросления продукта: balances -> onchain actions -> any actions with oracle-backed resolution.
  Findings: ""
  Context: "Нужно добавить отдельный, понятный нетехническому читателю раздел Use Cases в Mintlify-документацию Solvera Markets. Раздел должен объяснять, как intent marketplace используется на практике и как меняются сценарии по мере взросления продукта: от простых изменений баланса кошелька к любым ончейн-действиям, а затем к любым действиям, включая оффчейн-события. Изменение должно публиковаться в live docs на https://docs.solvera.markets."
id_source: "generated"
---
## Summary

Add non-technical use cases page to docs and publish it

Add a new Use Cases section to the Mintlify docs, explain practical intent-marketplace scenarios for non-technical readers across three maturity stages, wire it into navigation, and publish the documentation update to docs.solvera.markets.

## Scope

- In scope: Add a new Use Cases section to the Mintlify docs, explain practical intent-marketplace scenarios for non-technical readers across three maturity stages, wire it into navigation, and publish the documentation update to docs.solvera.markets.
- Out of scope: unrelated refactors not required for "Add non-technical use cases page to docs and publish it".

## Plan

1. Создать новую Mintlify-страницу с разделом Use Cases и описать практические сценарии простым языком.
2. Разбить сценарии по трем этапам взросления: изменения балансов, любые ончейн-действия, любые действия включая оффчейн-события.
3. Подключить страницу в docs navigation и при необходимости добавить ссылку с overview-страниц.
4. Проверить наличие страницы и навигации локально по файловой структуре.
5. Закоммитить, опубликовать и проверить live docs.

## Risks

- Если Use Cases будут описаны слишком технически, страница не решит задачу для нетехнической аудитории.
- Если этапы взросления проекта будут смешаны, читатель не поймёт, что уже возможно сейчас, а что является следующим шагом.
- Если страница не будет добавлена в docs navigation, обновление фактически не станет частью документации.

## Verify Steps

1. Проверить, что существует файл docs/use-cases/intent-marketplace-use-cases.md. Expected: страница создана и содержит frontmatter Mintlify.
2. Проверить docs/docs.json. Expected: в navigation есть отдельная группа Use Cases со страницей use-cases/intent-marketplace-use-cases.
3. Прочитать новую страницу. Expected: текст написан простым языком для нетехнических читателей и разделён на три этапа взросления проекта с практическими примерами.
4. После push открыть https://docs.solvera.markets и страницу Use Cases. Expected: обновление доступно live.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T10:23:07.523Z — VERIFY — ok

By: DOCS

Note: Created a new Mintlify Use Cases page, wired it into docs navigation, linked it from overview pages, pushed the docs update, and confirmed the live page returns 200 at https://docs.solvera.markets/use-cases/intent-marketplace-use-cases with the expected title and content.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T10:19:59.044Z, excerpt_hash=sha256:83bfbf1356bf270d1ec61bdb32112a759c4f9b52dfe9b24bca1e6455b6140c4b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

### Approvals / Overrides
- Пользователь явно разрешил выполнить изменение и отдельно указал не создавать новую задачу agentplane для proposal-работы в предыдущем запросе; для текущего docs-изменения tracking task создана штатно.

### Decisions
- Раздел Use Cases будет отдельной навигационной группой, а не спрятан внутри reference или concepts, чтобы его легко находили нетехнические читатели.
- Повествование будет построено вокруг трёх стадий взросления продукта: balances -> onchain actions -> any actions with oracle-backed resolution.

## Findings


## Context

Нужно добавить отдельный, понятный нетехническому читателю раздел Use Cases в Mintlify-документацию Solvera Markets. Раздел должен объяснять, как intent marketplace используется на практике и как меняются сценарии по мере взросления продукта: от простых изменений баланса кошелька к любым ончейн-действиям, а затем к любым действиям, включая оффчейн-события. Изменение должно публиковаться в live docs на https://docs.solvera.markets.
