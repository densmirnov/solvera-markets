import {
  chmodSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { getWalletPathFromEnv } from "./env.js";

const DEFAULT_WALLET_FILENAME = ".solvera-base-wallet.json";
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
  const raw = readFileSync(walletPath, "utf8");
  const data = JSON.parse(raw);
  if (!data || !data.privateKey || !data.address) {
    throw new Error("Wallet file is invalid or missing required fields.");
  }
  return data;
}

export function saveWallet(walletPath, wallet) {
  const dir = dirname(walletPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(walletPath, JSON.stringify(wallet, null, 2), "utf8");
  chmodSync(walletPath, 0o600);
}

export function writeWalletPack(outDir, wallet) {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  const walletPath = join(outDir, "wallet.json");
  writeFileSync(walletPath, JSON.stringify(wallet, null, 2), "utf8");
  chmodSync(walletPath, 0o600);
  const readme = [
    "# Solvera Base Wallet Pack",
    "",
    "This folder contains a private key. Treat it as a secret.",
    "Do NOT commit this folder to git or share it publicly.",
    "",
    "Files:",
    "- wallet.json: { address, privateKey, createdAt }",
    "",
    "Usage:",
    "- Set BASE_WALLET_PATH to this wallet.json",
    "- Or pass --wallet <path> to base-wallet CLI",
    "",
    "Example:",
    "  BASE_WALLET_PATH=./wallet-pack/wallet.json node base-wallet/src/cli.js address",
    "",
  ].join("\n");
  writeFileSync(join(outDir, "README.txt"), readme, "utf8");
  return walletPath;
}
