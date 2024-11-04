import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getUiSettings,
  upsertUiSettings,
} from "../../../controllers/ui-settings-controllers";
import { validJSONHook } from "../../../hooks/uiSettingsHooks/valid-request-params.hook";

export const uiSettingsRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  next: () => void
) => {
  fastify.get("/", {}, getUiSettings);
  fastify.post("/", { preHandler: validJSONHook }, upsertUiSettings);
  next();
};
