import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

// Routes
import { InternalRouter } from "@/routes/internal/router";

export const RootRouter: FastifyPluginAsyncZod = async (app) =>{
  app.register(InternalRouter, { prefix: "/internal" });
};
