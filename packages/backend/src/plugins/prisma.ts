import FastifyPlugin from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const PrismaPlugin: FastifyPluginAsync = FastifyPlugin(async (server, _options) =>{
  const prisma = new PrismaClient();
  await prisma.$connect();
  server.decorate("prisma", prisma);
  server.addHook("onClose", async (server) => await server.prisma.$disconnect());
});

export default PrismaPlugin;
