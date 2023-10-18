import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ReactIcons from "../Icons/ReactIcons";
import { useDrawerStore } from "@/store/useDrawerStore";
import { useJournalStore } from "@/store/useJournalStore";
import { Separator } from "@/components/ui/separator";
import Container from "../Utils/Container";
import { Input } from "@/components/ui/input";
import DatePicker from "../DatePicker/DatePicker";
import PlainHeader from "../Headers/PlainHeader";

const AddJournalDrawer = () => {
  //State
  const {
    userId,
    title,
    content,
    date,
    mood,
    tags,
    privacy,
    setUserId,
    setTitle,
    setContent,
    setDate,
    setMood,
    setTags,
    setPrivacy,
  } = useJournalStore();
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className={
          "absolute top-64 sm:top-72 lg:top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        }
      >
        <div className="w-full text-center">
          <Button className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full p-6 ">
            <p>+ New Entry</p>
          </Button>
        </div>
      </SheetTrigger>
      <Container>
        <SheetContent side={"bottom"} className="h-screen bg-white">
          <div className="max-w-3xl mx-auto">
            <SheetHeader className="">
              <SheetTitle className="text-2xl">Add a New Journal</SheetTitle>
              <SheetDescription>
                <p>
                  Create a new journal entry to capture your thoughts,
                  experiences, and memories. Give it a title and write about
                  your day, goals, or anything that inspires you. Your journal
                  is a personal canvas to express yourself.
                </p>
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <form action=""></form>
            <PlainHeader title="Journal Title" buttonText="Edit" />
            <div className="text-slate-500 text-sm">
              {"Enter Journal Title here "}
            </div>
            <PlainHeader title="Entry Text" buttonText="Edit" />
            <div className="text-slate-500 text-sm">
              {"Enter Journal Title here "}
            </div>
            <PlainHeader title="Date" buttonText="Edit" />

            <div className="text-slate-500 text-sm w-full">
              <DatePicker />
            </div>
            <PlainHeader title="Tags" buttonText="Edit" />
            <div className="text-slate-500 text-sm">
              {"Enter Journal Title here "}
            </div>
            <PlainHeader title="Mood" buttonText="Edit" />
            <div className="text-slate-500 text-sm">
              {"Enter Journal Title here "}
            </div>
          </div>
        </SheetContent>{" "}
      </Container>
    </Sheet>
  );
};

export default AddJournalDrawer;
