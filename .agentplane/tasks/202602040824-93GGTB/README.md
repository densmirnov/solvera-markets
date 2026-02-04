---
id: "202602040824-93GGTB"
title: "Fix frontend routing and API proxy"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build"]
commit: null
comments:
  - { author: "CODER", body: "Start: Fix nginx config for SPA routes and /api proxy; set VITE_API_BASE to /api for same-origin calls." }
doc_version: 2
doc_updated_at: "2026-02-04T08:24:14.877Z"
doc_updated_by: "CODER"
description: "Add nginx SPA routing and /api reverse proxy so /monitor/intents works on solvera.markets and /skill,/docs routes are handled."
id_source: "generated"
---
