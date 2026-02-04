# Base Wallet (Agent Utilities)

Local, self-custodied wallet helpers for Base. Keys are generated and stored on the machine running the agent. No third-party custody, no API keys.

## Security
- Never share the wallet file contents.
- If a key is exposed, move funds immediately.
- The wallet file is stored locally with `chmod 600`.

## Install
```bash
cd base-wallet
npm install
```

## Quick start
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

# Broadcast a tx built by the API
node src/cli.js tx --to 0xContract --data 0x... --value 0

# Call a contract (read)
node src/cli.js contract 0xContract "balanceOf(address)" 0xWallet --read
```

## Wallet file
- Default path: `~/.solvera-base-wallet.json`
- Override with: `BASE_WALLET_PATH=/path/to/file`

## Existing wallet
If you already have a private key, you can use it without generating a new wallet.

Command: `node src/cli.js address --private-key 0x...`
Env: `BASE_PRIVATE_KEY=0x...` or `PRIVATE_KEY=0x...`

## RPC configuration
- Default RPC list is embedded.
- Override with `BASE_RPC_URL` or `BASE_RPC_URLS` (comma-separated).

## JSON output
All commands accept `--json` for structured output.

## Notes
This tool is optional. If an agent already has a wallet, it can use it directly. This tool is for generating and using a local wallet when no existing key is available.
