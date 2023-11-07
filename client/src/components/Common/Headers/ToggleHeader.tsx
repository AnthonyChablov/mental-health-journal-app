import React from "react";
import ReactIcons from "../Icons/ReactIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IToggleHeader {
  title: string;
}

const ToggleHeader = ({ title }: IToggleHeader) => {
  return (
    <div className="flex my-3 justify-center items-center  fixed top-2 ">
      <Button
        size="icon"
        className=" bg-transparent shadow-none rounded-full hover:bg-light-purple  "
        asChild
      >
        <Link href="/dashboard/journal" className="font-semibold text-xl">
          <ReactIcons type="back" size={22} color="gray" />
        </Link>
      </Button>
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2  text-center text-black">
        <p className="font-semibold text-xl text-dark-purple-brown font-playFairDisplay">
          {title}
        </p>
      </div>
    </div>
  );
};

export default ToggleHeader;
