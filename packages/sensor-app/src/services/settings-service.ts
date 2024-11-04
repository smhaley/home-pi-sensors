import { UiSettingsRequest } from "../types/settings-data";
import { get, post } from "./api/api";

export const getUiSettings = (): Promise<UiSettingsRequest> => get(`settings`);

export const postUiSettings = (settings: UiSettingsRequest) =>
  post("settings", settings);
