"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getAllJournals } from "@/api/journalData";
import BarChart from "../Common/Charts/BarChart";
import { API_BASE_URL } from "@/api/baseApiUrl";
import Hero from "../Common/Hero/Hero";
import SkeletonChartDisplay from "../Common/Loading/SkeletonChartDisplay";
import Container from "../Common/Utils/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ReportLayout = () => {
  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(`${API_BASE_URL}/api/journal`, getAllJournals, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
      {
        <>
          <Hero
            header="My Reports"
            subHeader="Here are your reports, Anthony!"
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
                {journalLoading ? (
                  <SkeletonChartDisplay />
                ) : (
                  <BarChart data={journalData} />
                )}
              </div>
            </Card>
          </Container>
        </>
      }
    </main>
  );
};

export default ReportLayout;
