import { FastifyReply } from "fastify";
import { UiSettingsRequest } from "../../types/request-types";

export const validJSONHook = (
  request: UiSettingsRequest,
  reply: FastifyReply,
  done: any
) => {
  const { body } = request;

  if (body.settings === undefined) {
    reply.code(400).send({ error: "settings property is missing" });
  }

  done();
};
