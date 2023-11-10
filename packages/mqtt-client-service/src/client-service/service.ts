import Fastify from "fastify";
import { apiRoutes } from "./routes/api/api-routes";
import fastifyStatic from "@fastify/static";
import * as path from "path";

export const buildFastifyService = () => {
  const fastify = Fastify({
    logger: true,
  });

  //production only
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  });

  fastify.register(apiRoutes, {
    prefix: "/api",
  });

  return fastify;
};
