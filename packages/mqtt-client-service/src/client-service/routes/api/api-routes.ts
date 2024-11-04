import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getVersion } from "../../controllers/api-controllers";
import { sensorDataRoutes } from "./sensorData/sensorData-routes";
import { uiSettingsRoutes } from "./uiSettings/uiSettings-routes";

export const apiRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  next: () => void
) => {
  fastify.register(sensorDataRoutes, {
    prefix: "/sensorData",
  });
  fastify.register(uiSettingsRoutes, {
    prefix: "/settings",
  });
  fastify.get("/version", getVersion);
  next();
};
