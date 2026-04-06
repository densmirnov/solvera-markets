export const DEFAULT_CHAIN_KEY = "status-sepolia";

export const CHAIN_CONFIGS = {
  "status-sepolia": {
    key: "status-sepolia",
    id: 1660990954,
    name: "Status Sepolia",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://public.sepolia.rpc.status.network"],
      },
      public: {
        http: ["https://public.sepolia.rpc.status.network"],
      },
    },
    blockExplorers: {
      default: {
        name: "StatusScan",
        url: "https://sepoliascan.status.network",
      },
    },
  },
  base: {
    key: "base",
    id: 8453,
    name: "Base",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [
          "https://mainnet.base.org",
          "https://base.blockpi.network/v1/rpc/public",
          "https://base.publicnode.com",
          "https://1rpc.io/base",
        ],
      },
      public: {
        http: [
          "https://mainnet.base.org",
          "https://base.blockpi.network/v1/rpc/public",
          "https://base.publicnode.com",
          "https://1rpc.io/base",
        ],
      },
    },
    blockExplorers: {
      default: {
        name: "BaseScan",
        url: "https://basescan.org",
      },
    },
  },
};

const CHAIN_ALIASES = {
  status: "status-sepolia",
  "status-sepolia": "status-sepolia",
  "status_sepolia": "status-sepolia",
  base: "base",
  "base-mainnet": "base",
  "base_mainnet": "base",
};

export function normalizeChainKey(value) {
  if (!value) return DEFAULT_CHAIN_KEY;
  const normalized = value.trim().toLowerCase();
  return CHAIN_ALIASES[normalized] || DEFAULT_CHAIN_KEY;
}

export function resolveChainConfig(value) {
  const key = normalizeChainKey(value);
  return CHAIN_CONFIGS[key] || CHAIN_CONFIGS[DEFAULT_CHAIN_KEY];
}
