import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactIcons from "../Icons/ReactIcons";

interface IInfoDisplayCardProps {
  title: string;
  subTitle: string;
  mood?: string;
  icon: string;
  description: string;
}

const InfoDisplayCard = ({
  title,
  subTitle,
  icon,
  description,
  mood,
}: IInfoDisplayCardProps) => {
  return (
    <Card className="min-w-[200px] max-w-full py-2 pb-6 ">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
        <CardTitle className="mt-[6px] text-sm">{title}</CardTitle>
        <ReactIcons color={"#6d527d"} size={18} type={icon} />
      </CardHeader>
      <CardContent className=" py-0 px-4">
        <CardDescription className=" ">
          <div className="font-semibold text-lg text-black">{description}</div>
          <div className=" text-slate-700 text-xs">
            {`Times you were ${mood}`}
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default InfoDisplayCard;
