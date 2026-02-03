import { Controller, Get, Param, Query } from "@nestjs/common";
import { SubgraphService } from "./subgraph.service.js";

@Controller()
export class IntentsController {
  constructor(private readonly subgraph: SubgraphService) {}

  @Get("/intents")
  async listIntents(@Query() query: Record<string, string>) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const where: Record<string, string> = {};
    ["state", "tokenOut", "rewardToken", "initiator", "payer", "verifier", "winner"].forEach((key) => {
      if (query[key]) where[key] = query[key];
    });

    const gql = `
      query Intents($limit: Int!, $where: Intent_filter) {
        intents(first: $limit, orderBy: updatedAt, orderDirection: desc, where: $where) {
          id
          state
          tokenOut
          rewardToken
          minAmountOut
          rewardAmount
          payer
          initiator
          verifier
          winner
          winnerAmountOut
          bondAmount
          updatedAt
          txHash
        }
      }
    `;

    return this.subgraph.query(gql, { limit, where });
  }

  @Get("/intents/:id")
  async getIntent(@Param("id") id: string) {
    const gql = `
      query Intent($id: ID!) {
        intent(id: $id) {
          id
          state
          tokenOut
          rewardToken
          minAmountOut
          rewardAmount
          payer
          initiator
          verifier
          winner
          winnerAmountOut
          bondAmount
          createdAt
          updatedAt
          txHash
        }
      }
    `;
    return this.subgraph.query(gql, { id });
  }

  @Get("/intents/:id/offers")
  async getOffers(@Param("id") id: string, @Query() query: Record<string, string>) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const gql = `
      query Offers($intent: ID!, $limit: Int!) {
        offers(first: $limit, orderBy: timestamp, orderDirection: desc, where: { intent: $intent }) {
          id
          solver
          amountOut
          timestamp
          txHash
        }
      }
    `;
    return this.subgraph.query(gql, { intent: id, limit });
  }

  @Get("/reputation/:address")
  async getReputation(@Param("address") address: string) {
    const gql = `
      query Reputation($id: ID!) {
        reputation(id: $id) {
          id
          value
          updatedAt
          txHash
        }
      }
    `;
    return this.subgraph.query(gql, { id: address.toLowerCase() });
  }

  @Get("/events")
  async getEvents(@Query() query: Record<string, string>) {
    const limit = this.subgraph.normalizeLimit(query.limit);
    const where: Record<string, string> = {};
    if (query.intentId) where.intent = query.intentId;
    if (query.eventType) where.eventType = query.eventType;
    if (query.solver) where.solver = query.solver;

    const gql = `
      query Events($limit: Int!, $where: EventLog_filter) {
        eventLogs(first: $limit, orderBy: blockTimestamp, orderDirection: desc, where: $where) {
          id
          eventType
          intent { id }
          solver
          amountOut
          feeAmount
          refundAmount
          bondAmount
          rewardAmount
          reason
          blockNumber
          blockTimestamp
          txHash
        }
      }
    `;
    return this.subgraph.query(gql, { limit, where });
  }
}
