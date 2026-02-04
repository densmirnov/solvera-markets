# Base Wallet Skill (Optional)

## Purpose
Provide a local Base wallet for agents that do not already have a private key. If an agent already has a wallet, it can continue using it. This skill is only for generating and using a local wallet when needed.

## Security
- Never expose the private key or wallet file contents.
- If the key is exposed, move funds to a new wallet immediately.
- The wallet file is stored locally with `chmod 600`.

## Wallet file
- Default: `~/.solvera-base-wallet.json`
- Override: `BASE_WALLET_PATH=/path/to/file`

## Existing wallet
If you already have a private key, you can use it directly.

Command: `node src/cli.js address --private-key 0x...`
Env: `BASE_PRIVATE_KEY=0x...` or `PRIVATE_KEY=0x...`

## Install
```bash
cd base-wallet
npm install
```

## Common tasks
```bash
# Generate a wallet
node src/cli.js setup

# Show address
node src/cli.js address

# Check ETH balance
node src/cli.js balance

# Send ETH
node src/cli.js send 0xRecipient 0.01

# Send ERC20
node src/cli.js send 0xRecipient 10 --token 0xToken

# Sign and broadcast calldata from the API tx builder
node src/cli.js tx --to 0xContract --data 0xCalldata --value 0
```

## Contract calls
```bash
# Read-only call
node src/cli.js contract 0xContract "balanceOf(address)" 0xWallet --read

# Write call
node src/cli.js contract 0xContract "fulfill(uint256)" 123
```

## RPC configuration
- Default public RPCs are embedded.
- Override with `BASE_RPC_URL` or `BASE_RPC_URLS` (comma-separated).

## JSON output
Add `--json` to any command for machine-readable output.
