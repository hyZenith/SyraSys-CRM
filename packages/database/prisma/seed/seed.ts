import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), "../../.env") });
import { prisma } from "../../src/client.js";

async function main(): Promise<void> {
  await prisma.$connect();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
