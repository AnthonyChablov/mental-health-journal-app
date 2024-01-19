import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PopOverButton from "../Buttons/PopOverButton";
import { Button } from "@/components/ui/button";
import ReactIcons from "../Icons/ReactIcons";
import { formatMood, formatDate } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { IJournalEntry, Tag } from "@/models/journalModels";

/* Carousel Config */
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 700 },
    items: 3,
    slidesToSlide: 3, // Number of slides to slide on a single swipe
  },
  tablet: {
    breakpoint: { max: 700, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface IJournalCardProps {
  singleJournalData: IJournalEntry;
  mode: "journal" | "carousel";
}

const JournalCard = ({ singleJournalData, mode }: IJournalCardProps) => {
  /* State */
  const { setToggleEditModal } = useModalStore();
  // Formatting
  const formattedMood = formatMood(singleJournalData?.mood);

  useEffect(() => {
    console.log(singleJournalData);
  });

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

        <CardFooter className="flex flex-col items-center justify-between sm:flex-row  w-full">
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"
            itemClass="carousel-item"
            itemAriaLabel=""
            className="z-10 w-full"
          >
            {singleJournalData?.tags?.map((tag, index: number) => (
              <div
                key={index}
                className=" bg-dark-purple my-7 mx-2 p-2 text-white text-center rounded-2xl "
              >
                <p className="truncate w-full"> {tag.text}</p>
              </div>
            ))}
          </Carousel>
          {/* Triggers Edit Journal Modal */}
          <div className="text-right w-full sm:pt-0">
            <Button
              className="text-dark-purple bg-dark-purple shadow-none 
                  hover:bg-dark-purple-brown py-5 px-2 w-fit rounded-full "
              onClick={() => setToggleEditModal(true)}
            >
              <ReactIcons type="edit" size={25} color="white" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default JournalCard;
