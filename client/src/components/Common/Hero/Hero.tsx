"use client";
import React, { useState } from "react";
import Container from "../Utils/Container";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/useDrawerStore";
import { getCurrentFormattedDate } from "../../../lib/utils";
/* import ReactIcons from "../Icons/ReactIcons";
import Link from "next/link";
 */
interface IHero {
  displayDate: boolean;
  header: string;
  subHeader: string;
}

const Hero = ({ displayDate, header, subHeader }: IHero) => {
  // State
  const [currentDate, setCurrentDate] = useState(getCurrentFormattedDate());
  const { setOpenDrawer } = useDrawerStore();

  return (
    <section className="text-black animate-gradientAnimation duration-3000 h-fit text-center">
      {/* Apply the animation class here */}
      <Container>
        <div className="py-12">
          {displayDate && (
            <p className="mt-4 text-center text-sm font-semibold text-light-brown">
              {currentDate}
            </p>
          )}
          <h1 className="pt-2 text-4xl md:text-5xl lg:text-6xl text-center font-playFairDisplay font-semibold  text-dark-purple max-w-xs md:max-w-lg mx-auto">
            {header}
          </h1>
          <p className="pt-6  text-center text-sm font-semibold text-light-brown capitalize">
            {subHeader}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
