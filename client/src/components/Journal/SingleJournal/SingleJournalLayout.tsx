"use client";
import React, { useEffect } from "react";
import AppNav from "@/components/Common/Navigation/AppNav";
import useSWR from "swr";
import { API_BASE_URL } from "@/api/baseApiUrl";
import { getJournal } from "@/api/journalData";
import { useParams } from "next/navigation";
import Container from "@/components/Common/Utils/Container";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import PopOverButton from "@/components/Common/Buttons/PopOverButton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
const SingleJournalLayout = () => {
  /* Router */
  const params = useParams();
  const journalId = params.journalId;

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
  }, [singleJournalData]);

  return (
    <>
      <div className="h-screen w-screen bg-skin pt-12">
        <Container>
          <Container>
            <Card>
              <CardHeader>
                <div className="flex flex-row justify-between items-start ">
                  <CardTitle className="font-playFairDisplay text-dark-purple text-3xl  md:text-4xl ">
                    {singleJournalData?.title}
                  </CardTitle>
                  <PopOverButton></PopOverButton>
                </div>

                <CardDescription className="">
                  {formatDate(singleJournalData?.date)}
                </CardDescription>
                {/* 
                <Separator className="h-[.1rem]" /> */}
              </CardHeader>
              <CardContent>
                <p>{singleJournalData?.content}</p>
              </CardContent>
              <CardFooter className="flex items-end justify-end">
                <Button className="text-dark-purple bg-dark-purple shadow-none hover:bg-dark-purple-brown py-5 px-2 w-fit rounded-full">
                  <ReactIcons type="edit" size={25} color="white" />
                </Button>
              </CardFooter>
            </Card>
          </Container>
        </Container>
      </div>
      <AppNav />
    </>
  );
};

export default SingleJournalLayout;
