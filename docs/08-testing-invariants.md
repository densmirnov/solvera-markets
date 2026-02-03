# Тест‑план и инварианты

## Сценарные тесты (минимум)
- Happy path.
- No offers → `expire` из `OPEN`.
- Winner не исполняет → `expire` из `SELECTED`.
- Неверный вызывающий для `selectWinner`/`fulfill`.
- `fulfill` после `ttlAccept`.
- `selectWinner` после `ttlSubmit`.
- Edge: `rewardAmount < fixedFeeOnExpire`.

## Property/invariant tests
1. Никаких двойных выплат reward.
2. Балансы сохраняются по веткам.
3. Монотонные переходы состояний.

## Инварианты протокола
1. Reward может быть выплачен ровно один раз.
2. При `ACCEPTED`:
- инициатор получил `winnerAmountOut` `tokenOut`.
- winner получил `rewardAmount - fee`.
- `feeRecipient` получил `fee`.
- bond возвращён.
3. При `EXPIRED`:
- payer получил `rewardAmount - fee_exp`.
- `feeRecipient` получил `fee_exp`.
- при winner timeout bond слэшен.
4. Нет вызовов `selectWinner/fulfill/expire` из финальных состояний.
5. `rep` меняется только в `_accept` (+1) и `expire` (ветка B, ‑1).
