import { PrismaClient } from "@prisma/client";
import environment from "@/environment";

// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if(environment.NODE_ENV === "production") globalForPrisma.prisma = prisma;
