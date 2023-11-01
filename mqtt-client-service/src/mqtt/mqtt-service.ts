import "dotenv/config";
import { buildMQTTData } from "./utils/transformers";
import TopicToEntityMapping from "../utils/topic-to-entity-mapping";
import {
  MQTTData,
  MQTTMessage,
  TopicToType,
} from "./types/message-types";
import { connect, MqttClient } from "mqtt";
import AppDataSource from "../db/data-source";
import {
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_HOST,
  MQTT_CLIENT_ID,
} from "../../config";
import {  SupportedTopics } from "../constants/topics";

export class MqttService {
  private client: MqttClient;
  private AppDataSource = AppDataSource;

  constructor() {
    this.client = connect(`mqtt://${MQTT_HOST}`, {
      clientId: MQTT_CLIENT_ID,
      clean: true,
      connectTimeout: 4000,
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      reconnectPeriod: 1000,
    });
  }

  private uploadContentsToSource = <T>(data: MQTTData<T>[], topic: string) => {
    const entity = TopicToEntityMapping[topic];
    if (data.length > 0 && entity) {
      data.forEach((item) => {
        this.AppDataSource.createQueryBuilder()
          .insert()
          .into(entity)
          .values(item)
          .execute();
      });
    }
  };

  public connectAndSubscribe = () => {
    this.client.on("connect", () => {
      this.client.subscribe("#", (err: unknown) => {
        if (err) {
          console.log(`mqtt_error: ${err}`);
        } else {
          console.log("mqtt subscription successful");
        }
      });
    });

    this.client.on("message", (topic: string, message: Buffer) => {
      this.isSupportedTopic(topic);
      if (this.isSupportedTopic(topic)) {
        const messageData: MQTTMessage<TopicToType[typeof topic]> = JSON.parse(
          message.toString()
        );
        const data = buildMQTTData(messageData);
        this.uploadContentsToSource(data, topic);
      }
    });
  };
  private isSupportedTopic = (topic: string): topic is SupportedTopics => {
    return Object.values(SupportedTopics).includes(topic as SupportedTopics);
  };
}
