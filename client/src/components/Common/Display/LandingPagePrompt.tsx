import React from "react";
import Link from "next/link";
import Container from "../Utils/Container";
import { Button } from "@nextui-org/button";

const LandingPagePrompt = () => {
  return (
    <div className="w-10/12 mx-auto ">
      <Container>
        <div className="bg-gradient-to-b md:bg-gradient-to-tr  from-dark-purple space-y-8 md:space-y-0  to-[#9B6794] rounded-2xl shadow-xl px-12 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="w-9/12">
            <h3 className="text-slate-50 text-lg font-semibold text-center md:text-left mb-2">
              Explore Your Well-being
            </h3>
            <p className="text-slate-300 text-sm  text-center md:text-left">
              Reflect on your thoughts and emotions with our secure mental
              health journaling app.
            </p>
          </div>
          <Button
            as={Link}
            href="./login"
            variant="flat"
            className="font-semibold text-white hover:bg-dark-purple-brown hover:underline bg-dark-purple text-sm sm:text-md"
          >
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPagePrompt;
