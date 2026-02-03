import { Injectable } from "@nestjs/common";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

@Injectable()
export class SubgraphService {
  private endpoint: string;

  constructor() {
    this.endpoint = process.env.SUBGRAPH_URL || "";
    if (!this.endpoint) {
      throw new Error("SUBGRAPH_URL is required");
    }
  }

  async query<T>(query: string, variables: Record<string, unknown>): Promise<T> {
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

    return payload.data as T;
  }

  normalizeLimit(raw: string | undefined): number {
    const limit = Number(raw || DEFAULT_LIMIT);
    if (Number.isNaN(limit) || limit <= 0) return DEFAULT_LIMIT;
    return Math.min(limit, MAX_LIMIT);
  }
}
