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
import { AvgUpstairsEnvData } from "../../types/sensor-data";
import { hpaToMmHg } from "../../utils/sensor-utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PressureAndHumidityGraph({
  upstairsEnvData,
}: {
  upstairsEnvData: AvgUpstairsEnvData[];
}) {

  const labels = upstairsEnvData.map((item) =>
    new Date(item.interval_beginning).toLocaleString()
  );
  const humidity = upstairsEnvData.map((item) => item.humidity);
  const pressure = upstairsEnvData.map((item) => hpaToMmHg(item.pressure));

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            data: humidity,
            label: "% Relative Humidity",
            borderColor: "#3cba9f",
            fill: false,
            yAxisID: "y",
          },
          {
            data: pressure,
            label: "mmHg",
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
