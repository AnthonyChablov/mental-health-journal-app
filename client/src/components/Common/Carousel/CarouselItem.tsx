import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formatDate, formatMood } from "@/lib/utils";

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
          <CardDescription className=" text-xs text-white">
            {formatDate(date)}
          </CardDescription>
        </CardHeader>
        <div className=" p-4">
          <p className="truncate w-18">{content}</p>
        </div>
        <div className="card-footer p-4">
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
        </div>
      </Link>
    </Card>
  );
};

export default CarouselItem;
