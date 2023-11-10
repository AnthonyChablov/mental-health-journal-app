"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getAllJournals } from "@/api/journalData";
import BarChart from "../Common/Charts/BarChart";
import DoughnutChart from "../Common/Charts/DoughnutChart";
import { API_BASE_URL } from "@/api/baseApiUrl";
import Hero from "../Common/Hero/Hero";
import SkeletonChartDisplay from "../Common/Loading/SkeletonChartDisplay";
import Container from "../Common/Utils/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMoodData from "@/hooks/useMoodData";
import AppNav from "../Common/Navigation/AppNav";
import Drawer from "../Common/Drawer/Drawer";
import { moodObject } from "@/lib/utils";
import InfoDisplayCard from "../Common/Card/InfoDisplayCard";
import { IJournalEntry, Tag } from "@/models/journalModels";

function renderMoodInfoDisplayCards(moodData: Record<string, number>) {
  const sortedMoods = moodObject.sort(
    (a, b) => (moodData[b.name] || 0) - (moodData[a.name] || 0)
  );

  const mostPresentMood = sortedMoods[0];

  return (
    <InfoDisplayCard
      key={mostPresentMood.name}
      mood={mostPresentMood.name}
      title={`${mostPresentMood.name} Moments`}
      subTitle="Last 30 Days"
      description={moodData[mostPresentMood.name]?.toString() || "0"}
      icon={mostPresentMood.emoji}
    />
  );
}

const ReportLayout = () => {
  const {
    data: journalData,
    error: journalError,
    isLoading: isJournalDataLoading,
  } = useSWR(`${API_BASE_URL}/api/journal`, getAllJournals, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const moodData = useMoodData(journalData, moodObject);

  // Find the most popular tag
  // Count occurrences of each tag
  const tagCounts: Record<string, number> = {};
  journalData?.forEach((entry: IJournalEntry) => {
    entry.tags?.forEach((tag) => {
      const tagText = tag.text;
      tagCounts[tagText] = (tagCounts[tagText] || 0) + 1;
    });
  });
  const sortedTags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a]
  );
  const mostPopularTag = sortedTags[0];

  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
      <Hero
        header="My Reports"
        subHeader="Here are your reports, Anthony!"
        displayDate={true}
      />
      <Container>
        <Card className="px-6 py-6 grid gap-4 grid-cols-2">
          {renderMoodInfoDisplayCards(moodData)}
          {/* Render most popular tag */}
          <InfoDisplayCard
            key={mostPopularTag}
            title={`${mostPopularTag} Tag`}
            subTitle="Last 30 Days"
            description={tagCounts[mostPopularTag]?.toString() || "0"}
            icon="tag"
          />
          <Card className=" col-span-full">
            <div className="p-4 mt-2">
              {isJournalDataLoading ? (
                <SkeletonChartDisplay />
              ) : (
                <BarChart data={moodData} />
              )}
            </div>
          </Card>
        </Card>
      </Container>
      <AppNav />
      <Drawer />
    </main>
  );
};

export default ReportLayout;

/* <Card className="mt-8  mx-auto rounded-3xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold text-left text-gray-800 ">
              Mood Insights
            </CardTitle>
          </div>
          <div className="p-4 mt-2">
            {journalLoading ? (
              <SkeletonChartDisplay />
            ) : (
              <BarChart data={moodData} />
            )}
          </div>
        </Card>

        <Card className="mt-8  mx-auto rounded-3xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold text-left text-gray-800 ">
              Doughnut Chart
            </CardTitle>
          </div>
          <div className="p-4 mt-2">
            {journalLoading ? (
              <SkeletonChartDisplay />
            ) : (
              <DoughnutChart data={moodData} />
            )}
          </div>
        </Card> */
