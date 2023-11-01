import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IJournalEntry } from "@/models/journalModels";
import CarouselItem from "./CarouselItem";
import JournalCard from "../Card/JournalCard";
import { formatMood } from "@/lib/utils";
import Link from "next/link";
import SkeletonCardDisplay from "../Loading/SkeletonCardDisplay";
import { useJournalStore } from "@/store/useJournalStore";

interface ICarouselDisplayProps {
  carouselItems: IJournalEntry[];
  isLoading: boolean;
}

/* Carousel Config */
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // Number of slides to slide on a single swipe
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const RenderCarouselSkeleton = () => {
  return [1, 2, 3, 4].map((item, index: number) => (
    <div key={index} className=" my-10 mx-3">
      <SkeletonCardDisplay />
    </div>
  ));
};

const CarouselDisplay = ({
  carouselItems,
  isLoading,
}: ICarouselDisplayProps) => {
  return (
    <Carousel
      responsive={responsive}
      containerClass="carousel-container"
      itemClass="carousel-item"
      itemAriaLabel=""
      className="z-0"
    >
      {!carouselItems ? (
        <RenderCarouselSkeleton />
      ) : !isLoading ? (
        carouselItems.map((journalEntry: IJournalEntry) => (
          <div key={journalEntry?._id} className="my-10 mx-3 cursor-pointer">
            <Link href={`/dashboard/journal/${journalEntry._id}`}>
              <JournalCard singleJournalData={journalEntry} mode="carousel" />
            </Link>
          </div>
        ))
      ) : (
        [1, 2, 3, 4].map((item, index: number) => (
          <div key={index} className=" my-10 mx-3">
            <SkeletonCardDisplay />
          </div>
        ))
      )}
    </Carousel>
  );
};

export default CarouselDisplay;
