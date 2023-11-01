import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PopOverButton from "../Buttons/PopOverButton";
import { Button } from "@/components/ui/button";
import ReactIcons from "../Icons/ReactIcons";
import { formatMood, formatDate } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { IJournalEntry } from "@/models/journalModels";

interface IJournalCardProps {
  singleJournalData: IJournalEntry;
  mode: "journal" | "carousel";
}

const JournalCard = ({ singleJournalData, mode }: IJournalCardProps) => {
  /* State */
  const { setToggleEditModal } = useModalStore();
  // Formatting
  const formattedMood = formatMood(singleJournalData?.mood);

  return (
    <>
      <Card className="shadow-lg overflow-hidden rounded-3xl">
        <div className="bg-dark-purple text-white px-5 py-4 flex justify-between">
          <p
            className={`text-2xl font-medium ${
              mode !== "journal" && "text-sm font-semibold truncate"
            }`}
          >
            {singleJournalData?.title}
          </p>
          {mode === "journal" && <PopOverButton></PopOverButton>}
        </div>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle
              className={`text-dark-purple text-3xl md:text-4xl font-playFairDisplay ${
                mode !== "journal" && "text-xl font-semibold"
              }`}
            >
              <span className=" capitalize">{formattedMood.name}</span>
              <span className=" ml-2">{formattedMood.emoji}</span>
            </CardTitle>
          </div>
          <CardDescription className={`text-dark-purple text-md `}>
            {formatDate(singleJournalData?.date)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`bg-slate-100 p-5  rounded-3xl shadow-md ${
              mode !== "journal" && "truncate "
            } `}
          >
            <p>{singleJournalData?.content}</p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-4 mb-2 ">
          {/* Tags */}
          <ul className="tags-list flex space-x-2 capitalize">
            {singleJournalData?.tags?.map((tag, index) => (
              <li
                key={index}
                className="tag-item bg-dark-purple text-white text-sm font-regular p-2 rounded"
              >
                {tag}
              </li>
            ))}
          </ul>
          {/* Triggers Edit Journal Modal */}
          {mode === "journal" && (
            <Button
              className="text-dark-purple bg-dark-purple shadow-none hover:bg-dark-purple-brown py-5 px-2 w-fit rounded-full "
              onClick={() => setToggleEditModal(true)}
            >
              <ReactIcons type="edit" size={25} color="white" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default JournalCard;
