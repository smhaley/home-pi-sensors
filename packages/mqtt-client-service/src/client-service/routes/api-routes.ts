import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getVersion } from "../controllers/api-controllers";
import { sensorDataRoutes } from "./api/sensorData";
export const apiRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  next: () => void
) => {
  fastify.register(sensorDataRoutes, {
    prefix: "/sensorData",
  });
  fastify.get("/version", getVersion);
  next();
};
