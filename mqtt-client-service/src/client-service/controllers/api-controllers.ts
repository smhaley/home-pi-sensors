import { FastifyReply, FastifyRequest } from "fastify";
import { version } from "../../../package.json";

export const getVersion = (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ version });
};
