import React from "react";
import { Bar } from "react-chartjs-2";
import { moodObject } from "@/lib/utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface IBarChartProps {
  data: { [moodName: string]: number };
}

const BarChart = ({ data }: IBarChartProps) => {
  // Chart configuration
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const chartData = {
    labels: moodObject.map((mood) => mood.emoji),
    datasets: [
      {
        label: "Mood Insights",
        data: moodObject.map((mood) => data[mood.name] || 0),
        backgroundColor: [
          "#5D4C5B",
          "#B89F97",
          "#6d527d",
          "#897582",
          "#fcf1eb",
        ],
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0, // Set the minimum value to 0
        ticks: {
          // forces step size to be 50 units
          stepSize: 1,
        },
      },
    },
  };
  return (
    <>
      <Bar data={chartData} options={chartOptions} />
    </>
  );
};

export default BarChart;
