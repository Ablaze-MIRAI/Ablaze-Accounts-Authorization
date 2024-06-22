import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import * as Guard from "@/utility/GuardService";

// Routes
import { AuthEmailSignupRouter } from "./auth/email/signup";
import { AuthEmailSigninRouter } from "./auth/email/signin";
import { AuthSessionRouter } from "./auth/session";
import { UserRouter } from "./user";
import { OAuth2Router } from "./oauth2";

export const RootRouter: FastifyPluginAsyncTypebox = async (app) =>{
  app.register(AuthEmailSignupRouter, { prefix: "/auth/email/signup" });
  app.register(AuthEmailSigninRouter, { prefix: "/auth/email/signin" });
  app.register(AuthSessionRouter, { prefix: "/auth/session" });
  app.register(UserRouter, { prefix: "/user" });
  app.register(OAuth2Router, { prefix: "/oauth2" });

  const RootSchema = Type.Object({ name: Type.Optional(Type.String()) });
  app.get("/", { schema: { querystring: RootSchema, tags: ["Root"] } }, async (request) =>{
    const { name } = request.query;
    return `Working! ${name??""}`;
  });
};
