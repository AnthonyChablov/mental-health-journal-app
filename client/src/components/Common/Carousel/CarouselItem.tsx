import React from "react";
import Link from "next/link";
import { formatDate, formatMood } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JournalCard from "../Card/JournalCard";

interface ICarouselItemProps {
  ariaLabel: string;
  id: string | undefined;
  content: string;
  date: Date | undefined;
  tags: string[];
  title: string;
  userId: string;
  mood: string;
}

const CarouselItem = ({
  id,
  ariaLabel,
  content,
  date,
  tags,
  mood,
  title,
  userId,
}: ICarouselItemProps) => {
  return (
    <Card
      className="mt-8 mb-4 rounded-xl overflow-hidden mx-3 cursor-pointer"
      aria-label={ariaLabel}
    >
      <Link href={`/dashboard/journal/${id}`}>
        <CardHeader className="p-4 bg-dark-purple text-white">
          <CardTitle className="text-2xl font-semibold truncate w-18">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-white">
            {formatDate(date)}
          </CardDescription>
        </CardHeader>
        <div className="my-2 mx-2 mt-3">
          <p className="truncate w-18 bg-slate-100 p-3 rounded-lg shadow-sm">
            {content}
          </p>
        </div>
        <CardFooter className="p-4">
          <ul className="tags-list flex space-x-2">
            {tags?.map((tag, index) => (
              <li
                key={index}
                className="tag-item bg-dark-purple-brown text-white p-1 rounded"
              >
                {tag}
              </li>
            ))}
          </ul>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default CarouselItem;
