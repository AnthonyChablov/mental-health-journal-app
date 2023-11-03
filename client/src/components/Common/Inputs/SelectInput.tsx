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
      <SelectTrigger className={`${fitWidth ? `w-full` : "w-[280px]"}`}>
        <SelectValue placeholder="Select a mood" />
      </SelectTrigger>
      <SelectContent className="p-0 m-0">
        <SelectGroup>
          <SelectLabel className="p-0 m-0">Mood</SelectLabel>
          {moodObject.map((mood) => (
            <SelectItem key={mood.name} value={mood.name}>
              {mood.name} {mood.emoji}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
