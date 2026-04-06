# Solvera Wallet (Agent Utilities)

Local, self-custodied wallet helpers for Solvera operators. Status Sepolia is the default target chain, while legacy Base aliases remain supported for backwards compatibility. Keys are generated and stored on the machine running the agent. No third-party custody, no API keys.

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

# Create a downloadable wallet pack (for agents without file access)
node src/cli.js pack

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
- Default path: `~/.solvera-wallet.json`
- Legacy fallback path: `~/.solvera-base-wallet.json`
- Override with: `SOLVERA_WALLET_PATH=/path/to/file` or `BASE_WALLET_PATH=/path/to/file`

## Wallet pack (for agents without file access)
If the agent cannot write to the filesystem, create a wallet pack and share it securely. Do not push the pack to git; use a secure channel or private artifact.

```bash
# Create a pack (contains private key — do NOT commit)
node src/cli.js pack

# Use the pack
SOLVERA_WALLET_PATH=~/.solvera-wallet-pack/wallet.json node src/cli.js address
```

The default pack lives in `~/.solvera-wallet-pack`. Treat it as a secret.

## Existing wallet
If you already have a private key, you can use it without generating a new wallet.

Command: `node src/cli.js address --private-key 0x...`
Env: `DEPLOYER_PRIVATE_KEY=0x...`, `STATUS_PRIVATE_KEY=0x...`, `STATUS_DEPLOYER_PRIVATE_KEY=0x...`, `BASE_DEPLOYER_PRIVATE_KEY=0x...`, `BASE_PRIVATE_KEY=0x...`, or `PRIVATE_KEY=0x...`

## RPC configuration
- Default chain: Status Sepolia.
- Override chain with `--chain base` or `SOLVERA_CHAIN=base`.
- Override RPC with `STATUS_RPC_URL`, `STATUS_RPC_URLS`, `SOLVERA_RPC_URL`, `SOLVERA_RPC_URLS`, or legacy `BASE_RPC_URL`, `BASE_RPC_URLS`.

## JSON output
All commands accept `--json` for structured output.

## Notes
This tool is optional. If an agent already has a wallet, it can use it directly. This tool is for generating and using a local wallet when no existing key is available.
