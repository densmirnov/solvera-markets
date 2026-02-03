import { test } from "node:test";
import assert from "node:assert/strict";
import { SubgraphService } from "../src/subgraph.service.js";

test("normalizeLimit applies defaults and bounds", () => {
  process.env.SUBGRAPH_URL = "http://example.local";
  const service = new SubgraphService();

  assert.equal(service.normalizeLimit(undefined), 50);
  assert.equal(service.normalizeLimit("0"), 50);
  assert.equal(service.normalizeLimit("10"), 10);
  assert.equal(service.normalizeLimit("999"), 200);
});

test("query caches responses", async () => {
  process.env.SUBGRAPH_URL = "http://example.local";
  process.env.SUBGRAPH_CACHE_TTL_MS = "1000";

  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return {
      ok: true,
      json: async () => ({ data: { ok: true } })
    } as Response;
  }) as typeof fetch;

  const service = new SubgraphService();
  const query = "query { ok }";

  const first = await service.query<{ ok: boolean }>(query, {});
  const second = await service.query<{ ok: boolean }>(query, {});

  assert.deepEqual(first, { ok: true });
  assert.deepEqual(second, { ok: true });
  assert.equal(calls, 1);
});
