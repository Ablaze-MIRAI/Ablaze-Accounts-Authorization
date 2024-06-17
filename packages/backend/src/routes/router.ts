import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

// Routes
import { AuthEmailSignupRouter } from "./auth/email/signup";

export const RootRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.register(AuthEmailSignupRouter, { prefix: "/auth/email/signup" });

  const RootSchema = Type.Object({ name: Type.Optional(Type.String()) });
  app.get("/", { schema: { querystring: RootSchema, tags: ["Root"] } }, async (request) =>{
    const { name } = request.query;
    return `Working! ${name??""}`;
  });
};
