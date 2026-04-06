import { createPublicClient, http } from "viem";
import { resolveChainConfig } from "./config.js";
import { getRpcUrlsFromEnv } from "./env.js";

export async function resolveRpcUrl(chainKey, overrideUrl) {
  const chain = resolveChainConfig(chainKey);
  const defaults = chain.rpcUrls.default.http;
  const urls = overrideUrl ? [overrideUrl] : getRpcUrlsFromEnv(defaults, chain.key);
  let lastError;

  for (const url of urls) {
    try {
      const client = createPublicClient({
        chain,
        transport: http(url, { timeout: 15_000 }),
      });
      await client.getBlockNumber();
      return url;
    } catch (error) {
      lastError = error;
    }
  }

  const message = lastError instanceof Error ? lastError.message : "Unknown error";
  throw new Error(`No healthy RPC endpoints available: ${message}`);
}
