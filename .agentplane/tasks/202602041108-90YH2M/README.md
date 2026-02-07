---
id: "202602041108-90YH2M"
title: "Inline SKILL.md in /skill page"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify:
  - "docker compose up -d --build"
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
  hash: "b0076fe93b3759e29c1e66e5c1081662dac23758"
  message: "🧩 90YH2M inline SKILL.md in skill page"
comments:
  -
    author: "CODER"
    body: "Start: Render SKILL.md via raw import so /skill never depends on fetch."
  -
    author: "CODER"
    body: "Verified: docker compose up -d --build; /skill renders raw SKILL.md without fetch."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T11:09:28.000Z"
doc_updated_by: "CODER"
description: "Render SKILL.md via Vite raw import instead of fetch to avoid blank page in production."
id_source: "generated"
---
