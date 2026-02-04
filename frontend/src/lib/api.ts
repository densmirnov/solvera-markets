export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(payload?.error?.message || "Request failed");
  }
  return (await response.json()) as T;
}
