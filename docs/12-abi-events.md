# ABI и события (MVP)

## Функции
- `createIntent(tokenOut, minAmountOut, rewardToken, rewardAmount, payer, initiator, verifier, ttlSubmit, ttlAccept) -> id`
- `submitOffer(id, amountOut)`
- `selectWinner(id, solver, amountOut)`
- `fulfill(id)`
- `expire(id)`
- `getIntent(id) -> Intent`

## События и payload

### IntentCreated
- `id`
- `payer`
- `initiator`
- `verifier`
- `tokenOut`
- `minAmountOut`
- `rewardToken`
- `rewardAmount`
- `ttlSubmit`
- `ttlAccept`

### OfferSubmitted
- `id`
- `solver`
- `amountOut`
- `timestamp`

### WinnerSelected
- `id`
- `solver`
- `amountOut`
- `bondAmount`

### Fulfilled
- `id`
- `solver`
- `amountOut`

### Accepted
- `id`
- `solver`
- `rewardAmount`
- `feeAmount`
- `bondAmount`

### Expired
- `id`
- `fromState` (`OPEN` | `SELECTED`)
- `feeAmount`
- `refundAmount`

### ReputationUpdated
- `solver`
- `newValue`
- `reason` (`ACCEPTED` | `WINNER_TIMEOUT`)
