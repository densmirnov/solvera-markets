import { describe, expect, it, vi } from "vitest";
import { apiGet, apiUrl } from "./api";

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

  it("uses an override base URL when provided", async () => {
    const response = {
      ok: true,
      json: async () => ({ data: { ok: true } }),
    } as Response;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(response);

    await apiGet("/health", { baseUrl: "https://base.solvera.markets/api" });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://base.solvera.markets/api/health",
    );
    fetchSpy.mockRestore();
  });

  it("builds URLs from the default or provided API base", () => {
    expect(apiUrl("/health", "https://status.solvera.markets/api")).toBe(
      "https://status.solvera.markets/api/health",
    );
  });
});
