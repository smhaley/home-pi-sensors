import AppDataSource from "../../db/data-source";
import { FastifyReply } from "fastify";
import TopicToEntityMapping, {
  EntityMetadataMappings,
} from "../../utils/topic-to-entity-mapping";
import {
  DataRequest,
  IntervalQuery,
  AvgDataRequest,
} from "../types/request-types";
import { QueryType } from "../constants/data-constants";

const buildQueryCondition = (
  { before, after, from, to }: IntervalQuery,
  queryType: QueryType
) => {
  let query: string | undefined;

  if (before) {
    query = `${queryType} < '${before}'`;
  }
  if (after) {
    query = `${queryType} > '${after}'`;
  }
  if (from && to) {
    query = `${queryType} >= '${from}' and ${queryType} <= '${to}'`;
  }
  return query;
};

export const getSensorData = async (
  request: DataRequest,
  reply: FastifyReply
) => {
  const { queryType, topic } = request.params;
  const { offset = 0, size = 1000, before, after, from, to } = request.query;

  const queryCondition = buildQueryCondition(
    { before, after, from, to },
    queryType
  );

  if (queryCondition) {
    const entity = TopicToEntityMapping[topic];
    const [data, total] = await AppDataSource.getRepository<
      InstanceType<typeof entity>
    >(entity)
      .createQueryBuilder()
      .where(queryCondition)
      .orderBy("timestamp")
      .skip(offset <= 1000 ? offset : 1000)
      .take(size)
      .getManyAndCount();
    reply.send({ data, queryCondition, size: data.length, offset, total });
  } else {
    reply.code(400).send({ error: "No query provided." });
  }
};

const buildAvgSelectFromData = (dataCols: string[], interval: string) => {
  let avgSelect = "";
  dataCols.forEach((colname, idx) => {
    avgSelect += `AVG(${colname}) ${colname}`;
    if (idx !== dataCols.length - 1) {
      avgSelect += ",";
    }
  });
  return `topic,
  DATE_BIN('${interval}', timestamp, '2000-01-01 00:00:00') AS interval_beginning,
  ${avgSelect}`;
};

export const getAvgSensorData = async (
  request: AvgDataRequest,
  reply: FastifyReply
) => {
  const { topic } = request.params;
  const { before, after, from, to, interval = "5 minutes" } = request.query;

  const queryCondition = buildQueryCondition(
    { before, after, from, to },
    QueryType.TIMESTAMP
  );

  if (queryCondition) {
    const entity = TopicToEntityMapping[topic];
    const entityMetadata = EntityMetadataMappings[topic];

    const avgDataSel = buildAvgSelectFromData(
      entityMetadata.dataColumns,
      interval
    );
    const data = await AppDataSource.getRepository<InstanceType<typeof entity>>(
      entity
    )
      .createQueryBuilder()
      .select(avgDataSel)
      .where(queryCondition)
      .groupBy(`interval_beginning, topic`)
      .orderBy(`interval_beginning`)
      .getRawMany();
    reply.send({ data, queryCondition, size: data.length });
  } else {
    reply.code(400).send({ error: "No query provided." });
  }
};
