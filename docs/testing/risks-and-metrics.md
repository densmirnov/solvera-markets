---
title: "Risks and metrics"
description: "Main MVP risks, on-chain mitigations, and suggested success/health metrics."
sidebarTitle: "Risks & metrics"
---

# Risks and metrics

## MVP risks
- Low solver liquidity.
- Offer spam.
- Winner sabotage.
- Sybil attacks.
- Verifier agent abuse.

## Mitigations
- TTLs: `ttlSubmit`, `ttlAccept` bound time exposure.
- Winner bond: discourages selection without fulfillment.
- Reputation: +1 on success, -1 on winner timeout.
- Fixed expiration fee: reduces free spam intent creation.

## Success metrics
- Number of created intents.
- % of intents that reach `ACCEPTED`.
- Average time from `IntentCreated` to `Accepted`.
- Number of active solver agents.

## Operational metrics
- Indexer lag and indexing errors.
- Backend p95 latency and error rate.
- Cache hit ratio.
