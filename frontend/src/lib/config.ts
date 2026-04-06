import { useEffect, useState } from "react";
import { apiGet } from "./api";

interface ApiConfigData {
  contractAddress?: string | null;
  network?: string | null;
  chainId?: number | string | null;
}

interface ApiConfigResponse {
  data?: ApiConfigData | null;
}

export interface RuntimeConfig {
  contractAddress: string | null;
  network: string;
  chainId: number;
  explorerBaseUrl: string;
}

export const STATUS_SEPOLIA_DEFAULTS: RuntimeConfig = {
  contractAddress: "0xF79367dAB12D8E12146685dA2830f112F02De71a",
  network: "status-sepolia",
  chainId: 1660990954,
  explorerBaseUrl: "https://sepoliascan.status.network",
};

const EXPLORER_BY_CHAIN_ID: Record<number, string> = {
  8453: "https://basescan.org",
  84532: "https://sepolia.basescan.org",
  1660990954: STATUS_SEPOLIA_DEFAULTS.explorerBaseUrl,
};

const EXPLORER_BY_NETWORK: Record<string, string> = {
  base: "https://basescan.org",
  "base-mainnet": "https://basescan.org",
  "base-sepolia": "https://sepolia.basescan.org",
  status: STATUS_SEPOLIA_DEFAULTS.explorerBaseUrl,
  "status-sepolia": STATUS_SEPOLIA_DEFAULTS.explorerBaseUrl,
};

export function explorerBaseUrlForNetwork(
  network?: string | null,
  chainId?: number | null,
): string {
  if (typeof chainId === "number" && Number.isFinite(chainId)) {
    const byChainId = EXPLORER_BY_CHAIN_ID[chainId];
    if (byChainId) return byChainId;
  }

  if (network) {
    const byNetwork = EXPLORER_BY_NETWORK[network.toLowerCase()];
    if (byNetwork) return byNetwork;
  }

  return STATUS_SEPOLIA_DEFAULTS.explorerBaseUrl;
}

export function normalizeRuntimeConfig(
  payload?: ApiConfigResponse | null,
): RuntimeConfig {
  const data = payload?.data ?? {};
  const chainId = Number(data.chainId);
  const normalizedChainId = Number.isFinite(chainId)
    ? chainId
    : STATUS_SEPOLIA_DEFAULTS.chainId;
  const network = data.network?.trim() || STATUS_SEPOLIA_DEFAULTS.network;

  return {
    contractAddress: data.contractAddress || STATUS_SEPOLIA_DEFAULTS.contractAddress,
    network,
    chainId: normalizedChainId,
    explorerBaseUrl: explorerBaseUrlForNetwork(network, normalizedChainId),
  };
}

export function formatNetworkLabel(network: string): string {
  return network
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatNetworkChip(network: string): string {
  const normalized = network.toLowerCase();

  if (normalized === "status-sepolia") return "STATUS";
  if (normalized === "base-sepolia") return "BASE SEP";
  if (normalized === "base" || normalized === "base-mainnet") return "BASE";

  return network.toUpperCase().slice(0, 10);
}

export function useRuntimeConfig(): RuntimeConfig {
  const [config, setConfig] = useState<RuntimeConfig>(STATUS_SEPOLIA_DEFAULTS);

  useEffect(() => {
    let active = true;

    apiGet<ApiConfigResponse>("/config")
      .then((payload) => {
        if (!active) return;
        setConfig(normalizeRuntimeConfig(payload));
      })
      .catch(() => {
        if (!active) return;
        setConfig(STATUS_SEPOLIA_DEFAULTS);
      });

    return () => {
      active = false;
    };
  }, []);

  return config;
}
