import { SensorTopics } from "../constants/sensor-topics";
import { UiSettings } from "../types/settings-data";

export const cToF = (c: number) => (9 * c + 32 * 5) / 5;
export const hpaToMmHg = (p: number) => p * 0.75006157584566;

export const extractTopicsFromSettings = (
  settings: UiSettings
): SensorTopics[] => {
  const topics: SensorTopics[] = [];
  if (settings) {
    Object.keys(settings).forEach((topic) => {
      if (settings[topic as SensorTopics]) topics.push(topic as SensorTopics);
    });
  }
  return topics;
};
