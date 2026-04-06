import { describe, expect, it } from "vitest";
import {
  explorerBaseUrlForNetwork,
  formatNetworkChip,
  formatNetworkLabel,
  normalizeRuntimeConfig,
  STATUS_SEPOLIA_DEFAULTS,
} from "./config";
import { getNetworkDefinition, networkFromChainId } from "./networks";

describe("runtime config helpers", () => {
  it("falls back to Status Sepolia when backend config is unavailable", () => {
    expect(normalizeRuntimeConfig(undefined)).toEqual(STATUS_SEPOLIA_DEFAULTS);
  });

  it("derives Status explorer metadata from backend config", () => {
    const config = normalizeRuntimeConfig({
      data: {
        contractAddress: "0xF79367dAB12D8E12146685dA2830f112F02De71a",
        network: "status-sepolia",
        chainId: 1660990954,
      },
    });

    expect(config.explorerBaseUrl).toBe("https://sepoliascan.status.network");
    expect(config.network).toBe("status-sepolia");
    expect(config.chainId).toBe(1660990954);
  });

  it("keeps Base mapping support for older environments", () => {
    expect(explorerBaseUrlForNetwork("base", 8453)).toBe("https://basescan.org");
  });

  it("keeps the selected network defaults when backend metadata comes from another chain", () => {
    const config = normalizeRuntimeConfig(
      {
        data: {
          contractAddress: "0xF79367dAB12D8E12146685dA2830f112F02De71a",
          network: "status-sepolia",
          chainId: 1660990954,
        },
      },
      "base",
    );

    expect(config.network).toBe("base");
    expect(config.chainId).toBe(8453);
    expect(config.contractAddress).toBe(
      "0x442D68de43B37a0B2F975dc8dEfEfC349070Fb3A",
    );
    expect(config.apiBase).toBe(getNetworkDefinition("base").apiBase);
  });

  it("maps known chain ids back to supported networks", () => {
    expect(networkFromChainId("0x2105")).toBe("base");
    expect(networkFromChainId(1660990954)).toBe("status-sepolia");
  });

  it("formats network labels for UI surfaces", () => {
    expect(formatNetworkLabel("status-sepolia")).toBe("Status Sepolia");
    expect(formatNetworkChip("status-sepolia")).toBe("STATUS");
  });
});
