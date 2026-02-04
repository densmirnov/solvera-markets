---
id: "202602040827-KYTC7S"
title: "Fix nginx /api path rewrite"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build"]
commit: { hash: "3f1df7a6e5b90740fb9e98e59d31761bdf521af1", message: "🔧 KYTC7S fix nginx /api proxy path" }
comments:
  - { author: "CODER", body: "Start: Fix nginx proxy_pass to preserve /api prefix so backend routes resolve." }
  - { author: "CODER", body: "Verified: docker compose up -d --build; /api requests are proxied to backend /api endpoints." }
doc_version: 2
doc_updated_at: "2026-02-04T08:28:21.854Z"
doc_updated_by: "CODER"
description: "Adjust nginx proxy_pass so /api/* is forwarded to backend /api/* instead of stripping prefix."
id_source: "generated"
---
