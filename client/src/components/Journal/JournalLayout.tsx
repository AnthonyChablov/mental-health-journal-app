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
import RenderTableRow from "../Common/Table/RenderTableRow";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

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
              className="bg-white shadow-lg w-4/12 max-w-lg mx-auto text-sm"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table className="mt-8 ">
              <TableCaption>A List Of Your Journals</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead className="text-right">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData?.map((entry: IJournalEntry) => (
                  <RenderTableRow key={entry?._id} journalData={entry} />
                ))}
              </TableBody>
            </Table>
            {/* {filteredData?.map((entry: IJournalEntry) => (
                <JournalCard key={entry._id} journalEntry={entry} />
              ))} */}
          </Container>
          <AppNav />
          <Drawer />
        </>
      )}
    </main>
  );
};

export default JournalLayout;
