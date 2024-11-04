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
import { useTheme } from "@mui/material";

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
};
export type Graph = {
  data: GraphData;
  options: {
    dataLabels: { y: string };
    dataColors: { y: string };
    title: string;
    axisLabels: { y: string };
  };
};

export default function DualAxisLineGraph({ graph }: { graph: Graph }) {
  const { data, options } = graph;
  const theme = useTheme();
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
            color: theme.chart.title,
          },
          legend: {
            labels: {
              color: theme.chart.title,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: theme.chart.gridLines,
            },
            ticks: {
              color: theme.chart.ticks, // Change to your desired color
            },
          },
          y: {
            grid: {
              color: theme.chart.gridLines,
            },
            ticks: {
              color: theme.chart.ticks, // Change to your desired color
            },
            type: "linear",
            display: true,
            position: "left",
            title: {
              color: theme.chart.title,
              display: true,
              text: options.axisLabels.y,
            },
          },
        },
      }}
    />
  );
}
