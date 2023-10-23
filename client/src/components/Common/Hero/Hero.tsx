"use client";
import React, { useState } from "react";
import Container from "../Utils/Container";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/useDrawerStore";

/* import ReactIcons from "../Icons/ReactIcons";
import Link from "next/link";
 */
interface IHero {
  displayDate: boolean;
  header: string;
  subHeader: string;
}

function getCurrentFormattedDate() {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const months = [
    "JANY",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
  return formattedDate;
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
