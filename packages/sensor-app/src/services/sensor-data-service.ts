import { get } from "./api/api";
import {
  TopicToResponseType,
  TopicToResponseTypeAvg,
} from "../types/sensor-data";
import { Intervals } from "../constants/sensor-data-intervals";
import { SensorTopics } from "../constants/sensor-topics";

type SensorToResponseType<T> = T extends SensorTopics
  ? TopicToResponseType[T]
  : never;

type SensorToResponseTypeAvg<T> = T extends SensorTopics
  ? TopicToResponseTypeAvg[T]
  : never;

const timeQueryBuilder = (after?: string, from?: string, to?: string) => {
  let query: string | undefined = undefined;
  if (after) {
    query = `after=${after}`;
  }
  if (!after && from && to) {
    query = `from=${from}&to=${to}`;
  }
  return query;
};

const getSensorData = async <T>(
  sensorTopic: SensorTopics,
  after?: string,
  from?: string,
  to?: string,
  offset = 0
): Promise<T> => {
  const timeQuery = timeQueryBuilder(after, from, to);

  return <T>(
    get(
      `sensorData/${sensorTopic}/timestamp?${timeQuery}&offset=${offset}&size=1000`
    )
  );
};

const getAvgSensorData = async <T>(
  sensorTopic: SensorTopics,
  after?: string,
  from?: string,
  to?: string,
  interval = Intervals.FIVE_MINUTES
): Promise<T> => {
  const timeQuery = timeQueryBuilder(after, from, to);

  return <T>(
    get(
      `sensorData/${sensorTopic}/avgOverInterval?${timeQuery}&interval=${interval}`
    )
  );
};

export const getEnvSensorDataAfter = async <T extends SensorTopics>(
  sensorTopic: T,
  after: string,
  offset?: number
): Promise<SensorToResponseType<T>> => {
  return getSensorData(sensorTopic, after, undefined, undefined, offset);
};

export const getSensorDataBetween = async <T extends SensorTopics>(
  sensorTopic: T,
  from: string,
  to: string,
  offset?: number
): Promise<SensorToResponseType<T>> => {
  return getSensorData(sensorTopic, undefined, from, to, offset);
};

export const getAvgSensorDataAfter = async <T extends SensorTopics>(
  sensorTopic: T,
  after: string,
  interval?: Intervals
): Promise<SensorToResponseTypeAvg<T>> => {
  return getAvgSensorData(sensorTopic, after, undefined, undefined, interval);
};

export const getAvgSensorDataBetween = async <T extends SensorTopics>(
  sensorTopic: T,
  from: string,
  to: string,
  interval?: Intervals
): Promise<SensorToResponseTypeAvg<T>> => {
  return getAvgSensorData(sensorTopic, undefined, from, to, interval);
};
