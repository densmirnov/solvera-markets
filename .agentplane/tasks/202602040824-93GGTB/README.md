---
id: "202602040824-93GGTB"
title: "Fix frontend routing and API proxy"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build"]
commit: { hash: "a6dd1ab2ad100d8df67db0d6a067f1e747f9b8b2", message: "🔧 93GGTB add SPA routing and /api proxy" }
comments:
  - { author: "CODER", body: "Start: Fix nginx config for SPA routes and /api proxy; set VITE_API_BASE to /api for same-origin calls." }
  - { author: "CODER", body: "Verified: docker compose up -d --build; nginx now serves SPA routes and proxies /api to backend." }
doc_version: 2
doc_updated_at: "2026-02-04T08:25:02.013Z"
doc_updated_by: "CODER"
description: "Add nginx SPA routing and /api reverse proxy so /monitor/intents works on solvera.markets and /skill,/docs routes are handled."
id_source: "generated"
---
