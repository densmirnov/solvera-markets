import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRuntimeConfig, type RuntimeConfig } from "./config";
import {
  DEFAULT_NETWORK_KEY,
  NETWORK_STORAGE_KEY,
  isSupportedNetwork,
  type SupportedNetwork,
} from "./networks";
import {
  subscribeToWalletChainChanges,
  switchOrAddNetwork,
} from "./wallet";

type WalletSyncState = "idle" | "switching" | "ready" | "unavailable" | "error";

interface NetworkContextValue {
  selectedNetwork: SupportedNetwork;
  runtimeConfig: RuntimeConfig;
  walletSyncState: WalletSyncState;
  walletMessage: string | null;
  selectNetwork: (network: SupportedNetwork) => Promise<void>;
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

function readInitialNetwork(): SupportedNetwork {
  if (typeof window === "undefined") return DEFAULT_NETWORK_KEY;

  const stored = window.localStorage.getItem(NETWORK_STORAGE_KEY);
  if (stored && isSupportedNetwork(stored)) return stored;

  return DEFAULT_NETWORK_KEY;
}

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] =
    useState<SupportedNetwork>(readInitialNetwork);
  const [walletSyncState, setWalletSyncState] =
    useState<WalletSyncState>("idle");
  const [walletMessage, setWalletMessage] = useState<string | null>(null);
  const runtimeConfig = useRuntimeConfig(selectedNetwork);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(NETWORK_STORAGE_KEY, selectedNetwork);
  }, [selectedNetwork]);

  useEffect(() => {
    return subscribeToWalletChainChanges((network) => {
      if (!network) {
        setWalletSyncState("idle");
        return;
      }

      setSelectedNetwork(network);
      setWalletSyncState("ready");
      setWalletMessage(null);
    });
  }, []);

  const selectNetwork = useCallback(async (network: SupportedNetwork) => {
    setSelectedNetwork(network);
    setWalletSyncState("switching");
    setWalletMessage(null);

    const result = await switchOrAddNetwork(network);

    if (!result.ok) {
      setWalletSyncState(result.status);
      setWalletMessage(result.error ?? null);
      return;
    }

    setWalletSyncState("ready");
    setWalletMessage(
      result.status === "added"
        ? "Network added to MetaMask"
        : "MetaMask switched",
    );
  }, []);

  const value = useMemo<NetworkContextValue>(
    () => ({
      selectedNetwork,
      runtimeConfig,
      walletSyncState,
      walletMessage,
      selectNetwork,
    }),
    [runtimeConfig, selectedNetwork, selectNetwork, walletMessage, walletSyncState],
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
}

export function useNetworkSelection(): NetworkContextValue {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetworkSelection must be used inside NetworkProvider");
  }

  return context;
}
