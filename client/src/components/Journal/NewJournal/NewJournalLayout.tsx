"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/Common/Utils/Container";
import { Button } from "@/components/ui/button";
import ToggleHeader from "@/components/Common/Header/ToggleHeader";

const moodObject = [
  { name: "happy", emoji: "😄" },
  { name: "veryHappy", emoji: "😃" },
  { name: "sad", emoji: "😞" },
  { name: "verySad", emoji: "😢" },
  { name: "sick", emoji: "🤢" },
  { name: "angry", emoji: "😡" },
];

const NewJournalLayout = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mood, setMood] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(mood);
  }, [mood]);
  return (
    <div>
      <Container>
        <ToggleHeader />
        <Card className="max-w-xl mx-auto mt-16">
          <CardHeader>
            <CardTitle className="text-center w-full">
              How Are You Feeling Today?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center grid grid-cols-2 gap-5">
            {moodObject.map((mood) => (
              <Button
                key={mood.name}
                className="text-xl md:text-2xl rounded-full bg-slate-200 shadow-lg"
                onClick={() => setMood(mood.name)}
              >
                {mood.emoji}
              </Button>
            ))}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default NewJournalLayout;
