"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import Hero from "../Common/Hero/Hero";
import Container from "../Common/Utils/Container";
import Drawer from "../Common/Drawer/Drawer";
import { Card } from "../ui/card";
import SkeletonCardDisplay from "../Common/Loading/SkeletonCardDisplay";
import { getAllJournals } from "@/apiClient/journalData";
import { API_BASE_URL } from "@/apiClient/baseApiUrl";
import AppNav from "../Common/Navigation/AppNav";
import { Separator } from "../ui/separator";
import { IJournalEntry } from "@/models/journalModels";

const ProfileLayout = () => {
  /* Session */
  const { data: session } = useSession();

  /* Fetch Data */
  const {
    data: journalData,
    error: journalError,
    isLoading: journalLoading,
  } = useSWR(
    `${API_BASE_URL}/api/journal/${session?.user?.id}`,
    () => getAllJournals(session?.user?.id),
    {
      revalidateOnFocus: true,
      refreshInterval: 300000,
      focusThrottleInterval: 60000,
    }
  );

  /* Sessions */
  useEffect(() => {
    console.log(journalData);
  }, [journalData]);

  return (
    <div className="bg-skin h-full min-h-screen ">
      <Hero
        header="My Profile"
        subHeader="Explore your profile details"
        displayDate={true}
      />
      <Container>
        <div className="w-full mx-auto relative">
          <div className="relative -top-12">
            <Image
              src={session?.user?.image || ""}
              alt={`${session?.user?.name?.[0]}`}
              width={90}
              height={90}
              className="rounded-full mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"
            />
          </div>
          <Card className="mt-9 sm:w-md md:w-xl max-w-xl mx-auto rounded-3xl p-4 shadow-lg w-full">
            <div className="p-2 mt-2">
              {!session || journalLoading ? (
                <SkeletonCardDisplay />
              ) : (
                <>
                  {/* Display User Profile Card */}
                  <div className="flex flex-col items-center justify-center w-full mt-6 space-y-1">
                    <p className="text-xl font-semibold">{session.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                  <Separator className="my-4 w-48 mx-auto" />
                  {/* Display the number of journals etc.. and other stats  */}
                  <div className="text-center">
                    <p className="text-md font-semibold text-black">
                      Journals Created
                    </p>
                    <p className="mt-2 text-4xl font-bold text-dark-purple">
                      {journalData?.length || 0}
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </Container>
      <Drawer />
      <AppNav />
    </div>
  );
};

export default ProfileLayout;
