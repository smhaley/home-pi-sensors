import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getSensorData,
  getAvgSensorData,
} from "../../controllers/sensor-data-controllers";

import {
  validTopicTableHook,
  validQueryTypeHook,
} from "../../hooks/sensorDataHooks/valid-request-params.hooks";

export const sensorDataRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  next: () => void
) => {
  fastify.addHook("preHandler", validTopicTableHook);
  fastify.get(
    "/:topic/:queryType",
    { preHandler: validQueryTypeHook },
    getSensorData
  );
  fastify.get("/:topic/avgOverInterval", getAvgSensorData);
  next();
};
