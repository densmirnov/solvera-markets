import { describe, expect, it } from "vitest";
import { formatAddress, formatTokenAmount } from "./format";

describe("format helpers", () => {
  it("shortens long addresses", () => {
    expect(formatAddress("0x1234567890abcdef"))
      .toBe("0x1234...cdef");
  });

  it("keeps short values", () => {
    expect(formatAddress("0x1234")).toBe("0x1234");
    expect(formatTokenAmount("123").primary).toBe("raw 123");
  });

  it("formats USDC with 6 decimals when token address matches", () => {
    const usdcBase = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
    expect(formatTokenAmount("1000000", usdcBase).primary).toBe("1 USDC");
  });
});
