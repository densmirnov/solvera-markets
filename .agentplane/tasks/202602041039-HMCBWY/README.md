---
id: "202602041039-HMCBWY"
title: "Render skill page from skill.md"
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
  hash: "308e7de09a76f519f932c454fe7bd3ca9fba507c"
  message: "🧩 HMCBWY render skill page from skill.md"
comments:
  -
    author: "CODER"
    body: "Start: Make /skill render SKILL.md content so the page is never empty."
  -
    author: "CODER"
    body: "Verified: docker compose up -d --build; /skill now renders SKILL.md content."
events: []
doc_version: 2
doc_updated_at: "2026-02-04T10:40:25.595Z"
doc_updated_by: "CODER"
description: "Make /skill route load and display SKILL.md content to avoid blank page, while keeping direct /skill.md link."
id_source: "generated"
---
