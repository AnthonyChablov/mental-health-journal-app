"use client";
import React, { useEffect } from "react";
import AppNav from "@/components/Common/Navigation/AppNav";
import useSWR from "swr";
import { getJournal } from "@/apiClient/journalData";
import { useParams } from "next/navigation";
import Container from "@/components/Common/Utils/Container";
import LoadingLayout from "@/components/Loading/LoadingLayout";
import JournalCard from "@/components/Common/Card/JournalCard";
import ToggleHeader from "@/components/Common/Headers/ToggleHeader";
import { useModalStore } from "@/store/useModalStore";
import EditJournalModal from "@/components/Common/Modal/EditJournalModal";
import { useJournalStore } from "@/store/useJournalStore";
import { useSession } from "next-auth/react";

const SingleJournalLayout = () => {
  // Router
  const params = useParams();
  const journalId = params.journalId;

  // Actions
  const { data: session } = useSession();

  // State
  const { toggleEditModal, setToggleEditModal } = useModalStore();
  const { setUserId, setTitle, setContent, setDate, setMood, setTags } =
    useJournalStore();

  // Fetch Single Journal Data
  const {
    data: singleJournalData,
    error: singleJournalError,
    isLoading: singleJournalLoading,
  } = useSWR(
    `${journalId}`,
    () => getJournal(session?.user?.id, String(journalId)),
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
      focusThrottleInterval: 60000, // Set a shorter interval for focus revalidation
    }
  );

  useEffect(() => {
    console.log(singleJournalData);
    setTitle(singleJournalData?.title);
    setContent(singleJournalData?.content);
    setDate(singleJournalData?.date);
    setMood(singleJournalData?.mood);
    setTags(singleJournalData?.tags);
  }, [singleJournalData]);

  useEffect(() => {
    console.log(journalId);
  }, [journalId]);

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
    <div className="min-h-screen bg-skin ">
      <div className=" h-fit pt-20 mb-20 max-w-3xl mx-auto">
        <Container>
          <ToggleHeader title="My Journal" />
          <JournalCard singleJournalData={singleJournalData} mode="journal" />
        </Container>
      </div>
      <EditJournalModal displayTrigger={false} />
      <AppNav />
    </div>
  );
};

export default SingleJournalLayout;
