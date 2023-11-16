"use client";
import React, { useState, useEffect } from "react";
import AppNav from "../Common/Navigation/AppNav";
import Container from "../Common/Utils/Container";
import Hero from "../Common/Hero/Hero";
import { Card, CardTitle } from "@/components/ui/card";
import { getAllJournals } from "@/apiClient/journalData";
import Link from "next/link";
import Drawer from "../Common/Drawer/Drawer";
import useSWR from "swr";
import BarChart from "../Common/Charts/BarChart";
import { useJournalStore } from "@/store/useJournalStore";
import AddJournalDrawer from "../Common/Drawer/AddJournalDrawer";
import { moodObject } from "@/lib/utils";
import { API_BASE_URL } from "@/apiClient/baseApiUrl";
import CarouselDisplay from "../Common/Carousel/CarouselDisplay";
import SkeletonChartDisplay from "../Common/Loading/SkeletonChartDisplay";
import useMoodData from "@/hooks/useMoodData";
import { useSession } from "next-auth/react";

const DashboardLayout = () => {
  // State
  const [error, setError] = useState(null);
  const { setMood, isLoading, setIsLoading } = useJournalStore();

  // Actions
  const { data: session } = useSession();

  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(`${API_BASE_URL}/api/journal`, getAllJournals, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  /* Hooks */
  const moodData = useMoodData(journalData, moodObject);

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
    console.log(session);
  }, [session]);

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
      {
        <>
          <Hero
            header="How Do You Feel Today?"
            subHeader={`Welcome back ${session?.user?.name}!`}
            displayDate={true}
          />
          <Container>
            <Card className="mt-36 max-w-3xl mx-auto rounded-3xl p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-semibold text-left text-gray-800 ">
                  Mood Insights
                </CardTitle>
                <Link
                  href={"/dashboard/report"}
                  className="text-sm font-regular text-left text-dark-purple"
                >
                  View Report
                </Link>
              </div>
              <div className="p-4 mt-2">
                {isLoading ? (
                  <SkeletonChartDisplay />
                ) : (
                  <BarChart data={moodData} />
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
