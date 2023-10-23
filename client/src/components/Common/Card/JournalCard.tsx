import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IJournalEntry } from "@/models/journalModels";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@/components/ui/button";

interface IJournalCard {
  journalEntry: IJournalEntry;
}

const JournalCard = ({ journalEntry }: IJournalCard) => {
  return (
    <Card className=" w-full shadow-2xl rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-light-purple">
        <CardTitle className="">{journalEntry?.title}</CardTitle>
        <Button
          className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full p-4 w-fit "
          asChild
        >
          <Link href={""} className="">
            View
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div>
          <strong>Date:</strong> {`${journalEntry?.date}`}
        </div>
        <div>
          <strong>Mood:</strong> {journalEntry?.mood}
        </div>
        <div>
          <strong>Tags:</strong> {journalEntry?.tags.join(", ")}
        </div>
        <div>
          <strong>Content:</strong> {journalEntry?.content}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalCard;
