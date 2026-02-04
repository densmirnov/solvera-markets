import { describe, expect, it } from "vitest";
import { formatAddress, formatAmount } from "./format";

describe("format helpers", () => {
  it("shortens long addresses", () => {
    expect(formatAddress("0x1234567890abcdef"))
      .toBe("0x1234...cdef");
  });

  it("keeps short values", () => {
    expect(formatAddress("0x1234")).toBe("0x1234");
    expect(formatAmount("123")).toBe("123");
  });
});
