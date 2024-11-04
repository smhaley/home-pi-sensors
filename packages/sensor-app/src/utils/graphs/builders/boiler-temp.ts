import {
  AvgUpstairsEnvData,
  AvgBoilerTempData,
} from "../../../types/sensor-data";
import { cToF } from "../../sensor-utils";
import { red } from "@mui/material/colors";

type DateTempMap = { [date: string]: number };

const buildPlotData = (labels: string[], plotDataBoilerMap: DateTempMap) => {
  const boilerTempDat: number[] = [];
  labels.forEach((label) => {
    boilerTempDat.push(plotDataBoilerMap[label] ?? undefined);
  });

  return { boilerTempDat };
};

const dataArrayToMap = (data: AvgUpstairsEnvData[] | AvgBoilerTempData[]) => {
  return data.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.interval_beginning.toLocaleString()]: cToF(curr.temp),
    };
  }, {} as { [date: string]: number });
};

const buildTempGraphData = (boilerTempData: AvgBoilerTempData[]) => {
  const labelsBoiler = boilerTempData.map((item) =>
    item.interval_beginning.toLocaleString()
  );
  const labels = labelsBoiler;
  const plotDataBoilerMap = dataArrayToMap(boilerTempData);
  const plotLabels = labels.map((label) => new Date(label).toLocaleString());
  const { boilerTempDat } = buildPlotData(
    labels,

    plotDataBoilerMap
  );
  return {
    labels: plotLabels,
    y: boilerTempDat,
  };
};

export const buildBoilerGraph = (boilerTempData: AvgBoilerTempData[]) => {
  const data = buildTempGraphData(boilerTempData);
  return {
    data,
    options: {
      dataLabels: { y: "Boiler Supply °F" },
      dataColors: { y: red[500] },
      title: "Boiler Supply Temp °F",
      axisLabels: { y: "Boiler Supply Temp °F" },
    },
  };
};
