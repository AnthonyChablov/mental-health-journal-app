import { ChangeEvent } from "react";
import { useJournalStore } from "@/store/useJournalStore";
import { moodObject } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelectInputProps {
  fitWidth?: boolean;
}

export function SelectInput({ fitWidth }: ISelectInputProps) {
  const { mood, setMood } = useJournalStore();
  const handleMoodChange = (value: string) => {
    const selectedMood = value;
    setMood(selectedMood);
  };
  return (
    <Select onValueChange={handleMoodChange} value={mood}>
      <SelectTrigger className={` w-full text-base `}>
        <SelectValue placeholder="Select a mood" />
      </SelectTrigger>
      <SelectContent className="p-0 m-0 ">
        <SelectGroup>
          <SelectLabel className="p-0 m-0 text-base">Mood</SelectLabel>
          {moodObject.map((mood) => (
            <SelectItem key={mood.name} value={mood.name}>
              <p className="text-base">
                {mood.name} {mood.emoji}
              </p>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
