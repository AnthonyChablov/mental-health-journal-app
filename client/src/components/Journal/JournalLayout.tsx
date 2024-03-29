"use client";
import React, { useEffect, useState } from "react";
import AppNav from "../Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/apiClient/baseApiUrl";
import { getAllJournals } from "@/apiClient/journalData";
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
import { useSession } from "next-auth/react";
import LoadingLayout from "../Loading/LoadingLayout";
import ErrorLayout from "../Error/ErrorLayout";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const JournalLayout = () => {
  // State
  const { filterMode } = useJournalFilterStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Actions
  const { data: session } = useSession();
  const { toast } = useToast();

  // Fetch Journal Data
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(
    `${API_BASE_URL}/api/journal/${session?.user?.id}`,
    () => getAllJournals(session?.user?.id),
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  // Filter the journalData based on the searchQuery
  const filteredData = journalData?.filter((entry: IJournalEntry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (journalLoading) {
      toast({
        variant: "default",
        title: "Loading Your Journals",
        description: "Please wait while we retrieve your journal entries.",
        action: <ToastAction altText="Cancel">Cancel</ToastAction>,
      });
    }
    if (journalError) {
      toast({
        variant: "destructive",
        title: "Error Retrieving Journals",
        description:
          "Oops! Something went wrong while trying to retrieve your journal entries. Please try again later.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  }, [journalLoading, journalError]);

  return (
    <>
      {journalLoading ? (
        <LoadingLayout />
      ) : journalError ? (
        <ErrorLayout errorMessage="Error! Please Try Again" />
      ) : (
        <main className="bg-skin h-full min-h-screen pb-24">
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
          )
        </main>
      )}
    </>
  );
};

export default JournalLayout;
