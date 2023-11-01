import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IJournalEntry } from "@/models/journalModels";
import CarouselItem from "./CarouselItem";

interface ICarouselDisplayProps {
  carouselItems: IJournalEntry[];
}

const CarouselDisplay = ({ carouselItems }: ICarouselDisplayProps) => {
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

  return carouselItems ? (
    <Carousel
      responsive={responsive}
      containerClass="carousel-container"
      itemClass="carousel-item"
      itemAriaLabel=""
    >
      {carouselItems.map((item: IJournalEntry, index: number) => (
        <React.Fragment key={item?._id}>
          <CarouselItem
            ariaLabel={`Carousel Item ${index + 1}`}
            id={item?._id}
            title={item?.title}
            content={item?.content}
            date={item?.date}
            tags={item?.tags}
            mood={item?.mood}
            userId={item?.userId}
          />
        </React.Fragment>
      ))}
    </Carousel>
  ) : (
    <p>No carousel items available.</p>
  );
};

export default CarouselDisplay;
