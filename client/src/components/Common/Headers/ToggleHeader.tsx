import React from "react";
import ReactIcons from "../Icons/ReactIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IToggleHeader {
  title: string;
}

const ToggleHeader = ({ title }: IToggleHeader) => {
  return (
    <div className="    flex justify-between items-center  ">
      <Button
        size="icon"
        className=" bg-transparent shadow-none rounded-full hover:bg-light-purple  "
        asChild
      >
        <Link href="/dashboard/journal" className="font-semibold text-xl">
          <ReactIcons type="back" size={22} color="gray" />
        </Link>
      </Button>
      <div className=" text-center text-black">
        <p className="font-semibold text-xl text-dark-purple-brown font-playFairDisplay">
          {title}
        </p>
      </div>
      <Button
        size="icon"
        className="opacity-0 transpa bg-transparent shadow-none rounded-full hover:bg-light-purple  "
        asChild
      >
        <Link href="/dashboard/journal" className="font-semibold text-xl">
          <ReactIcons type="back" size={22} color="gray" />
        </Link>
      </Button>
    </div>
  );
};

export default ToggleHeader;
