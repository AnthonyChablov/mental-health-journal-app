"use client";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Container from "../Utils/Container";
import AddJournalForm from "../Forms/AddJournalForm/AddJournalForm";
import { useJournalStore } from "@/store/useJournalStore";
import { useDrawerStore } from "@/store/useDrawerStore";
import { useSession } from "next-auth/react";

const AddJournalDrawer = () => {
  const { setContent, setTags, setTitle, setMood, setDate } = useJournalStore();
  const { openDrawer, setOpenDrawer } = useDrawerStore();

  useEffect(() => {
    setTitle("");
    setContent("");
    setDate(new Date());
    setMood("");
    setTags([]);
  }, []);

  return (
    <Sheet open={openDrawer} onOpenChange={() => setOpenDrawer(!openDrawer)}>
      <div className="absolute top-64 sm:top-72 lg:top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <SheetTrigger asChild className={"w-fit mx-auto"}>
          <div className=" text-center">
            <Button className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full p-6 w-fit">
              <p>+ New Entry</p>
            </Button>
          </div>
        </SheetTrigger>
      </div>
      <Container>
        <SheetContent
          side={"bottom"}
          className="h-screen bg-white overflow-auto"
        >
          <div className="max-w-3xl mx-auto">
            <SheetHeader className="">
              <SheetTitle className="text-2xl">Add a New Journal</SheetTitle>
              <SheetDescription className="text-md">
                Create a new journal entry to capture your thoughts,
                experiences, and memories. Give it a title and write about your
                day, goals, or anything that inspires you.
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <AddJournalForm />
          </div>
        </SheetContent>{" "}
      </Container>
    </Sheet>
  );
};

export default AddJournalDrawer;
