import { describe, expect, it, vi } from "vitest";
import { switchOrAddNetwork, subscribeToWalletChainChanges } from "./wallet";

describe("wallet network helpers", () => {
  it("switches directly when the chain already exists", async () => {
    const request = vi.fn().mockResolvedValue(undefined);

    const result = await switchOrAddNetwork("base", { request });

    expect(result).toEqual({ ok: true, status: "ready" });
    expect(request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x2105" }],
    });
  });

  it("adds the chain after MetaMask error 4902", async () => {
    const request = vi
      .fn()
      .mockRejectedValueOnce({ code: 4902, message: "Unknown chain" })
      .mockResolvedValueOnce(undefined);

    const result = await switchOrAddNetwork("status-sepolia", { request });

    expect(result).toEqual({ ok: true, status: "added" });
    expect(request).toHaveBeenNthCalledWith(2, {
      method: "wallet_addEthereumChain",
      params: [
        expect.objectContaining({
          chainId: "0x6300b5ea",
          chainName: "Status Sepolia",
          rpcUrls: ["https://public.sepolia.rpc.status.network"],
          blockExplorerUrls: ["https://sepoliascan.status.network"],
        }),
      ],
    });
  });

  it("subscribes to chainChanged and normalizes supported networks", () => {
    const listeners = new Map<string, (...args: unknown[]) => void>();
    const provider = {
      request: vi.fn(),
      on: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
        listeners.set(event, listener);
      }),
      removeListener: vi.fn((event: string) => {
        listeners.delete(event);
      }),
    };
    const onChange = vi.fn();

    const unsubscribe = subscribeToWalletChainChanges(onChange, provider);
    listeners.get("chainChanged")?.("0x2105");
    listeners.get("chainChanged")?.("0x6300b5ea");

    expect(onChange).toHaveBeenNthCalledWith(1, "base");
    expect(onChange).toHaveBeenNthCalledWith(2, "status-sepolia");

    unsubscribe();
    expect(provider.removeListener).toHaveBeenCalled();
  });
});
