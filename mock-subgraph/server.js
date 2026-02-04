const http = require("http");

const intent = {
  id: "0xintent",
  state: "OPEN",
  tokenOut: "0xtoken",
  rewardToken: "0xreward",
  minAmountOut: "100",
  rewardAmount: "10",
  payer: "0xpayer",
  initiator: "0xinitiator",
  verifier: "0xverifier",
  winner: "0xwinner",
  winnerAmountOut: "110",
  bondAmount: "1",
  createdAt: "0",
  updatedAt: "0",
  txHash: "0xtx"
};

const offers = [
  {
    id: "0xoffer",
    solver: "0xsolver",
    amountOut: "110",
    timestamp: "1710000000",
    txHash: "0xtx"
  }
];

const eventLogs = [
  {
    id: "0xevent",
    eventType: "IntentCreated",
    intent: { id: intent.id },
    solver: "0xsolver",
    amountOut: "110",
    feeAmount: "0",
    refundAmount: "0",
    bondAmount: "1",
    rewardAmount: "10",
    reason: "",
    blockNumber: "1",
    blockTimestamp: "1710000000",
    txHash: "0xtx"
  }
];

function handler(query) {
  if (query.includes("intent(id")) {
    return { data: { intent } };
  }
  if (query.includes("intents(")) {
    return { data: { intents: [intent] } };
  }
  if (query.includes("offers(")) {
    return { data: { offers } };
  }
  if (query.includes("eventLogs(")) {
    return { data: { eventLogs } };
  }
  if (query.includes("reputation")) {
    return { data: { reputation: { id: "0xsolver", value: "1", updatedAt: "0", txHash: "0xtx" } } };
  }
  return { data: {} };
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "method_not_allowed" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    let parsed = {};
    try {
      parsed = JSON.parse(body || "{}");
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "invalid_json" }));
      return;
    }

    const query = parsed.query || "";
    const response = handler(query);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(response));
  });
});

const port = Number(process.env.MOCK_SUBGRAPH_PORT || 4000);
server.listen(port, () => {
  console.log(`mock subgraph running on ${port}`);
});
