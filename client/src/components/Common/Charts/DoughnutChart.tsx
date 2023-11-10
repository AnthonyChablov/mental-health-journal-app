import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { moodObject } from "@/lib/utils";

interface IDoughnutChartProps {
  data: { [moodName: string]: number };
}

// Chart configuration
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<IDoughnutChartProps> = ({ data }) => {
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

  const options = {
    cutout: "70%", // Adjust the size of the center hole
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
