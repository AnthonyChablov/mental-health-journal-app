import React from "react";
import Container from "../Utils/Container";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const MentalHealthHero = () => {
  return (
    <div className=" bg-gradient-to-b from-dark-purple  to-[#9B6794] ">
      <Container>
        <section className=" h-fit pt-14 md:py-20  text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl font-playFairDisplay md:text-4xl lg:text-5xl font-bold text-white max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl mb-5 md:mb-7 lg:mb-10">
            Your Mental Well-being, Our Priority.
          </h1>
          <p className="text-white text-sm max-w-md md:max-w-lg lg:max-w-3xl md:text-base lg:text-md">
            Track and enhance your mental health. Monitor your mood, set goals,
            and gain insights into your emotional well-being. Take control of
            your mental health journey with personalized tools and resources.
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href="/login"
              variant="flat"
              className="p-6 font-semibold text-white bg-dark-purple hover:bg-dark-purple-brown text-md 
              sm:text-lg flex items-center justify-center shadow-md "
            >
              Get Started
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default MentalHealthHero;
