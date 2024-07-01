import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import { fastifyCors as FastifyCors } from "@fastify/cors";
import { fastifyCookie as FastifyCookie } from "@fastify/cookie";
import { fastifySession as FastifySession } from "@fastify/session";
import { fastifyRedis as FastifyRedis } from "@fastify/redis";
import PrismaPlugin from "@/plugins/prisma";
import MailerPlugin from "@/plugins/mailer";
import env from "@/env";
import { RootRouter } from "@/routes/router";
import { DaysAgo } from "@/utility/Props";

const app = Fastify({
  logger: true,
  bodyLimit: 1024*512
}).withTypeProvider<TypeBoxTypeProvider>();

// Plugins
//app.register(FastifyCors, {});

app.register(FastifySwagger, {
  swagger: {
    info: {
      title: "App Name",
      version: "1.0.0"
    }
  }
});

app.register(FastifySwaggerUi, {
  routePrefix: "/docs"
});

app.register(FastifyCookie);

app.register(FastifySession, {
  secret: "superveryveryveryverylongsecret-minatoaqua",
  cookieName: "backendsession",
  cookie: {
    httpOnly: true,
    secure: false
  }
});

app.register(PrismaPlugin);

/*app.register(FastifyRedis, {
  url: env.REDIS_SERVER_CONNECTION
});*/

app.register(MailerPlugin);

// Router
app.register(RootRouter, { prefix: "/api" });
app.register(async (app) => app.get("/", { schema: { tags: ["Root"] } }, async () => "Working!"));

// Startup Config
app.listen({ port: 4000, host: "0.0.0.0"}, (error) =>{
  if(error) throw error;
});
