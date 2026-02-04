---
id: "202602040827-KYTC7S"
title: "Fix nginx /api path rewrite"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["frontend"]
verify: ["docker compose up -d --build"]
commit: null
comments:
  - { author: "CODER", body: "Start: Fix nginx proxy_pass to preserve /api prefix so backend routes resolve." }
doc_version: 2
doc_updated_at: "2026-02-04T08:27:29.386Z"
doc_updated_by: "CODER"
description: "Adjust nginx proxy_pass so /api/* is forwarded to backend /api/* instead of stripping prefix."
id_source: "generated"
---
