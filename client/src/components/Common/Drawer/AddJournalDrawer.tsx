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
import { Textarea } from "@/components/ui/textarea";
import { addJournal } from "@/api/journalData";
import { TagInput } from "../Inputs/TagInput";
import { Form } from "@/components/ui/form";
import AddJournalForm from "../Forms/AddJournalForm/AddJournalForm";

const AddJournalDrawer = () => {
  return (
    <Sheet>
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
            <AddJournalForm />
          </div>
        </SheetContent>{" "}
      </Container>
    </Sheet>
  );
};

export default AddJournalDrawer;
