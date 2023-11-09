import path from "path";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV ?? "development";

dotenv.config({
  path: path.resolve(__dirname, path.join("envs", `${ENV}.env`)),
});

export const MQTT_CLIENT_ID = "node_mqtt_client";

export const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_HOST,
  CLIENT_SERVICE_PORT,
} = process.env;
