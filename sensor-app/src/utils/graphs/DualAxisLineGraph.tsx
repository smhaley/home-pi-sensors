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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type GraphData = {
  labels: string[];
  y: number[];
  y1: number[];
};
export type Graph = {
  data: GraphData;
  options: {
    dataLabels: { y: string; y1: string };
    dataColors: { y: string; y1: string };
    title: string;
    axisLabels: { y: string; y1: string };
  };
};

export default function DualAxisLineGraph({ graph }: { graph: Graph }) {
  const { data, options } = graph;
  return (
    <Line
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.y,
            label: options.dataLabels.y,
            borderColor: options.dataColors.y,
            fill: false,
            yAxisID: "y",
          },
          {
            data: data.y1,
            label: options.dataLabels.y1,
            borderColor: options.dataColors.y1,
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
            text: options.title,
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: options.axisLabels.y,
            },
          },

          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: options.axisLabels.y1,
            },
          },
        },
      }}
    />
  );
}
