import compression from "compression";
import cookieParser from "cookie-parser";
import "dotenv/config";
import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });
  app.setGlobalPrefix(process.env.API_PREFIX ?? "api");

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}

void bootstrap();
