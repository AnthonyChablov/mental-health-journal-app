"use client";
import React, { useState, useEffect } from "react";
import AppNav from "../Common/Navigation/AppNav";
import Container from "../Common/Utils/Container";
import Hero from "../Common/Hero/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import Drawer from "../Common/Drawer/Drawer";
import useSWR from "swr";
import { fetchData } from "@/api/journalData";
import { API_BASE_URL } from "@/api/baseApiUrl";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useJournalStore } from "@/store/useJournalStore";
import AddJournalDrawer from "../Common/Drawer/AddJournalDrawer";

const moodObject = [
  { name: "sad", emoji: "😞" },
  { name: "verySad", emoji: "😢" },
  { name: "angry", emoji: "😡" },
  { name: "happy", emoji: "😃" },
  { name: "veryHappy", emoji: "😄" },
];

const DashboardLayout = () => {
  // State

  const [moodData, setMoodData] = useState<{ [moodName: string]: number }>({}); // State to store mood insights data
  const { setMood } = useJournalStore();

  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(API_BASE_URL, fetchData, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

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
        data: moodObject.map((mood) => moodData[mood.name] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Calculate mood insights here based on your journal data
    if (Array.isArray(journalData)) {
      const currentWeekMoods = journalData?.filter((entry) => {
        // Check if the entry's date falls within the current week
        // You will need to implement a function to check the week, e.g., using moment.js
        // For simplicity, I'll assume all entries are from the current week
        return true;
      });

      const moodCount: { [moodName: string]: number } = {};

      if (currentWeekMoods) {
        // Check if currentWeekMoods is defined
        for (const mood of moodObject) {
          const moodEntries = currentWeekMoods.filter(
            (entry) => entry.mood === mood.name
          );
          moodCount[mood.name] = moodEntries.length;
        }
      }

      setMoodData(moodCount);
    }
  }, [journalData]);

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
      <Hero />
      <Container>
        {/* Chart report  */}
        <Card className="mt-36 max-w-3xl mx-auto rounded-3xl p-1 shadow-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold text-left text-gray-800 p-4">
              Mood Insights
            </CardTitle>
            <Link
              href={"/"}
              className="text-sm font-regular text-left text-red-500 p-4"
            >
              View Report
            </Link>
          </div>
          <div className="p-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
        {/* Chart report  */}
        <Card className="mt-36 max-w-3xl mx-auto rounded-3xl p-1 shadow-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold text-left text-gray-800 p-4">
              My Journals
            </CardTitle>
            <Link
              href={"/"}
              className="text-sm font-regular text-left text-red-500 p-4"
            >
              View Report
            </Link>
          </div>
        </Card>
      </Container>
      <AppNav />
      <Drawer />
      <AddJournalDrawer />
    </main>
  );
};

export default DashboardLayout;
