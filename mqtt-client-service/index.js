"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = require("mqtt");
const MQTT_USERNAME = "mqtt";
const MQTT_PASSWORD = "mqtt";
const MQTT_HOST = "decentservice.xyz";
const MQTT_TOPIC = "upstairs_env";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const client = (0, mqtt_1.connect)(`mqtt://${MQTT_HOST}`, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    reconnectPeriod: 1000,
});
client.on("connect", () => {
    client.subscribe("#", (err) => {
        if (!err) {
            //   client.publish("presence", "Hello mqtt");
        }
    });
});
client.on("message", (topic, message) => {
    // message is Buffer
    console.log(topic, message.toString());
    //   client.end();
});
