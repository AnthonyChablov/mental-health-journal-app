import React from "react";
import ReactIcons from "../Icons/ReactIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IToggleHeader {
  title: string;
}

const ToggleHeader = ({ title }: IToggleHeader) => {
  return (
    <div className="flex mt-3 justify-center items-center bg-">
      <Button
        size="icon"
        className=" bg-transparent shadow-none rounded-full hover:bg-gray-100 "
        asChild
      >
        <Link href="/dashboard" className="font-semibold text-xl">
          <ReactIcons type="back" size={22} color="gray" />
        </Link>
      </Button>
      <div className="w-screen text-black text-center ">
        <p className="font-semibold text-xl">{title}</p>
      </div>
    </div>
  );
};

export default ToggleHeader;
