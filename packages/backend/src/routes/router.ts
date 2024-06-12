import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

// Routes
import { InternalRouter } from "@/routes/internal/router";
import { TokenRouter } from "@/routes/token/router";

export const RootRouter: FastifyPluginAsyncZod = async (app) =>{
  app.register(InternalRouter, { prefix: "/internal" });
  app.register(TokenRouter, { prefix: "/token" });
};
