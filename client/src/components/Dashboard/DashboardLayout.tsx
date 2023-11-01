"use client";
import React, { useState, useEffect } from "react";
import AppNav from "../Common/Navigation/AppNav";
import Container from "../Common/Utils/Container";
import Hero from "../Common/Hero/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllJournals } from "@/api/journalData";
import Link from "next/link";
import Drawer from "../Common/Drawer/Drawer";
import useSWR from "swr";
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
import { moodObject } from "@/lib/utils";
import { API_BASE_URL } from "@/api/baseApiUrl";
import CarouselDisplay from "../Common/Carousel/CarouselDisplay";
import SkeletonChartDisplay from "../Common/Loading/SkeletonChartDisplay";

const DashboardLayout = () => {
  // State
  const [moodData, setMoodData] = useState<{ [moodName: string]: number }>({});
  const [error, setError] = useState(null);
  const { setMood, isLoading, setIsLoading } = useJournalStore();

  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(`${API_BASE_URL}/api/journal`, getAllJournals, {
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

  useEffect(() => {
    if (journalLoading) {
      setIsLoading(true);
    }
    if (journalError) {
      setError(journalError);
    }
    if (!journalLoading && !journalError) {
      setIsLoading(false);
    }
  }, [journalLoading, journalError]);

  useEffect(() => {
    if (Array.isArray(journalData)) {
      const currentWeekMoods = journalData?.filter((entry) => true);
      const moodCount: { [moodName: string]: number } = {};
      if (currentWeekMoods) {
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

  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
      {
        <>
          <Hero
            header="How Do You Feel Today?"
            subHeader="Welcome back Anthony!"
            displayDate={true}
          />
          <Container>
            <Card className="mt-36 max-w-3xl mx-auto rounded-3xl p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-semibold text-left text-gray-800 ">
                  Mood Insights
                </CardTitle>
                <Link
                  href={"/"}
                  className="text-sm font-regular text-left text-dark-purple"
                >
                  View Report
                </Link>
              </div>
              <div className="p-4 mt-2">
                {isLoading ? (
                  <SkeletonChartDisplay />
                ) : (
                  <Bar data={chartData} options={chartOptions} />
                )}
              </div>
            </Card>
            <Card className="mt-10 max-w-3xl mx-auto rounded-3xl shadow-lg p-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-semibold text-left text-gray-800  ">
                  My Journals
                </CardTitle>
                <Link
                  href={"/dashboard/journal"}
                  className="text-sm font-regular text-left text-dark-purple"
                >
                  View Journals
                </Link>
              </div>
              <CarouselDisplay
                carouselItems={journalData}
                isLoading={journalLoading}
              />
            </Card>
          </Container>
          <AppNav />
          <Drawer />
          <AddJournalDrawer />
        </>
      }
    </main>
  );
};

export default DashboardLayout;
