import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ApiErrorFilter } from "./api-error.filter.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  const corsOrigin = process.env.CORS_ORIGIN;
  const normalizedOrigin =
    !corsOrigin || corsOrigin.trim() === "*"
      ? true
      : corsOrigin.split(",").map((value) => value.trim());
  app.enableCors({
    origin: normalizedOrigin,
    methods: ["GET", "POST", "OPTIONS"],
  });
  app.useGlobalFilters(new ApiErrorFilter());
  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
}

bootstrap();
