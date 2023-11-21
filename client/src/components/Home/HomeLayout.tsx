import React from "react";
import NavBar from "../Common/Navigation/NavBar";
import Footer from "../Common/Footer/LandingPageFooter";
import Container from "../Common/Utils/Container";
import LandingPageHero from "../Common/Hero/LandingPageHero";

const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <LandingPageHero />
      <Footer />
    </>
  );
};

export default HomeLayout;
