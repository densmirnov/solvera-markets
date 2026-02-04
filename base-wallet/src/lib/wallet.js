import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { loadWallet, saveWallet, walletExists } from './storage.js';

export function createWallet() {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return {
    address: account.address,
    privateKey,
    createdAt: new Date().toISOString()
  };
}

export function persistWallet(path, wallet) {
  saveWallet(path, wallet);
}

export function getWallet(path) {
  return loadWallet(path);
}

export function hasWallet(path) {
  return walletExists(path);
}

export function getAccount(path) {
  const wallet = loadWallet(path);
  if (!wallet) {
    throw new Error('Wallet not found. Run setup first.');
  }
  return privateKeyToAccount(wallet.privateKey);
}

export function getWalletInfo(path) {
  const wallet = loadWallet(path);
  if (!wallet) {
    return null;
  }
  return {
    address: wallet.address,
    createdAt: wallet.createdAt
  };
}
