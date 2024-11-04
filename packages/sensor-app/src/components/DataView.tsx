import { useContext } from "react";
import { AvgBoilerTempData, AvgUpstairsEnvData } from "../types/sensor-data";
import { buildBoilerGraph } from "../utils/graphs/builders/boiler-temp";
import { buildTempGraph } from "../utils/graphs/builders/temp-graph";
import { buildUpstairsEnvGraph } from "../utils/graphs/builders/upstairs-env";
import DualAxisLineGraph from "./DualAxisLineGraph";
import LineGraph from "./LineGraph";
import { StyledHR } from "../App";
import { SettingsContext } from "../providers/settings-context";
import { extractTopicsFromSettings } from "../utils/sensor-utils";
import { SensorTopics } from "../constants/sensor-topics";
import { Box, Container } from "@mui/material";

export default function SensorView({
  boilerTempData,
  upstairsEnvData,
}: {
  boilerTempData: AvgBoilerTempData[];
  upstairsEnvData: AvgUpstairsEnvData[];
}) {
  const { settings } = useContext(SettingsContext);

  const availableSettings = extractTopicsFromSettings(settings);

  const containsRequiredSettings = (
    availableSettings: SensorTopics[],
    requiredSettings: SensorTopics[]
  ) => requiredSettings.every((topic) => availableSettings.includes(topic));

  const boilerDataOnly = containsRequiredSettings(availableSettings, [
    SensorTopics.BOILER_TEMP,
  ]);

  const upstairsEnvDataOnly = containsRequiredSettings(availableSettings, [
    SensorTopics.UPSTAIRS_ENV,
  ]);

  const upstairsAndBoiler = containsRequiredSettings(availableSettings, [
    SensorTopics.UPSTAIRS_ENV,
    SensorTopics.BOILER_TEMP,
  ]);

  const renderSensorView = () => {
    if (upstairsAndBoiler) {
      return (
        <>
          <DualAxisLineGraph
            graph={buildTempGraph(upstairsEnvData, boilerTempData)}
          />
          <StyledHR />
          <DualAxisLineGraph graph={buildUpstairsEnvGraph(upstairsEnvData)} />
        </>
      );
    }
    if (boilerDataOnly) {
      return <LineGraph graph={buildBoilerGraph(boilerTempData)} />;
    }
    if (upstairsEnvDataOnly) {
      return (
        <DualAxisLineGraph graph={buildUpstairsEnvGraph(upstairsEnvData)} />
      );
    }

    if (!availableSettings.length) {
      return (
        <Container>
          <Box>Please update topic settings. Currently none are selected.</Box>
        </Container>
      );
    }
  };

  return <>{renderSensorView()}</>;
}
