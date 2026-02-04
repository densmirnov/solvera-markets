import { describe, expect, it, vi } from "vitest";
import { apiGet } from "./api";

describe("apiGet", () => {
  it("returns JSON on success", async () => {
    const response = {
      ok: true,
      json: async () => ({ data: { ok: true } })
    } as Response;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(response);

    const result = await apiGet<{ data: { ok: boolean } }>("/health");
    expect(result.data.ok).toBe(true);

    fetchSpy.mockRestore();
  });

  it("throws on error responses", async () => {
    const response = {
      ok: false,
      json: async () => ({ error: { message: "Bad request" } })
    } as Response;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(response);

    await expect(apiGet("/bad")).rejects.toThrow("Bad request");

    fetchSpy.mockRestore();
  });
});
