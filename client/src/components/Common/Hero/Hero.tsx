"use client";
import React, {useState} from "react";
import Container from "../Utils/Container";

interface IHero {
 /*  title: string;
  date: string; */
}


function getDate(){
  const today = new Date();
  const month = today.getMonth() +1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`; 
}

const Hero = ({}:IHero) => {

  const [currentDate, setCurrentDate] = useState(getDate());
    
  return (
    <section className="text-black bg-gradient-to-bl from-indigo-600 via-purple-800 to-indigo-900  rounded-b-2xl shadow-lg animate-gradientAnimation duration-3000 h-fit">
      {/* Apply the animation class here */}
      <Container>
        <div className="pt-10 xs:pt-12 text-center">
          <h1 className="text-white text-3xl font-bold">Welcome name</h1>
          <p className="text-white text-sm md:text-lg mt-3 pb-28">
            {currentDate}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;