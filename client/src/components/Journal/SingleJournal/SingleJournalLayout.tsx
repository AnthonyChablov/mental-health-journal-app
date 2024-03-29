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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const SingleJournalLayout = () => {
  // State
  const { toggleEditModal, setToggleEditModal } = useModalStore();
  const { setTitle, setContent, setDate, setMood, setTags } = useJournalStore();

  // Router
  const params = useParams();
  const journalId = params.journalId;

  // Actions
  const { data: session } = useSession();
  const { toast } = useToast();

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
    setTitle(singleJournalData?.title);
    setContent(singleJournalData?.content);
    setDate(singleJournalData?.date);
    setMood(singleJournalData?.mood);
    setTags(singleJournalData?.tags);
  }, [singleJournalData]);

  /* Toast */
  useEffect(() => {
    if (singleJournalError) {
      toast({
        variant: "destructive",
        title: "Error Retrieving Journals",
        description:
          "Oops! Something went wrong while trying to retrieve your journal entries. Please try again later.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  }, [singleJournalLoading, singleJournalError]);

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
    <div className="min-h-screen bg-skin h-full pb-24">
      <div className=" h-fit pt-8 mb-20 max-w-3xl mx-auto">
        <Container>
          <ToggleHeader title="My Journal" />
          <div className="pb-10"></div>
          <JournalCard singleJournalData={singleJournalData} mode="journal" />
        </Container>
      </div>
      <EditJournalModal displayTrigger={false} />
      <AppNav />
    </div>
  );
};

export default SingleJournalLayout;
