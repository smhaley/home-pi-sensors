import { FastifyReply } from "fastify";
import TopicToEntityMapping from "../../../utils/topic-to-entity-mapping";
import { DataRequest } from "../../types/request-types";
import { QueryType } from "../../constants/data-constants";

export const validTopicTableHook = (
  request: DataRequest,
  reply: FastifyReply,
  done: any
) => {
  const { topic } = request.params;
  const entity = TopicToEntityMapping[topic];
  if (!entity) {
    reply.code(404).send({ error: `'${topic}' topic not found` });
  }
  done();
};

export const validQueryTypeHook = (
  request: DataRequest,
  reply: FastifyReply,
  done: any
) => {
  const { queryType } = request.params;
  const validQueryKeys = Object.values(QueryType);

  if (!validQueryKeys.includes(queryType)) {
    reply.code(404).send({
      error: `'${queryType}' is not valid. Only '${validQueryKeys.toString()}' may be used`,
    });
  }
  done();
};
