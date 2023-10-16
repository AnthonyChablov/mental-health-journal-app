"use client";
import React, { useState } from "react";
import Container from "../Utils/Container";
import { Button } from "@/components/ui/button";
import ReactIcons from "../Icons/ReactIcons";

interface IHero {
  /*  title: string;
  date: string; */
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const Hero = ({}: IHero) => {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <section className="text-black bg-gradient-to-tr from-red-300 via-red-350 via-red-400 to-yellow-400  rounded-b-2xl shadow-lg animate-gradientAnimation duration-3000 h-36">
      {/* Apply the animation class here */}
      <Container>
        <div className="text-left flex flex-col items-start">
          <Button
            size="icon"
            className=" bg-transparent shadow-none rounded-full absolute top-2 left-1 hover:bg-gray-100"
          ></Button>
          <div className="pt-12">
            <h1 className="text-white text-2xl font-bold">
              Hello, {"Anthony"}
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
