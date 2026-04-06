export type SupportedNetwork = "base" | "status-sepolia";

export interface NetworkDefinition {
  key: SupportedNetwork;
  label: string;
  chip: string;
  networkName: string;
  chainId: number;
  chainIdHex: string;
  explorerBaseUrl: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  apiBase: string;
  contractAddress: string | null;
}

const DEFAULT_API_BASE = import.meta.env.VITE_API_BASE || "/api";

const BASE_API_BASE =
  import.meta.env.VITE_BASE_API_BASE ||
  import.meta.env.VITE_BASE_MAINNET_API_BASE ||
  DEFAULT_API_BASE;

const STATUS_API_BASE =
  import.meta.env.VITE_STATUS_API_BASE ||
  import.meta.env.VITE_STATUS_SEPOLIA_API_BASE ||
  DEFAULT_API_BASE;

export const NETWORK_DEFINITIONS: Record<SupportedNetwork, NetworkDefinition> = {
  base: {
    key: "base",
    label: "Base",
    chip: "BASE",
    networkName: "base",
    chainId: 8453,
    chainIdHex: "0x2105",
    explorerBaseUrl: "https://basescan.org",
    rpcUrls: [import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    apiBase: BASE_API_BASE,
    contractAddress:
      import.meta.env.VITE_BASE_CONTRACT_ADDRESS ||
      "0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A",
  },
  "status-sepolia": {
    key: "status-sepolia",
    label: "Status Sepolia",
    chip: "STATUS",
    networkName: "status-sepolia",
    chainId: 1660990954,
    chainIdHex: "0x6300b5ea",
    explorerBaseUrl: "https://sepoliascan.status.network",
    rpcUrls: [
      import.meta.env.VITE_STATUS_SEPOLIA_RPC_URL ||
        "https://public.sepolia.rpc.status.network",
    ],
    blockExplorerUrls: ["https://sepoliascan.status.network"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    apiBase: STATUS_API_BASE,
    contractAddress:
      import.meta.env.VITE_STATUS_CONTRACT_ADDRESS ||
      "0xF79367dAB12D8E12146685dA2830f112F02De71a",
  },
};

export const DEFAULT_NETWORK_KEY: SupportedNetwork = "status-sepolia";
export const NETWORK_STORAGE_KEY = "solvera:selected-network";

export function isSupportedNetwork(value: string): value is SupportedNetwork {
  return value === "base" || value === "status-sepolia";
}

export function getNetworkDefinition(
  network: SupportedNetwork,
): NetworkDefinition {
  return NETWORK_DEFINITIONS[network];
}

export function networkFromChainId(
  chainId: number | string | null | undefined,
): SupportedNetwork | null {
  const normalized =
    typeof chainId === "string"
      ? Number(chainId.startsWith("0x") ? parseInt(chainId, 16) : chainId)
      : chainId;

  if (normalized === NETWORK_DEFINITIONS.base.chainId) return "base";
  if (normalized === NETWORK_DEFINITIONS["status-sepolia"].chainId) {
    return "status-sepolia";
  }

  return null;
}

export function networkFromName(
  network: string | null | undefined,
): SupportedNetwork | null {
  if (!network) return null;

  const normalized = network.trim().toLowerCase();
  if (normalized === "base" || normalized === "base-mainnet") return "base";
  if (normalized === "status" || normalized === "status-sepolia") {
    return "status-sepolia";
  }

  return null;
}
