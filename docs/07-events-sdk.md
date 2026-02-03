# Event-based API for SDK

## Events (fact from spec)
- `IntentCreated`
- `OfferSubmitted`
- `WinnerSelected`
- `Fulfilled`
- `Accepted`
- `Expired`
- `ReputationUpdated`

## Semantics
- All critical transitions are emitted as events.
- In MVP offers can be read only from `OfferSubmitted` events.

## SDK operation (inference)
- SDK listens to events and builds off-chain intent index.
- Verifier agent selects winners based on the event stream.
