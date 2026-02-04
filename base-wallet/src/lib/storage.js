import { chmodSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { getWalletPathFromEnv } from './env.js';

const DEFAULT_WALLET_FILENAME = '.solvera-base-wallet.json';
const DEFAULT_WALLET_PATH = join(homedir(), DEFAULT_WALLET_FILENAME);

export function resolveWalletPath(overridePath) {
  if (overridePath) {
    return overridePath;
  }
  return getWalletPathFromEnv(DEFAULT_WALLET_PATH);
}

export function walletExists(walletPath) {
  return existsSync(walletPath);
}

export function loadWallet(walletPath) {
  if (!existsSync(walletPath)) {
    return null;
  }
  const raw = readFileSync(walletPath, 'utf8');
  const data = JSON.parse(raw);
  if (!data || !data.privateKey || !data.address) {
    throw new Error('Wallet file is invalid or missing required fields.');
  }
  return data;
}

export function saveWallet(walletPath, wallet) {
  const dir = dirname(walletPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(walletPath, JSON.stringify(wallet, null, 2), 'utf8');
  chmodSync(walletPath, 0o600);
}
