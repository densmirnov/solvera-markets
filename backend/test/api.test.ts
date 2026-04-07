import "reflect-metadata";
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { IntentsController } from "../src/intents.controller.js";
import { MarketReadService } from "../src/market-read.service.js";
import { SubgraphService } from "../src/subgraph.service.js";
import { TxBuilderService } from "../src/tx-builder.service.js";
import { ApiErrorFilter } from "../src/api-error.filter.js";

type SubgraphMock = Pick<SubgraphService, "query" | "normalizeLimit">;
type MarketReadMock = Pick<
  MarketReadService,
  "canServeFallback" | "listIntents" | "getIntent" | "getOffers" | "getReputation" | "getEvents"
>;

describe("backend API", () => {
  let app: INestApplication;
  let subgraph: SubgraphMock;
  let marketRead: MarketReadMock;
  let queryImpl: (gql: string) => Promise<Record<string, unknown>>;

  before(async () => {
    process.env.CONTRACT_ADDRESS = "0xF79367dAB12D8E12146685dA2830f112F02De71a";
    process.env.NETWORK_NAME = "status-sepolia";
    process.env.CHAIN_ID = "1660990954";

    queryImpl = async (gql: string) => {
      if (gql.includes("intents(") && !gql.includes("intent(id")) {
        return {
          intents: [
            {
              id: "0xintent",
              state: "OPEN",
              tokenOut: "0xtoken",
              rewardToken: "0xreward",
              minAmountOut: "100",
              rewardAmount: "10",
              initiator: "0xinit",
              payer: "0xpayer",
            },
          ],
        };
      }
      if (gql.includes("intent(id")) {
        return {
          intent: {
            id: "0xintent",
            state: "OPEN",
            tokenOut: "0xtoken",
            rewardToken: "0xreward",
            minAmountOut: "100",
            rewardAmount: "10",
            initiator: "0xinit",
            payer: "0xpayer",
            verifier: "0xverifier",
          },
        };
      }
      if (gql.includes("offers(")) {
        return {
          offers: [
            {
              id: "0xoffer",
              solver: "0xsolver",
              amountOut: "110",
              timestamp: "1710000000",
            },
          ],
        };
      }
      if (gql.includes("eventLogs")) {
        return { eventLogs: [] };
      }
      if (gql.includes("reputation")) {
        return { reputation: { id: "0xsolver", value: "1" } };
      }
      return {};
    };

    subgraph = {
      normalizeLimit: () => 50,
      query: async (gql: string) => queryImpl(gql),
    };
    marketRead = {
      canServeFallback: () => true,
      listIntents: async () => [
        {
          id: "0xfallback-intent",
          state: "OPEN",
          tokenOut: "0xtoken",
          rewardToken: "0xreward",
          minAmountOut: "100",
          rewardAmount: "10",
          initiator: "0xinit",
          payer: "0xpayer",
          verifier: "0xverifier",
          winner: "0x0000000000000000000000000000000000000000",
          winnerAmountOut: "0",
          bondAmount: "0",
          updatedAt: "1710000000",
          createdAt: "1710000000",
          txHash: "0xhash",
        },
      ],
      getIntent: async () => ({
        id: "0xfallback-intent",
        state: "OPEN",
        tokenOut: "0xtoken",
        rewardToken: "0xreward",
        minAmountOut: "100",
        rewardAmount: "10",
        initiator: "0xinit",
        payer: "0xpayer",
        verifier: "0xverifier",
        winner: "0x0000000000000000000000000000000000000000",
        winnerAmountOut: "0",
        bondAmount: "0",
        updatedAt: "1710000000",
        createdAt: "1710000000",
        txHash: "0xhash",
      }),
      getOffers: async () => [
        {
          id: "0xfallback-offer",
          solver: "0xsolver",
          amountOut: "110",
          timestamp: "1710000000",
          txHash: "0xofferhash",
        },
      ],
      getReputation: async () => ({
        id: "0xsolver",
        value: "2",
        updatedAt: "1710000000",
        txHash: "0xrephash",
      }),
      getEvents: async () => [
        {
          id: "0xevent",
          eventType: "IntentCreated",
          intent: { id: "0xfallback-intent" },
          solver: null,
          amountOut: null,
          feeAmount: null,
          refundAmount: null,
          bondAmount: null,
          rewardAmount: "10",
          reason: null,
          blockNumber: "18800150",
          blockTimestamp: "1710000000",
          txHash: "0xhash",
        },
      ],
    };

    const txBuilder = {
      buildCreateIntent: () => ({
        to: "0xcontract",
        calldata: "0xabc",
        value: "0",
      }),
      buildSubmitOffer: () => ({
        to: "0xcontract",
        calldata: "0xdef",
        value: "0",
      }),
      buildSelectWinner: () => ({
        to: "0xcontract",
        calldata: "0x123",
        value: "0",
      }),
      buildFulfill: () => ({ to: "0xcontract", calldata: "0x456", value: "0" }),
      buildExpire: () => ({ to: "0xcontract", calldata: "0x789", value: "0" }),
    };

    Reflect.defineMetadata(
      "design:paramtypes",
      [SubgraphService, MarketReadService, TxBuilderService],
      IntentsController,
    );

    const moduleRef = await Test.createTestingModule({
      controllers: [IntentsController],
      providers: [
        { provide: SubgraphService, useValue: subgraph },
        { provide: MarketReadService, useValue: marketRead },
        { provide: TxBuilderService, useValue: txBuilder },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new ApiErrorFilter());
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  test("GET /api/health", async () => {
    const res = await request(app.getHttpServer()).get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.data.status, "ok");
  });

  test("GET /api/config", async () => {
    const res = await request(app.getHttpServer()).get("/api/config");
    assert.equal(res.status, 200);
    assert.equal(
      res.body.data.contractAddress,
      "0xF79367dAB12D8E12146685dA2830f112F02De71a",
    );
    assert.equal(res.body.data.network, "status-sepolia");
    assert.equal(res.body.data.chainId, 1660990954);
  });

  test("GET /api/intents returns next_steps", async () => {
    const res = await request(app.getHttpServer()).get("/api/intents");
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(res.body.data.length, 1);
    assert.ok(res.body.next_steps.length > 0);
  });

  test("GET /api/intents/:id includes next_steps", async () => {
    const res = await request(app.getHttpServer()).get("/api/intents/0xintent");
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(res.body.data.state, "OPEN");
    assert.ok(res.body.next_steps.length > 0);
  });

  test("GET /api/intents/:id/offers returns list", async () => {
    const res = await request(app.getHttpServer()).get(
      "/api/intents/0xintent/offers",
    );
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(res.body.data.length, 1);
  });

  test("GET /api/reputation returns solver data", async () => {
    const res = await request(app.getHttpServer()).get(
      "/api/reputation/0xsolver",
    );
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(res.body.data.id, "0xsolver");
  });

  test("GET /api/events returns empty list", async () => {
    const res = await request(app.getHttpServer()).get("/api/events");
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.deepEqual(res.body.data, []);
  });

  test("POST /api/intents validates input", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/intents")
      .send({});
    assert.equal(res.status, 400);
    assert.equal(res.body.error.code, "INVALID_REQUEST");
  });

  test("POST /api/intents returns calldata", async () => {
    const res = await request(app.getHttpServer()).post("/api/intents").send({
      tokenOut: "0xtoken",
      minAmountOut: "100",
      rewardToken: "0xreward",
      rewardAmount: "10",
      ttlSubmit: 100,
      ttlAccept: 200,
      payer: "0xpayer",
      initiator: "0xinit",
      verifier: "0xverifier",
    });
    assert.equal(res.status, 201, JSON.stringify(res.body));
    assert.ok(res.body.data.calldata);
    assert.ok(res.body.next_steps.length > 0);
    assert.equal(res.body.next_steps[0].network, "status-sepolia");
  });

  test("POST /api/intents/:id/offers returns calldata", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/intents/0xintent/offers")
      .send({ amountOut: "110" });
    assert.equal(res.status, 201, JSON.stringify(res.body));
    assert.ok(res.body.data.calldata);
  });

  test("POST /api/intents/:id/select-winner returns calldata", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/intents/0xintent/select-winner")
      .send({ solver: "0xsolver", amountOut: "110" });
    assert.equal(res.status, 201, JSON.stringify(res.body));
    assert.ok(res.body.data.calldata);
  });

  test("POST /api/intents/:id/fulfill returns calldata", async () => {
    const res = await request(app.getHttpServer()).post(
      "/api/intents/0xintent/fulfill",
    );
    assert.equal(res.status, 201, JSON.stringify(res.body));
    assert.ok(res.body.data.calldata);
  });

  test("POST /api/intents/:id/expire returns calldata", async () => {
    const res = await request(app.getHttpServer()).post(
      "/api/intents/0xintent/expire",
    );
    assert.equal(res.status, 201, JSON.stringify(res.body));
    assert.ok(res.body.data.calldata);
  });

  test("handles subgraph errors with error payload", async () => {
    const original = queryImpl;
    const originalFallback = marketRead.canServeFallback;
    marketRead.canServeFallback = () => false;
    queryImpl = async () => {
      throw new Error("Subgraph failure");
    };
    const res = await request(app.getHttpServer()).get("/api/intents");
    assert.equal(res.status, 500);
    assert.equal(res.body.error.code, "INTERNAL_ERROR");
    queryImpl = original;
    marketRead.canServeFallback = originalFallback;
  });

  test("falls back to RPC read model when subgraph is unavailable", async () => {
    const original = queryImpl;
    queryImpl = async () => {
      throw new Error("Subgraph error: deployment missing");
    };
    const res = await request(app.getHttpServer()).get("/api/intents");
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(res.body.data[0].id, "0xfallback-intent");
    queryImpl = original;
  });
});
