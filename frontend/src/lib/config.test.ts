import { describe, expect, it } from "vitest";
import {
  explorerBaseUrlForNetwork,
  formatNetworkChip,
  formatNetworkLabel,
  normalizeRuntimeConfig,
  STATUS_SEPOLIA_DEFAULTS,
} from "./config";

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

  it("formats network labels for UI surfaces", () => {
    expect(formatNetworkLabel("status-sepolia")).toBe("Status Sepolia");
    expect(formatNetworkChip("status-sepolia")).toBe("STATUS");
  });
});
