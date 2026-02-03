import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { IntentsController } from "./intents.controller.js";
import { SubgraphService } from "./subgraph.service.js";
import { RateLimitMiddleware } from "./rate-limit.middleware.js";
import { TxBuilderService } from "./tx-builder.service.js";
import { WriteAuthMiddleware } from "./write-auth.middleware.js";

@Module({
  controllers: [IntentsController],
  providers: [SubgraphService, TxBuilderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WriteAuthMiddleware).forRoutes("*");
    consumer.apply(RateLimitMiddleware).forRoutes("*");
  }
}
