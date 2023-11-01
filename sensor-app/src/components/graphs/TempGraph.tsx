import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cToF } from "../../utils/sensor-utils";
import { AvgUpstairsEnvData, AvgBoilerTempData } from "../../types/sensor-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TempGraph({
  upstairsEnvData,
  boilerTempData,
}: {
  upstairsEnvData: AvgUpstairsEnvData[];
  boilerTempData: AvgBoilerTempData[];
}) {
  const labelsUpstairs = upstairsEnvData.map((item) => item.interval_beginning);

  const labelsBoiler = boilerTempData.map((item) => item.interval_beginning);

  const plotDataUpstairs = upstairsEnvData.map((item) => cToF(item.temp));
  const plotDataBoiler = boilerTempData.map((item) => cToF(item.temp));

  const labels =
    labelsBoiler.length > labelsUpstairs.length ? labelsBoiler : labelsUpstairs;

  const plotDataUpstairsMap = upstairsEnvData.reduce((acc, curr) => {
    return { ...acc, [curr.interval_beginning.toLocaleString()]: curr.temp };
  }, {});
  const plotDataBoilerMap = boilerTempData.reduce((acc, curr) => {
    return { ...acc, [curr.interval_beginning.toLocaleString()]: curr.temp };
  }, {});

  console.log(plotDataBoilerMap);
  console.log(labels);
  const buildPlotData = () => {
    const upstairsEnvDat: number[] = [];
    const boilerTempDat: number[] = [];
    labels.forEach((label) => {
      upstairsEnvDat.push(plotDataUpstairsMap[label] ?? undefined);
      boilerTempDat.push(plotDataBoilerMap[label] ?? undefined);
    });

    return { upstairsEnvDat, boilerTempDat };
  };

  const plotLabels = labels.map((label) => new Date(label).toLocaleString());
  const { upstairsEnvDat, boilerTempDat } = buildPlotData();
  return (
    <Line
      data={{
        labels:plotLabels,
        datasets: [
          {
            data: upstairsEnvDat,
            label: "Fahrenheit",
            borderColor: "#3cba9f",
            fill: false,
            yAxisID: "y",
          },
          {
            data: boilerTempDat,
            label: "Fahrenheit",
            borderColor: "red",
            fill: false,
            yAxisID: "y1",
          },
        ],
      }}
      options={{
        responsive: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: "Upstairs Environment Humidity & Pressure",
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      }}
    />
  );
}
