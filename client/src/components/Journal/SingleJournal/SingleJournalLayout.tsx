"use client";
import React, { useEffect } from "react";
import AppNav from "@/components/Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/api/baseApiUrl";
import { getJournal } from "@/api/journalData";
import { useParams } from "next/navigation";
import Container from "@/components/Common/Utils/Container";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import LoadingLayout from "@/components/Loading/LoadingLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatMood } from "@/lib/utils";
import PopOverButton from "@/components/Common/Buttons/PopOverButton";
import { Separator } from "@/components/ui/separator";
import ToggleHeader from "@/components/Common/Headers/ToggleHeader";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import EditJournalModal from "@/components/Common/Modal/EditJournalModal";
import { useJournalStore } from "@/store/useJournalStore";

const SingleJournalLayout = () => {
  // Router
  const params = useParams();
  const journalId = params.journalId;

  // State
  const { toggleEditModal, setToggleEditModal } = useModalStore();
  const { setUserId, setTitle, setContent, setDate, setMood, setTags } =
    useJournalStore();

  // Fetch Single Journal Data
  const {
    data: singleJournalData,
    error: singleJournalError,
    isLoading: singleJournalLoading,
  } = useSWR(`${journalId}`, () => getJournal(String(journalId)), {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  // Formatting
  const formattedMood = formatMood(singleJournalData?.mood);

  useEffect(() => {
    console.log(singleJournalData);
    setTitle(singleJournalData?.title);
    setContent(singleJournalData?.content);
    setDate(singleJournalData?.date);
    setMood(singleJournalData?.mood);
    setTags(singleJournalData?.tags);
  }, [singleJournalData]);

  if (singleJournalError) {
    return <div className="h-screen bg-skin pt-12">Error...</div>;
  } else if (singleJournalLoading) {
    return (
      <div className="h-screen bg-skin pt-12">
        <LoadingLayout />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skin">
      <div className=" h-fit pt-20 mb-20">
        <Container>
          <ToggleHeader title="My Journal" />
          <Card className="shadow-lg overflow-hidden rounded-3xl">
            <div className="bg-dark-purple text-white px-5 py-4 flex justify-between">
              <p className="text-2xl font-medium ">
                {singleJournalData?.title}
              </p>
              <PopOverButton></PopOverButton>
            </div>
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <CardTitle className="text-dark-purple text-3xl md:text-4xl font-playFairDisplay">
                  <span className="text-3xl capitalize">
                    {formattedMood.name}
                  </span>
                  <span className="text-3xl ml-3">{formattedMood.emoji}</span>
                </CardTitle>
              </div>
              <CardDescription className="text-dark-purple text-md">
                {formatDate(singleJournalData?.date)}
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="bg-slate-100 p-5  rounded-3xl shadow-md">
                <p>{singleJournalData?.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end mt-4 mb-2 ">
              {/* Triggers Edit Journal Modal */}
              <Button
                className="text-dark-purple bg-dark-purple shadow-none hover:bg-dark-purple-brown py-5 px-2 w-fit rounded-full "
                onClick={() => setToggleEditModal(true)}
              >
                <ReactIcons type="edit" size={25} color="white" />
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </div>

      <EditJournalModal displayTrigger={false} />
      <AppNav />
    </div>
  );
};

export default SingleJournalLayout;
