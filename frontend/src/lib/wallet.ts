import {
  getNetworkDefinition,
  networkFromChainId,
  type SupportedNetwork,
} from "./networks";

export interface EthereumProvider {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
  on?(event: string, listener: (...args: unknown[]) => void): void;
  removeListener?(event: string, listener: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export interface WalletSwitchResult {
  ok: boolean;
  status: "ready" | "added" | "unavailable" | "error";
  error?: string;
}

function parseProviderErrorCode(error: unknown): number | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "number"
  ) {
    return (error as { code: number }).code;
  }

  return null;
}

function parseProviderErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Unknown wallet error";
}

export function getEthereumProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  return window.ethereum ?? null;
}

export async function switchOrAddNetwork(
  targetNetwork: SupportedNetwork,
  provider = getEthereumProvider(),
): Promise<WalletSwitchResult> {
  if (!provider) {
    return { ok: false, status: "unavailable", error: "MetaMask is not available" };
  }

  const network = getNetworkDefinition(targetNetwork);

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainIdHex }],
    });
    return { ok: true, status: "ready" };
  } catch (error) {
    if (parseProviderErrorCode(error) !== 4902) {
      return {
        ok: false,
        status: "error",
        error: parseProviderErrorMessage(error),
      };
    }
  }

  try {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: network.chainIdHex,
          chainName: network.label,
          nativeCurrency: network.nativeCurrency,
          rpcUrls: network.rpcUrls,
          blockExplorerUrls: network.blockExplorerUrls,
        },
      ],
    });
    return { ok: true, status: "added" };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      error: parseProviderErrorMessage(error),
    };
  }
}

export function subscribeToWalletChainChanges(
  onChainChange: (network: SupportedNetwork | null) => void,
  provider = getEthereumProvider(),
): () => void {
  if (!provider?.on || !provider?.removeListener) {
    return () => {};
  }

  const handler = (chainId: unknown) => {
    if (typeof chainId !== "string" && typeof chainId !== "number") {
      onChainChange(null);
      return;
    }

    onChainChange(networkFromChainId(chainId));
  };

  provider.on("chainChanged", handler);
  return () => {
    provider.removeListener?.("chainChanged", handler);
  };
}
