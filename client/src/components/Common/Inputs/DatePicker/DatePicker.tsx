import React, { useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useJournalStore } from "@/store/useJournalStore";
import ReactIcons from "../../Icons/ReactIcons";

const DatePicker = () => {
  const { date, setDate } = useJournalStore();

  const formattedDate = date ? (
    formatDate(date) || "Invalid Date"
  ) : (
    <span className="text-base">Pick a date</span>
  );

  useEffect(() => {
    console.log(date);
    setDate(new Date());
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full ">
        <Button
          variant={"outline"}
          className={cn(
            "  justify-start text-left font-normal w-full sm:w-[280px] ",
            !date && "text-muted-foreground "
          )}
        >
          <div className="mr-2 ">
            <ReactIcons type="calendar" color="gray" size={20} />
          </div>
          <p className="text-base">{formattedDate}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
