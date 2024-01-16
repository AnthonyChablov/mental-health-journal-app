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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <Card className="shadow-lg overflow-hidden rounded-3xl ">
        <div className="bg-dark-purple text-white px-5 py-4 flex justify-between">
          <p
            className={` ${
              mode === "carousel"
                ? "text-xs font-semibold truncate"
                : "text-lg font-medium"
            }`}
          >
            <span className=" capitalize text-md">{formattedMood.name}</span>
            <span className=" ml-2">{formattedMood.emoji}</span>
          </p>
          {mode === "journal" && <PopOverButton></PopOverButton>}
        </div>
        <CardHeader>
          <div
            className={`flex flex-row justify-between items-center ${
              mode === "carousel" ? "w-[8.5em] " : "w-fit"
            } `}
          >
            <CardTitle
              className={`text-dark-purple font-playFairDisplay ${
                mode === "carousel"
                  ? "text-2xl font-semibold"
                  : "text-3xl md:text-4xl"
              } truncate `}
            >
              {singleJournalData?.title}
            </CardTitle>
          </div>
          <CardDescription
            className={`text-dark-purple ${
              mode === "carousel" ? "text-xs sm:text-md " : "text-md"
            }`}
          >
            {formatDate(singleJournalData?.date)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`bg-slate-100 p-5 rounded-3xl shadow-md  `}>
            <p
              className={` ${
                mode === "carousel" &&
                "truncate overflow-hidden max-w-[100%] overflow-ellipsis whitespace-nowrap"
              } `}
            >
              {singleJournalData?.content}
            </p>
          </div>
        </CardContent>
        {mode === "journal" && (
          <CardFooter className="flex flex-col items-center justify-between sm:flex-row  ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-xs xs:max-w-lg sm:max-w-2xl md:max-w-2xl flex space-x-2 p-3 pt-2 "
            >
              <CarouselPrevious className="p-2" />
              <CarouselContent className="ml-1  w-full space-x-2 ">
                {/* Tags */}
                {singleJournalData?.tags?.map((tag, index) => (
                  <CarouselItem
                    key={index}
                    className=" pl-1 w-full basis-full xs:basis-2/4 sm:basis-1/4  tag-item bg-dark-purple 
                  text-white text-sm font-regular p-2 rounded tags-list flex space-x-2 capitalize"
                  >
                    <p className="truncate w-fit"> {tag.text}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
            {/* Triggers Edit Journal Modal */}
            {mode === "journal" && (
              <div className="text-right w-full pt-10 sm:pt-0">
                <Button
                  className="text-dark-purple bg-dark-purple shadow-none 
                  hover:bg-dark-purple-brown py-5 px-2 w-fit rounded-full "
                  onClick={() => setToggleEditModal(true)}
                >
                  <ReactIcons type="edit" size={25} color="white" />
                </Button>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default JournalCard;
