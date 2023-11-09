import { FastifyReply, FastifyRequest } from "fastify";

const version = process.env.npm_package_version ?? "1.0.0";
export const getVersion = (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ version });
};
