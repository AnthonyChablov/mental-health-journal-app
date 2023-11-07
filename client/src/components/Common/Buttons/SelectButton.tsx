"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectButtonProps {
  title: string;
  options: string[];
}

const SelectButton = ({ title, options }: SelectButtonProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Select>
      <SelectTrigger className="w-[180px] border-0 active:border-0 shadow-none">
        <SelectValue placeholder={`${title}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectButton;
