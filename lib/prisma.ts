import { PrismaClient } from "@prisma/client";
import { CustomError } from "./Error";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ["info", "warn", "error"], // ✅ Helps debug connection issues
  });

export async function ensureDatabaseConnection() {
  try {

    await prisma.$connect();
    console.log("✅ Database Connected Successfully");
  } catch (error) {

    console.error("❌ Database Connection Failed:");

    // Check for specific Prisma errors
    if (error instanceof Error) {
      console.error("Message:", error.message);
    }

    if (typeof error === "object" && error !== null) {
      console.error("Full Error:", JSON.stringify(error, null, 2));
    }

    throw new CustomError("Database is not available. Please try again later.", false, 500);  
  }
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
