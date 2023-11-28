import React from "react";
import NavBar from "../Common/Navigation/NavBar";
import Footer from "../Common/Footer/LandingPageFooter";
import LandingPageHero from "../Common/Hero/LandingPageHero";
import LandingPageHeader from "../Common/Display/LandingPageHeader";
import LandingPageContentDisplay from "../Common/Display/LandingPageContentDisplay";
import LandingPagePrompt from "../Common/Display/LandingPagePrompt";
import { Separator } from "../ui/separator";

const HomeLayout = () => {
  return (
    <div className="bg-skin">
      <NavBar />
      <LandingPageHero />
      <LandingPageHeader />
      <Separator className=" w-5/12 mx-auto my-16 py-[0.015em] bg-gray-400" />
      <LandingPageContentDisplay />
      <LandingPagePrompt />
      <Footer />
    </div>
  );
};

export default HomeLayout;
