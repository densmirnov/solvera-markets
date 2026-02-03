import { Injectable } from "@nestjs/common";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;
const DEFAULT_CACHE_TTL_MS = 5000;

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

@Injectable()
export class SubgraphService {
  private endpoint: string;
  private cache = new Map<string, CacheEntry<unknown>>();

  constructor() {
    this.endpoint = process.env.SUBGRAPH_URL || "";
    if (!this.endpoint) {
      throw new Error("SUBGRAPH_URL is required");
    }
  }

  async query<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const cacheKey = JSON.stringify({ query, variables });
    const now = Date.now();
    const ttl = Number(process.env.SUBGRAPH_CACHE_TTL_MS || DEFAULT_CACHE_TTL_MS);

    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      return cached.value as T;
    }

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`Subgraph error: ${response.status}`);
    }

    const payload = await response.json();
    if (payload.errors) {
      throw new Error(`Subgraph error: ${JSON.stringify(payload.errors)}`);
    }

    this.cache.set(cacheKey, { value: payload.data, expiresAt: now + ttl });
    return payload.data as T;
  }

  normalizeLimit(raw: string | undefined): number {
    const limit = Number(raw || DEFAULT_LIMIT);
    if (Number.isNaN(limit) || limit <= 0) return DEFAULT_LIMIT;
    return Math.min(limit, MAX_LIMIT);
  }
}
