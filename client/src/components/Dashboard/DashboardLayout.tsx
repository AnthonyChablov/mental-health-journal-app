"use client";
import React, { useState, useEffect } from "react";
import AppNav from "../Common/Navigation/AppNav";
import Container from "../Common/Utils/Container";
import Hero from "../Common/Hero/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const moodObject = [
  { name: "sad", emoji: "😞" },
  { name: "verySad", emoji: "😢" },

  { name: "angry", emoji: "😡" },
  { name: "happy", emoji: "😄" },
  { name: "veryHappy", emoji: "😃" },
];

const DashboardLayout = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [mood, setMood] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(mood);
  }, [mood]);

  return (
    <main className="bg-slate-100 h-screen">
      <Hero />
      <Container>
        <Card
          className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto rounded-3xl p-1 bg-white shadow-lg absolute top-28 w-full left-1/2 transform 
          -translate-x-1/2 "
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center text-gray-800">
              How Are You Feeling Today?
            </CardTitle>
          </CardHeader>
          <CardContent className=" flex justify-evenly mt-1 ">
            {moodObject.map((mood) => {
              return (
                <Button
                  key={mood.name}
                  className=" text-2xl md:text-4xl rounded-full bg-red-300 hover:bg-red-500 text-white 
                  py-3 px-4 transition duration-300 ease-in-out transform hover:scale-105 place-content-around flex items-center justify-center"
                  onClick={() => setMood(mood.name)}
                  size="icon"
                  asChild
                >
                  <Link className="" href="/login">
                    {mood.emoji}
                  </Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </Container>
      <AppNav />
    </main>
  );
};

export default DashboardLayout;
