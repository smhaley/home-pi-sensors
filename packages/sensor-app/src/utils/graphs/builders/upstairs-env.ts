import { AvgUpstairsEnvData } from "../../../types/sensor-data";
import { hpaToMmHg } from "../../sensor-utils";
import { green, cyan } from "@mui/material/colors";

export const buildUpstairsEnvGraphData = (
  upstairsEnvData: AvgUpstairsEnvData[]
) => {
  const labels = upstairsEnvData.map((item) =>
    new Date(item.interval_beginning).toLocaleString()
  );
  const humidity = upstairsEnvData.map((item) => item.humidity);
  const pressure = upstairsEnvData.map((item) => hpaToMmHg(item.pressure));

  return { labels, y: humidity, y1: pressure };
};

export const buildUpstairsEnvGraph = (
  upstairsEnvData: AvgUpstairsEnvData[]
) => {
  const data = buildUpstairsEnvGraphData(upstairsEnvData);
  return {
    data,
    options: {
      dataLabels: { y: "% Relative Humidity", y1: "Pressure mmHg" },
      dataColors: { y: cyan[500], y1: green[500] },
      title: "Upstairs Environment Humidity & Pressure",
      axisLabels: { y: "% Relative Humidity", y1: "Pressure mmHg" },
    },
  };
};
