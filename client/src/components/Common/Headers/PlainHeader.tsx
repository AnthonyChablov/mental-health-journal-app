import React from "react";
import { Button } from "@/components/ui/button";

interface IPlainHeader {
  title: string;
  displayButton?: boolean;
  buttonText: string;
}

const PlainHeader = ({ title, displayButton, buttonText }: IPlainHeader) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-light-brown font-semibold">{title}</p>
      {displayButton && (
        <Button
          variant={"outline"}
          className="border-none shadow-none hover:bg-transparent hover:underline text-dark-purple hover:text-dark-purple-brown"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PlainHeader;
