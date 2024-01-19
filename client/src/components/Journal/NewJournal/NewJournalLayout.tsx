"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/Common/Utils/Container";
import { Button } from "@/components/ui/button";
import ToggleHeader from "@/components/Common/Headers/ToggleHeader";
import { useJournalStore } from "@/store/useJournalStore";
import DatePicker from "@/components/Common/Inputs/DatePicker/DatePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const moodObject = [
  { name: "happy", emoji: "😄" },
  { name: "veryHappy", emoji: "😃" },
  { name: "sad", emoji: "😞" },
  { name: "verySad", emoji: "😢" },
  { name: "sick", emoji: "🤢" },
  { name: "angry", emoji: "😡" },
];

const NewJournalLayout = () => {
  const { setMood } = useJournalStore();

  return (
    <section className="bg-skin">
      <Container>
        <ToggleHeader title="Add A New Journal" />
        <Card className="max-w-xl mx-auto mt-16 shadow-md">
          <CardHeader>
            <CardTitle className="text-center w-full">
              How Are You Feeling Today?
            </CardTitle>
          </CardHeader>
          <CardContent className=" space-y-2">
            <div className="text-center space-x-2 mb-4">
              {moodObject.map((mood) => (
                <Button
                  key={mood.name}
                  className="text-xl md:text-2xl rounded-full bg-slate-200 shadow-2xl "
                  onClick={() => setMood(mood.name)}
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>
            <DatePicker />
            <Input type="text" placeholder="Title" />
            <Input type="text" placeholder="Tags" />
            <Textarea placeholder="Type your message here." />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default NewJournalLayout;
