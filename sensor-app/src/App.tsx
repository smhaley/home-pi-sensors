import { useState, useEffect } from "react";
import "./App.css";
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
import DualAxisLineGraph from "./utils/graphs/DualAxisLineGraph";
import { buildTempGraph } from "./utils/graphs/builders/temp-graph";
import { buildUpstairsEnvGraph } from "./utils/graphs/builders/upstairs-env";

export default function App() {
  const [upstairsEnvData, setUpstairsEnvData] = useState<AvgUpstairsEnvData[]>(
    []
  );
  const [boilerTempData, setBoilerTempData] = useState<AvgBoilerTempData[]>([]);
  const showAlert =
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

  useEffect(() => {
    const sensorTopics = [SensorTopics.BOILER_TEMP, SensorTopics.UPSTAIRS_ENV];
    Promise.all(
      sensorTopics.map((topic) =>
        getAvgSensorDataAfter(topic, "2023-10-26T17:16:30.515Z")
      )
    ).then(
      (
        responses: (AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse)[]
      ) => {
        setNewSensorData(sensorTopics, responses);
      }
    );
  }, []);

  const handleDateChange = async (dateRange: Date[], interval: Intervals) => {
    const transformedRange = dateRange.map((date) => date.toISOString());
    const sensorTopics = [SensorTopics.BOILER_TEMP, SensorTopics.UPSTAIRS_ENV];

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

  return (
    <>
      <AppBar />
      {showAlert && (
        <Container>
          <Stack spacing={2}>
            <Alert severity="error">
              The current data selection is truncated and only showing the first
              1000 results.
            </Alert>
          </Stack>
        </Container>
      )}
      <Container>
        <DateSelectForm handleDateChange={handleDateChange} />

        {upstairsEnvData && boilerTempData && (
          <DualAxisLineGraph
            graph={buildTempGraph(upstairsEnvData, boilerTempData)}
          />
        )}
        {upstairsEnvData && (
          <DualAxisLineGraph graph={buildUpstairsEnvGraph(upstairsEnvData)} />
        )}
      </Container>
    </>
  );
}
