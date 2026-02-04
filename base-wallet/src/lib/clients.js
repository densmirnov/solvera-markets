import { createPublicClient, createWalletClient, http } from 'viem';
import { BASE_CHAIN } from './config.js';
import { resolveRpcUrl } from './rpc.js';

export async function getPublicClient(overrideUrl) {
  const rpcUrl = await resolveRpcUrl(overrideUrl);
  const client = createPublicClient({
    chain: BASE_CHAIN,
    transport: http(rpcUrl, { timeout: 15_000 })
  });
  return { client, rpcUrl };
}

export async function getWalletClient(account, overrideUrl) {
  const rpcUrl = await resolveRpcUrl(overrideUrl);
  const client = createWalletClient({
    account,
    chain: BASE_CHAIN,
    transport: http(rpcUrl, { timeout: 15_000 })
  });
  return { client, rpcUrl };
}
