import React, { createContext, useState, useEffect } from "react";
import { postUiSettings, getUiSettings } from "../services/settings-service";
import { UiSettings } from "../types/settings-data";
import { SensorTopics } from "../constants/sensor-topics";

interface SettingsContextType {
  settings: UiSettings;
  isLoading: boolean;
  updateSettings?: (newSettings: UiSettings) => void;
}

const defaultSettings = Object.values(SensorTopics).reduce((acc, curr) => {
  return { ...acc, [curr]: false };
}, {} as UiSettings);

export const SettingsContext = createContext<SettingsContextType>({
  isLoading: true,
  settings: defaultSettings,
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<UiSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUiSettings()
      .then((resp) => {
        setSettings(resp?.settings);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateSettings = async (settings: UiSettings) => {
    await postUiSettings({ settings });
    setSettings(settings);
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
