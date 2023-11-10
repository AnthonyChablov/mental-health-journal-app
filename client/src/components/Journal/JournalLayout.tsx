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
import { Toaster } from "@/components/ui/toaster";
import { useJournalFilterStore } from "@/store/useJournalFilterStore";
import ReactIcons from "../Common/Icons/ReactIcons";

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
  const {
    filterMode,
    setFilterMode,
    filterTitle,
    filterContent,
    filterDate,
    filterMood,
    setFilterContent,
    setFilterMood,
    setFilterTitle,
    setFilterDate,
  } = useJournalFilterStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectButtonOptions: string[] = ["Default", "Asc", "Desc"];
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    console.log(journalData, filterMode);
  }, [journalData, filterMode]);

  // Filter the journalData based on the searchQuery
  const filteredData = journalData?.filter((entry: IJournalEntry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* useEffect(() => {
    if (filterMode === "Title") {
      filteredData.sort((a, b) => {
        if (filterTitle === "asc") {
          return a.title.localeCompare(b.title);
        } else if (filterTitle === "desc") {
          return b.title.localeCompare(a.title);
        }
        // Return 0 for no change in order if filterTitle is not "asc" or "desc"
        return 0;
      });

      setSortedData(filteredData);
    }
    if (filterMode === "Content") {
      filteredData.sort((a, b) => {
        if (filterContent === "asc") {
          return a.content.localeCompare(b.content);
        } else if (filterContent === "desc") {
          return b.content.localeCompare(a.content);
        }
        // Return 0 for no change in order if filterTitle is not "asc" or "desc"
        return 0;
      });

      setSortedData(filteredData);
    }
    if (filterMode === "Mood") {
      filteredData.sort((a, b) => {
        if (filterMood === "asc") {
          return a.content.localeCompare(b.mood);
        } else if (filterMood === "desc") {
          return b.content.localeCompare(a.mood);
        }
        // Return 0 for no change in order if filterTitle is not "asc" or "desc"
        return 0;
      });

      setSortedData(filteredData);
    } else {
      setSortedData(filteredData);
    }
  }, [filterMode, filterTitle, filteredData]); */

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
              displayDate={true}
              header="Your Journals"
              subHeader={`${filteredData?.length} entries`}
            />
            <div className="flex items-center bg-white shadow-lg w-full max-w-lg mx-auto text-sm rounded-full ">
              <Input
                className="w-full py-2 pr-0 md:pr-10 pl-4 border-none focus:outline-none"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className=" px-3">
                {" "}
                <ReactIcons type="search" size={22} color="gray" />
              </div>
            </div>
            <div className="mt-8 py-2 pb-4 px-5 rounded-2xl  shadow-lg border-1.5 overflow-hidden bg-white max-w-5xl mx-auto">
              {filteredData && filteredData.length > 0 ? ( // Check if there are entries in filteredData
                <Table className="">
                  <TableHeader className="">
                    <TableRow className="hover:bg-transparent">
                      {/* */}
                      <TableHead className="">
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
                    {filteredData?.map((entry: IJournalEntry) => (
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
