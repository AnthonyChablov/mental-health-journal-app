"use client";
import React, { useEffect, useState } from "react";
import AppNav from "../Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/api/baseApiUrl";
import { getAllJournals } from "@/api/journalData";
import Container from "../Common/Utils/Container";
import JournalCard from "../Common/Card/JournalCard";
import Drawer from "../Common/Drawer/Drawer";
import Hero from "../Common/Hero/Hero";
import { IJournalEntry } from "@/models/journalModels";
import { Input } from "@/components/ui/input";

const JournalLayout = () => {
  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(`${API_BASE_URL}/api/journal`, getAllJournals, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  /*   useEffect(() => {
    console.log(journalData);
  }, [journalData]);
 */
  // Filter the journalData based on the searchQuery
  const filteredData = journalData?.filter((entry: IJournalEntry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-skin h-full min-h-screen pb-24   ">
      {journalLoading ? (
        <div>Loading...</div>
      ) : journalError ? (
        <div>Error...</div>
      ) : (
        <>
          <Container>
            <Hero
              displayDate={false}
              header="Your Journals"
              subHeader={`${filteredData?.length} entries`}
            />
            <Input
              className="bg-white shadow-lg"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="mt-8 grid grid-cols md:grid-cols-2 gap-7">
              {filteredData?.map((entry: IJournalEntry) => (
                <JournalCard key={entry._id} journalEntry={entry} />
              ))}
            </div>
          </Container>
          <AppNav />
          <Drawer />
        </>
      )}
    </main>
  );
};

export default JournalLayout;
