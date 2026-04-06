export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export interface ApiRequestOptions {
  baseUrl?: string;
}

export function apiUrl(path: string, baseUrl = API_BASE): string {
  return `${baseUrl}${path}`;
}

export async function apiGet<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(apiUrl(path, options.baseUrl));
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(payload?.error?.message || "Request failed");
  }
  return (await response.json()) as T;
}
