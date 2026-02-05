import { JsonRpcProvider, isAddress } from "ethers";
import { useEffect, useMemo, useState } from "react";

const ENS_RPC_URL = "https://cloudflare-eth.com";
const provider = new JsonRpcProvider(ENS_RPC_URL);
const reverseCache = new Map<string, string | null>();

async function lookupEns(address: string): Promise<string | null> {
  const normalized = address.toLowerCase();
  if (!isAddress(normalized)) return null;
  if (reverseCache.has(normalized)) {
    return reverseCache.get(normalized) ?? null;
  }
  try {
    const name = await provider.lookupAddress(normalized);
    const resolved = name || null;
    reverseCache.set(normalized, resolved);
    return resolved;
  } catch {
    reverseCache.set(normalized, null);
    return null;
  }
}

export function useEnsNames(addresses: Array<string | null | undefined>) {
  const unique = useMemo(() => {
    const set = new Set<string>();
    for (const value of addresses) {
      if (!value) continue;
      set.add(value.toLowerCase());
    }
    return Array.from(set.values());
  }, [addresses]);

  const [names, setNames] = useState<Record<string, string | null>>({});

  useEffect(() => {
    let active = true;
    const uncached = unique.filter(
      (address) => !reverseCache.has(address) && isAddress(address),
    );

    if (uncached.length === 0) {
      const snapshot: Record<string, string | null> = {};
      for (const address of unique) {
        if (reverseCache.has(address)) {
          snapshot[address] = reverseCache.get(address) ?? null;
        }
      }
      setNames(snapshot);
      return () => {
        active = false;
      };
    }

    Promise.all(uncached.map((address) => lookupEns(address))).then((results) => {
      if (!active) return;
      const next: Record<string, string | null> = {};
      for (const [idx, address] of uncached.entries()) {
        next[address] = results[idx] ?? null;
      }
      for (const address of unique) {
        if (reverseCache.has(address)) {
          next[address] = reverseCache.get(address) ?? null;
        }
      }
      setNames(next);
    });

    return () => {
      active = false;
    };
  }, [unique]);

  return names;
}
