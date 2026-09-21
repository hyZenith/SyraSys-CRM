import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  // Disable NestJS's built-in body parser so Better Auth's toNodeHandler
  // can read the raw request stream for auth routes.
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(compression());
  app.use(cookieParser());

  // Re-enable body parsing only for non-auth routes
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith("/api/auth")) {
      return next();
    }
    express.json()(req, res, () => express.urlencoded({ extended: true })(req, res, next));
  });

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  });
  app.setGlobalPrefix(process.env.API_PREFIX ?? "api");

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}

void bootstrap();

