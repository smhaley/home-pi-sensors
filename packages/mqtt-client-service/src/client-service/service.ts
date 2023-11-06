import Fastify from "fastify";
import { apiRoutes } from "./routes/api-routes";
import helmet from "@fastify/helmet";

export const buildFastifyService = () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(helmet);
  fastify.register(apiRoutes, {
    prefix: "/api",
  });

  return fastify;
};
