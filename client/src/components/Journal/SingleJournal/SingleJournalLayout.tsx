"use client";
import React, { useEffect } from "react";
import AppNav from "@/components/Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/apiClient/baseApiUrl";
import { getJournal } from "@/apiClient/journalData";
import { useParams } from "next/navigation";
import Container from "@/components/Common/Utils/Container";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import LoadingLayout from "@/components/Loading/LoadingLayout";
import JournalCard from "@/components/Common/Card/JournalCard";
import { formatMood } from "@/lib/utils";
import PopOverButton from "@/components/Common/Buttons/PopOverButton";
import { Separator } from "@/components/ui/separator";
import ToggleHeader from "@/components/Common/Headers/ToggleHeader";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import EditJournalModal from "@/components/Common/Modal/EditJournalModal";
import { useJournalStore } from "@/store/useJournalStore";
import SkeletonCardDisplay from "@/components/Common/Loading/SkeletonCardDisplay";

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
