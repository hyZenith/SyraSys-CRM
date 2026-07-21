import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Resolve and load the monorepo root .env BEFORE anything reads process.env.
// This works whether executed from src/ (tsx) or dist/ (node) because both
// directories are 3 levels below the monorepo root:
//   packages/database/src/client.ts  → ../../../.env  ✓
//   packages/database/dist/client.js → ../../../.env  ✓
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../../.env"), override: false });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[database/client] DATABASE_URL is not set. " + "Make sure .env exists at the monorepo root.",
  );
}

// Create connection pool and adapter
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
