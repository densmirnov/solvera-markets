import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const cliPath = join(root, 'base-wallet', 'src', 'cli.js');
const args = process.argv.slice(2);

function printHelp() {
  console.log(`Agent TX Runner

Usage:
  node scripts/agent-tx.mjs --to <address> --data <calldata> [--value <eth>] [--value-wei <wei>] [--rpc <url>] [--wallet <path>] [--private-key <hex>] [--json]

Wallet sources (first available):
  1) --private-key flag
  2) BASE_PRIVATE_KEY or PRIVATE_KEY env
  3) Local wallet file (default: ~/.solvera-base-wallet.json)
`);
}

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

const result = spawnSync(process.execPath, [cliPath, 'tx', ...args], {
  stdio: 'inherit',
  env: process.env
});

process.exitCode = result.status ?? 1;
