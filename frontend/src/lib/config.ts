import { useEffect, useState } from "react";
import { apiGet } from "./api";
import {
  DEFAULT_NETWORK_KEY,
  getNetworkDefinition,
  networkFromChainId,
  networkFromName,
  type NetworkDefinition,
  type SupportedNetwork,
} from "./networks";

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
  network: SupportedNetwork;
  chainId: number;
  explorerBaseUrl: string;
  apiBase: string;
}

function runtimeFromDefinition(definition: NetworkDefinition): RuntimeConfig {
  return {
    contractAddress: definition.contractAddress,
    network: definition.key,
    chainId: definition.chainId,
    explorerBaseUrl: definition.explorerBaseUrl,
    apiBase: definition.apiBase,
  };
}

export const STATUS_SEPOLIA_DEFAULTS = runtimeFromDefinition(
  getNetworkDefinition("status-sepolia"),
);

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
  selectedNetwork: SupportedNetwork = DEFAULT_NETWORK_KEY,
): RuntimeConfig {
  const fallback = runtimeFromDefinition(getNetworkDefinition(selectedNetwork));
  const data = payload?.data ?? {};
  const chainId = Number(data.chainId);
  const inferredNetwork = networkFromChainId(chainId);
  const namedNetwork = networkFromName(data.network);
  const payloadNetwork = inferredNetwork || namedNetwork;
  const normalizedChainId =
    payloadNetwork === selectedNetwork && Number.isFinite(chainId)
      ? chainId
      : fallback.chainId;
  const network = selectedNetwork;
  const contractAddress =
    payloadNetwork === selectedNetwork
      ? data.contractAddress || fallback.contractAddress
      : fallback.contractAddress;

  return {
    contractAddress,
    network,
    chainId: normalizedChainId,
    explorerBaseUrl: explorerBaseUrlForNetwork(network, normalizedChainId),
    apiBase: fallback.apiBase,
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

export function useRuntimeConfig(
  selectedNetwork: SupportedNetwork = DEFAULT_NETWORK_KEY,
): RuntimeConfig {
  const [config, setConfig] = useState<RuntimeConfig>(() =>
    normalizeRuntimeConfig(undefined, selectedNetwork),
  );

  useEffect(() => {
    let active = true;
    const fallback = normalizeRuntimeConfig(undefined, selectedNetwork);

    setConfig(fallback);

    apiGet<ApiConfigResponse>("/config", { baseUrl: fallback.apiBase })
      .then((payload) => {
        if (!active) return;
        setConfig(normalizeRuntimeConfig(payload, selectedNetwork));
      })
      .catch(() => {
        if (!active) return;
        setConfig(fallback);
      });

    return () => {
      active = false;
    };
  }, [selectedNetwork]);

  return config;
}
