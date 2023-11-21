import React from "react";

const LandingPageHero = () => {
  return (
    <div>
      <section className="px-6 pt-10 md:pt-16 mb-48 md:px-10 md:mb-60 bg-skin">
        <h1 className="text-xl text-clr-black font-bold max-w-md md:text-3xl lg:text-4xl lg:max-w-3xl xl:max-w-4xl mb-5 md:mb-7 lg:mb-10">
          We make your music sound extraordinary.
        </h1>
        <p className="text-clr-black text-sm max-w-md md:max-w-lg lg:max-w-3xl md:text-base  lg:text-md">
          A system audio equalizer specifically designed for Android and iOS.
          Freely tune the way your music sounds with a professional grade
          parametric EQ & volume mixer. Control bass, mids, treble, gain
          control, reverb, and more!
        </p>
      </section>
    </div>
  );
};

export default LandingPageHero;
