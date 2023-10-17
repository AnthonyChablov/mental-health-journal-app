"use client";
import React, { useState, useEffect } from "react";
import AppNav from "../Common/Navigation/AppNav";
import Container from "../Common/Utils/Container";
import Hero from "../Common/Hero/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <main className="bg-slate-100 h-full min-h-screen pb-24">
      <Hero />
      <Container>
        <Card
          className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto rounded-3xl p-1 bg-white shadow-lg absolute top-28 w-full left-1/2 transform 
          -translate-x-1/2 "
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center text-gray-800">
              How Are You Feeling Today?
            </CardTitle>
          </CardHeader>
          <CardContent className=" flex justify-evenly mt-1 ">
            {moodObject.map((mood) => {
              return (
                <Button
                  key={mood.name}
                  className=" text-3xl md:text-4xl rounded-full bg-transparent  text-white 
                  py-3 px-4 transition duration-300 ease-in-out transform hover:scale-110 place-content-around flex items-center justify-center"
                  onClick={() => setMood(mood.name)}
                  size="icon"
                  asChild
                >
                  <Link href="/dashboard/journal/newJournal">{mood.emoji}</Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>
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
      </Container>
      <AppNav />
      <Drawer />
    </main>
  );
};

export default DashboardLayout;
