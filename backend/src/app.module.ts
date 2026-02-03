import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { IntentsController } from "./intents.controller.js";
import { SubgraphService } from "./subgraph.service.js";
import { RateLimitMiddleware } from "./rate-limit.middleware.js";

@Module({
  controllers: [IntentsController],
  providers: [SubgraphService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes("*");
  }
}
