import { SupportedTopics } from "../../constants/topics";

// export type SupportedTopics = typeof UPSTAIRS_ENV | typeof BOILER_TEMP;

export type UpstairsEnvData = {
  temp: number;
  pressure: number;
  humidity: number;
};

export type BoilerTempData = {
  temp: number;
};

export type TopicToType = {
  [SupportedTopics.UPSTAIRS_ENV]: UpstairsEnvData;
  [SupportedTopics.BOILER_TEMP]: BoilerTempData;
};

export type TopicToDataType<T extends keyof TopicToType> = TopicToType[T];

export type MQTTMessage<T> = {
  topic: string;
  reading_delay: string;
  data: T[];
};

export type MQTTData<T> = T & {
  topic: string;
  timestamp: Date;
};
