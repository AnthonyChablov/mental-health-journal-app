"use client";
import React, { useEffect, useState } from "react";
import AppNav from "../Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/api/baseApiUrl";
import { getAllJournals } from "@/api/journalData";
import Container from "../Common/Utils/Container";
import Drawer from "../Common/Drawer/Drawer";
import Hero from "../Common/Hero/Hero";
import { IJournalEntry } from "@/models/journalModels";
import { Input } from "@/components/ui/input";
import RenderTableRow from "../Common/Table/RenderTableRow";
import TableDropDownMenu from "../Common/Menu/TableDropDownMenu";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectButton from "../Common/Buttons/SelectButton";
import { Toaster } from "@/components/ui/toaster";
import { useJournalFilterStore } from "@/store/useJournalFilterStore";

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

  /* State */
  const {} = useJournalFilterStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectButtonOptions: string[] = ["Default", "Asc", "Desc"];

  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

  // Filter the journalData based on the searchQuery
  const filteredData = journalData?.filter((entry: IJournalEntry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-skin h-full min-h-screen pb-24">
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
            <div className="mt-8 py-2 pb-4 px-2 rounded-2xl  shadow-lg border-1.5 overflow-hidden bg-white max-w-5xl mx-auto">
              {filteredData && filteredData.length > 0 ? ( // Check if there are entries in filteredData
                <Table className="">
                  <TableHeader className="">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px]">
                        <TableDropDownMenu mode="Title" />
                      </TableHead>
                      <TableHead className="">
                        <TableDropDownMenu mode="Date" />
                      </TableHead>
                      <TableHead>
                        <TableDropDownMenu mode="Content" />
                      </TableHead>
                      <TableHead>
                        <TableDropDownMenu mode="Mood" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((entry: IJournalEntry) => (
                      <RenderTableRow key={entry?._id} journalData={entry} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center ">No journals found...</div> // Display a message when no journals are found
              )}
            </div>
          </Container>
          <AppNav />
          <Toaster />
          <Drawer />
        </>
      )}
    </main>
  );
};

export default JournalLayout;
