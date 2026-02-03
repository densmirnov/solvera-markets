import { Module } from "@nestjs/common";
import { IntentsController } from "./intents.controller.js";
import { SubgraphService } from "./subgraph.service.js";

@Module({
  controllers: [IntentsController],
  providers: [SubgraphService]
})
export class AppModule {}
