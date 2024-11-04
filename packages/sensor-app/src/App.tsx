import "./App.css";
import { useState, useEffect, useContext } from "react";
import {
  getAvgSensorDataAfter,
  getAvgSensorDataBetween,
} from "./services/sensor-data-service";
import {
  AvgUpstairsEnvData,
  AvgBoilerTempData,
  AvgBoilerTempDataResponse,
  AvgUpstairsEnvDataResponse,
} from "./types/sensor-data";
import { SensorTopics } from "./constants/sensor-topics";
import AppBar from "./components/AppBar";
import DateSelectForm from "./components/DateSelectForm";
import { Intervals } from "./constants/sensor-data-intervals";
import { Container, Alert, Stack } from "@mui/material";
import { subDays } from "date-fns";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { SettingsContext } from "./providers/settings-context";
import { extractTopicsFromSettings } from "./utils/sensor-utils";
import SensorView from "./components/DataView";

export const StyledHR = styled.hr`
  color: ${grey[300]};
  margin: 20px;
`;

export default function App() {
  const [upstairsEnvData, setUpstairsEnvData] = useState<AvgUpstairsEnvData[]>(
    []
  );
  const { isLoading = true, settings } = useContext(SettingsContext);

  const [boilerTempData, setBoilerTempData] = useState<AvgBoilerTempData[]>([]);
  const showTruncatedAlert =
    boilerTempData.length >= 1000 || upstairsEnvData.length >= 1000;

  const setNewSensorData = (
    sensorTopics: SensorTopics[],
    responses: (AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse)[]
  ) => {
    responses.forEach((response, index) => {
      if (sensorTopics[index] === SensorTopics.BOILER_TEMP) {
        setBoilerTempData((response as AvgBoilerTempDataResponse).data);
      } else if (sensorTopics[index] === SensorTopics.UPSTAIRS_ENV) {
        setUpstairsEnvData((response as AvgUpstairsEnvDataResponse).data);
      }
    });
  };

  const loadDefaultData = async (sensorTopics: SensorTopics[]) => {
    const afterDate = subDays(new Date(), 1);
    const responses = await Promise.all(
      sensorTopics.map((topic) =>
        getAvgSensorDataAfter(topic, afterDate.toISOString())
      )
    );
    setNewSensorData(sensorTopics, responses);
  };

  useEffect(() => {
    if (isLoading) return;
    const availableSettings = extractTopicsFromSettings(settings);
    loadDefaultData(availableSettings);
  }, [isLoading]);

  const handleDateChange = async (dateRange: Date[], interval: Intervals) => {
    const transformedRange = dateRange.map((date) => date.toISOString());
    const sensorTopics = extractTopicsFromSettings(settings);

    const promises: Promise<
      AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse
    >[] = [];

    if (dateRange.length === 1) {
      sensorTopics.forEach((topic) =>
        promises.push(
          getAvgSensorDataAfter(topic, transformedRange[0], interval)
        )
      );
    }
    if (dateRange.length === 2) {
      sensorTopics.forEach((topic) =>
        promises.push(
          getAvgSensorDataBetween(
            topic,
            transformedRange[0],
            transformedRange[1],
            interval
          )
        )
      );
    }
    const responses = await Promise.all(promises);
    setNewSensorData(sensorTopics, responses);
  };

  if (isLoading) return null;
  return (
    <>
      <AppBar />
      {showTruncatedAlert && (
        <Container>
          <Stack spacing={2}>
            <Alert variant="outlined" severity="error">
              The current data selection is truncated and only showing the first
              1000 results.
            </Alert>
          </Stack>
        </Container>
      )}
      <Container maxWidth={false} role="main" sx={{ p: 5 }}>
        <div>
          <DateSelectForm handleDateChange={handleDateChange} />
        </div>
        <StyledHR />
        <SensorView
          boilerTempData={boilerTempData}
          upstairsEnvData={upstairsEnvData}
        />
      </Container>
    </>
  );
}
