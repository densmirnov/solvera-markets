# Roles and intents

## Roles
- `payer`: locks reward, receives refund on `EXPIRED`.
- `initiator`: recipient of delivered `tokenOut`.
- `verifier`: selects winner (`selectWinner`).
- `solver`: submits offers and delivers the result.

## Intent type (MVP)
- `IntentKind`: `TRANSFER_OUTCOME`.

## Intent parameters
- `tokenOut` — ERC-20 token address.
- `minAmountOut` — minimum acceptable amount.
- `rewardToken` — reward token.
- `rewardAmount` — reward size.
- `payer` — reward payer.
- `initiator` — result recipient.
- `verifier` — verifier address.
- `ttlSubmit` — offer submission deadline.
- `ttlAccept` — winner fulfillment deadline.

## Solver offer format
- `solver`
- `amountOut`
- `timestamp`

Inference: in MVP offers can be stored only in events; winner selection is done off-chain by the verifier.
