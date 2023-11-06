import {
  AvgUpstairsEnvData,
  AvgBoilerTempData,
} from "../../../types/sensor-data";
import { cToF } from "../../sensor-utils";
import { red, cyan } from "@mui/material/colors";

type DateTempMap = { [date: string]: number };

const buildPlotData = (
  labels: string[],
  plotDataUpstairsMap: DateTempMap,
  plotDataBoilerMap: DateTempMap
) => {
  const upstairsEnvDat: number[] = [];
  const boilerTempDat: number[] = [];
  labels.forEach((label) => {
    upstairsEnvDat.push(plotDataUpstairsMap[label] ?? undefined);
    boilerTempDat.push(plotDataBoilerMap[label] ?? undefined);
  });

  return { upstairsEnvDat, boilerTempDat };
};

const dataArrayToMap = (data: AvgUpstairsEnvData[] | AvgBoilerTempData[]) => {
  return data.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.interval_beginning.toLocaleString()]: cToF(curr.temp),
    };
  }, {} as { [date: string]: number });
};

const buildTempGraphData = (
  upstairsEnvData: AvgUpstairsEnvData[],
  boilerTempData: AvgBoilerTempData[]
) => {
  const labelsUpstairs = upstairsEnvData.map((item) =>
    item.interval_beginning.toLocaleString()
  );

  const labelsBoiler = boilerTempData.map((item) =>
    item.interval_beginning.toLocaleString()
  );
  const labels =
    labelsBoiler.length > labelsUpstairs.length ? labelsBoiler : labelsUpstairs;

  const plotDataUpstairsMap = dataArrayToMap(upstairsEnvData);

  const plotDataBoilerMap = dataArrayToMap(boilerTempData);
  const plotLabels = labels.map((label) => new Date(label).toLocaleString());
  const { upstairsEnvDat, boilerTempDat } = buildPlotData(
    labels,
    plotDataUpstairsMap,
    plotDataBoilerMap
  );
  return {
    labels: plotLabels,
    y: upstairsEnvDat,
    y1: boilerTempDat,
  };
};

export const buildTempGraph = (
  upstairsEnvData: AvgUpstairsEnvData[],
  boilerTempData: AvgBoilerTempData[]
) => {
  const data = buildTempGraphData(upstairsEnvData, boilerTempData);
  return {
    data,
    options: {
      dataLabels: { y: "Ambient Upstairs", y1: "Boiler Supply °F" },
      dataColors: { y: cyan[500], y1: red[500] },
      title: "Upstairs and Boiler Supply Temp °F",
      axisLabels: { y: "Upstairs Temp °F", y1: "Boiler Supply Temp °F" },
    },
  };
};
