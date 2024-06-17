import Fastify from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import FastifyCookie from "@fastify/cookie";
import FastifySession from "@fastify/session";
import MailerPlugin from "@/plugins/mailer";
import { RootRouter } from "@/routes/router";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Static, Type } from "@sinclair/typebox";

const app = Fastify({
  logger: true,
  bodyLimit: 1024*512
}).withTypeProvider<TypeBoxTypeProvider>();

// Plugins
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
  cookie: { secure: false }
});

app.register(MailerPlugin);

// Router
app.register(RootRouter);

const sch = Type.Object({ st: Type.String()});
app.get("/a", { schema: { querystring: sch } }, async (request) =>{
  request.query.st
})

// Startup Config
app.listen({ port: 4000, host: "0.0.0.0"}, (error) =>{
  if(error) throw error;
});
