---
name: solvera-base-wallet
description: Local Solvera wallet helper for agents. Defaults to Status Sepolia while preserving temporary Base compatibility aliases.
when_to_use: >
  When an agent needs a local Solvera wallet for signing transactions and does not
  already have a private key or wallet file available.
---

# Solvera Wallet Skill (Optional)

## Purpose
Provide a local Solvera wallet for agents that do not already have a private key. Status Sepolia is the default target chain. If an agent already has a wallet, it can continue using it. This skill is only for generating and using a local wallet when needed.

## Security
- Never expose the private key or wallet file contents.
- If the key is exposed, move funds to a new wallet immediately.
- The wallet file is stored locally with `chmod 600`.

## Wallet file
- Default: `~/.solvera-wallet.json`
- Legacy fallback: `~/.solvera-base-wallet.json`
- Override: `SOLVERA_WALLET_PATH=/path/to/file` or `BASE_WALLET_PATH=/path/to/file`

## Wallet pack (no file access)
If an agent cannot write to the filesystem, generate a wallet pack and provide it securely. Do not push the pack to git; use a secure channel or private artifact.

```bash
# Create a pack (contains private key — do NOT commit)
node src/cli.js pack

# Use the pack
SOLVERA_WALLET_PATH=~/.solvera-wallet-pack/wallet.json node src/cli.js address
```

## Existing wallet
If you already have a private key, you can use it directly.

Command: `node src/cli.js address --private-key 0x...`
Env: `DEPLOYER_PRIVATE_KEY=0x...`, `STATUS_PRIVATE_KEY=0x...`, `STATUS_DEPLOYER_PRIVATE_KEY=0x...`, `BASE_DEPLOYER_PRIVATE_KEY=0x...`, `BASE_PRIVATE_KEY=0x...`, or `PRIVATE_KEY=0x...`

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
- Default chain: Status Sepolia.
- Override chain with `--chain base` or `SOLVERA_CHAIN=base`.
- Override RPC with `STATUS_RPC_URL`, `STATUS_RPC_URLS`, `SOLVERA_RPC_URL`, `SOLVERA_RPC_URLS`, or legacy `BASE_RPC_URL`, `BASE_RPC_URLS`.

## JSON output
Add `--json` to any command for machine-readable output.
