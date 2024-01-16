"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getAllJournals } from "@/apiClient/journalData";
import BarChart from "../Common/Charts/BarChart";
import DoughnutChart from "../Common/Charts/DoughnutChart";
import { API_BASE_URL } from "@/apiClient/baseApiUrl";
import Hero from "../Common/Hero/Hero";
import SkeletonChartDisplay from "../Common/Loading/SkeletonChartDisplay";
import Container from "../Common/Utils/Container";
import { Card } from "@/components/ui/card";
import useMoodData from "@/hooks/useMoodData";
import AppNav from "../Common/Navigation/AppNav";
import Drawer from "../Common/Drawer/Drawer";
import { moodObject } from "@/lib/utils";
import InfoDisplayCard from "../Common/Card/InfoDisplayCard";
import { IJournalEntry, Tag } from "@/models/journalModels";
import SkeletonCardDisplay from "../Common/Loading/SkeletonCardDisplay";
import { useSession } from "next-auth/react";

function renderMoodInfoDisplayCards(moodData: Record<string, number>) {
  const sortedMoods = moodObject.sort(
    (a, b) => (moodData[b.name] || 0) - (moodData[a.name] || 0)
  );

  const mostPresentMood = sortedMoods[0];

  return (
    <InfoDisplayCard
      key={mostPresentMood.name}
      mode="mood"
      mood={`${mostPresentMood.name}`}
      title={`${mostPresentMood.name} Moments`}
      subTitle="Last 30 Days"
      description={moodData[mostPresentMood.name]?.toString() || "0"}
      icon={mostPresentMood.name.toLowerCase()}
    />
  );
}

const ReportLayout = () => {
  /* Actions */
  const { data: session } = useSession();

  const {
    data: journalData,
    error: journalError,
    isLoading: isJournalDataLoading,
  } = useSWR(
    `${API_BASE_URL}/api/journal/${session?.user?.id}`,
    () => getAllJournals(session?.user?.id),
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

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
    <main className="bg-skin h-full min-h-screen pb-24 ">
      <Hero
        header="My Reports"
        subHeader="Here is your report, Anthony!"
        displayDate={true}
      />
      <Container>
        <Card className="px-6 py-7 grid gap-4 grid-cols-1 sm:grid-cols-2 rounded-3xl ">
          {/* Render most popular mood */}
          {isJournalDataLoading ? (
            <SkeletonChartDisplay />
          ) : (
            renderMoodInfoDisplayCards(moodData)
          )}
          {isJournalDataLoading ? (
            <SkeletonChartDisplay />
          ) : (
            <InfoDisplayCard
              key={mostPopularTag}
              title={`${mostPopularTag} Tag`}
              subTitle="Last 30 Days"
              description={tagCounts[mostPopularTag]?.toString() || "0"}
              icon="tag"
              mode="tag"
            />
          )}

          <Card className=" col-span-full">
            <div className="p-4 mt-2">
              {isJournalDataLoading ? (
                <SkeletonChartDisplay />
              ) : (
                <DoughnutChart data={moodData} />
              )}
            </div>
          </Card>
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
