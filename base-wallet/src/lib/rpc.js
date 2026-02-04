import { createPublicClient, http } from 'viem';
import { BASE_CHAIN, DEFAULT_RPC_URLS } from './config.js';
import { getRpcUrlsFromEnv } from './env.js';

export async function resolveRpcUrl(overrideUrl) {
  const urls = overrideUrl ? [overrideUrl] : getRpcUrlsFromEnv(DEFAULT_RPC_URLS);
  let lastError;

  for (const url of urls) {
    try {
      const client = createPublicClient({
        chain: BASE_CHAIN,
        transport: http(url, { timeout: 15_000 })
      });
      await client.getBlockNumber();
      return url;
    } catch (error) {
      lastError = error;
    }
  }

  const message = lastError instanceof Error ? lastError.message : 'Unknown error';
  throw new Error(`No healthy RPC endpoints available: ${message}`);
}
