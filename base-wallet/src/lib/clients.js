import { createPublicClient, createWalletClient, http } from "viem";
import { resolveChainConfig } from "./config.js";
import { resolveRpcUrl } from "./rpc.js";

export async function getPublicClient(chainKey, overrideUrl) {
  const chain = resolveChainConfig(chainKey);
  const rpcUrl = await resolveRpcUrl(chain.key, overrideUrl);
  const client = createPublicClient({
    chain,
    transport: http(rpcUrl, { timeout: 15_000 }),
  });
  return { client, rpcUrl, chain };
}

export async function getWalletClient(account, chainKey, overrideUrl) {
  const chain = resolveChainConfig(chainKey);
  const rpcUrl = await resolveRpcUrl(chain.key, overrideUrl);
  const client = createWalletClient({
    account,
    chain,
    transport: http(rpcUrl, { timeout: 15_000 }),
  });
  return { client, rpcUrl, chain };
}
