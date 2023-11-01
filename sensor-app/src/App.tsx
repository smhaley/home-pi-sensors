import { useState, useEffect } from "react";
import "./App.css";
import {
  getAvgSensorDataAfter,
  getAvgSensorDataBetween,
} from "./services/sensor-data-service";
import { AvgUpstairsEnvData, AvgBoilerTempData } from "./types/sensor-data";
import { BOILER_TEMP, UPSTAIRS_ENV } from "./constants/sensor-topics";
import TempGraph from "./components/graphs/TempGraph";
import PressureAndHumidityGraph from "./components/graphs/PressureAndHumidityGraph";
import AppBar from "./components/AppBar";
import DateSelectForm from "./components/DateSelectForm";
import { Intervals } from "./constants/sensor-data-intervals";
import { Container } from "@mui/material";

export default function App() {
  const [upstairsEnvData, setUpstairsEnvData] = useState<AvgUpstairsEnvData[]>(
    []
  );
  const [boilerTempData, setBoilerTempData] = useState<AvgBoilerTempData[]>([]);

  useEffect(() => {
    getAvgSensorDataAfter(UPSTAIRS_ENV, "2023-10-26T17:16:30.515Z").then(
      (resp) => setUpstairsEnvData(resp.data)
    );
    getAvgSensorDataAfter(BOILER_TEMP, "2023-10-26T17:16:30.515Z").then(
      (resp) => setBoilerTempData(resp.data)
    );
  }, []);

  const handleDateChange = async (dateRange: Date[], interval: Intervals) => {
    const transformedRange = dateRange.map((date) => date.toISOString());

    if (dateRange.length === 1) {
      const upstairsEnvData = await getAvgSensorDataAfter(
        UPSTAIRS_ENV,
        transformedRange[0],
        interval
      );
      const boilerTempData = await getAvgSensorDataAfter(
        BOILER_TEMP,
        transformedRange[0],
        interval
      );
      setUpstairsEnvData(upstairsEnvData.data);
      setBoilerTempData(boilerTempData.data);

    }
    if (dateRange.length === 2) {
      const upstairsEnvData = await getAvgSensorDataBetween(
        UPSTAIRS_ENV,
        transformedRange[0],
        transformedRange[1],
        interval
      );
      const boilerTempData = await getAvgSensorDataBetween(
        BOILER_TEMP,
        transformedRange[0],
        transformedRange[1],
        interval
      );
      setUpstairsEnvData(upstairsEnvData.data);
      setBoilerTempData(boilerTempData.data)
    }
  };

  return (
    <>
      <AppBar />
      <Container>
        <DateSelectForm handleDateChange={handleDateChange} />

        {upstairsEnvData && (
          <TempGraph
            boilerTempData={boilerTempData}
            upstairsEnvData={upstairsEnvData}
          />
        )}
        {upstairsEnvData && (
          <PressureAndHumidityGraph upstairsEnvData={upstairsEnvData} />
        )}
      </Container>
    </>
  );
}
