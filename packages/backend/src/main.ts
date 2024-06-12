import Fastify from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import { ZodTypeProvider, validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { RootRouter } from "@/routes/router";

const app = Fastify({
  logger: true,
  bodyLimit: 1024*512
}).withTypeProvider<ZodTypeProvider>();

// Plugin
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(FastifySwagger, {
  swagger: {
    info: {
      title: "App Name",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});

app.register(FastifySwaggerUi, {
  routePrefix: "/docs"
});

// Router
app.register(RootRouter);

app.get("/", async () => "Working!");

// Startup Config
app.listen({ port: 4000, host: "0.0.0.0"}, (error) =>{
  if(error) throw error;
});
