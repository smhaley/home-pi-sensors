import { SensorTopics } from "../constants/sensor-topics"

export type UiSettings = Record<SensorTopics, boolean>

export type UiSettingsRequest = {
    settings: Record<SensorTopics, boolean>
}

