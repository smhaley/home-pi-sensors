import { MQTTMessage } from "../types/message-types";

export const buildMQTTData = <T>(mqttPayload: MQTTMessage<T>) => {
  const { data, reading_delay, topic } = mqttPayload;
  const delta = parseInt(reading_delay) * 1000;
  const now = Date.now();
  return data.map((item, idx, items) => {
    const queueLength = items.length;
    return {
      topic,
      timestamp: new Date(now - (queueLength - 1 - idx) * delta),
      ...item,
    };
  });
};
