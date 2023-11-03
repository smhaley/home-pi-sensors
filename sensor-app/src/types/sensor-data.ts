import { SensorTopics } from "../constants/sensor-topics";

export type TopicToResponseTypeAvg = {
  [SensorTopics.UPSTAIRS_ENV]: AvgUpstairsEnvDataResponse;
  [SensorTopics.BOILER_TEMP]: AvgBoilerTempDataResponse;
};

export type TopicToResponseType = {
  [SensorTopics.UPSTAIRS_ENV]: UpstairsEnvDataResponse;
  [SensorTopics.BOILER_TEMP]: BoilerTempDataResponse;
};

export type SensorData<T> = T & {
  id: string;
  topic: string;
  timestamp: Date;
};

export type UpstairsEnvData = {
  temp: number;
  pressure: number;
  humidity: number;
};

export type BoilerTempData = {
  temp: number;
};

export type AvgSensorData<T> = T & {
  topic: string;
  interval_beginning: Date;
};

export type AvgSensorResponse<T> = {
  queryCondition: string;
  size: number;
  data: AvgSensorData<T>[];
};

export type SensorDataResponse<T> = {
  queryCondition: string;
  size: number;
  offset: number;
  total: number;
  data: T[];
};

export type AvgUpstairsEnvData = AvgSensorData<UpstairsEnvData>;
export type AvgBoilerTempData = AvgSensorData<BoilerTempData>;

export type UpstairsEnvDataResponse = SensorDataResponse<UpstairsEnvData>;
export type BoilerTempDataResponse = SensorDataResponse<BoilerTempData>;

export type AvgUpstairsEnvDataResponse = AvgSensorResponse<UpstairsEnvData>;
export type AvgBoilerTempDataResponse = AvgSensorResponse<BoilerTempData>;
