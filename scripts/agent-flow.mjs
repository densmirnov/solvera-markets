import assert from "node:assert/strict";

const base = process.env.AGENT_API_BASE || "http://localhost:3000/api";

async function requestJson(path, options) {
  const response = await fetch(`${base}${path}`, {
    headers: { "content-type": "application/json" },
    ...options
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || "Request failed");
  }
  return payload;
}

async function run() {
  const health = await requestJson("/health");
  assert.equal(health.data.status, "ok");

  const config = await requestJson("/config");
  assert.ok(config.data.contractAddress);

  const intents = await requestJson("/intents");
  assert.ok(Array.isArray(intents.data));
  assert.ok(intents.next_steps);

  if (intents.data.length > 0) {
    const id = intents.data[0].id;
    const intent = await requestJson(`/intents/${id}`);
    assert.equal(intent.data.id, id);
    assert.ok(intent.next_steps);

    const offers = await requestJson(`/intents/${id}/offers`);
    assert.ok(Array.isArray(offers.data));
  }

  const tx = await requestJson("/intents", {
    method: "POST",
    body: JSON.stringify({
      tokenOut: "0xtoken",
      minAmountOut: "100",
      rewardToken: "0xreward",
      rewardAmount: "10",
      ttlSubmit: 100,
      ttlAccept: 200,
      payer: "0xpayer",
      initiator: "0xinitiator",
      verifier: "0xverifier"
    })
  });
  assert.ok(tx.data.calldata);
  assert.ok(tx.next_steps.length > 0);

  console.log("agent flow ok");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
