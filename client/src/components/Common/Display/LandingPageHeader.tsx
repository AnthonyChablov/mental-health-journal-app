import React from "react";
import Container from "../Utils/Container";

const LandingPageHeader = () => {
  return (
    <div className="">
      <Container>
        <div className="w-full flex flex-col items-center justify-center pt-20">
          <h2 className="font-playFairDisplay text-2xl md:text-3xl text-slate-800 text-center font-regular">
            Transform Your Mind, One Entry at a Time
          </h2>
          <p className="text-center text-gray-500 mt-8 w-9/12 mx-auto">
            Where each entry is a step towards self-discovery, healing, and
            resilience. Take a moment for yourself, reflect on your thoughts,
            and nurture your well-being.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LandingPageHeader;
