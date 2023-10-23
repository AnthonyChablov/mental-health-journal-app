import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCurrentFormattedDate } from "@/lib/utils";

import { formatDate } from "../../../lib/utils";
import Link from "next/link";

interface RenderTableRowProps {
  journalData: {
    _id?: string;
    title: string;
    date: string | Date | undefined;
    content: string;
    mood: string;
    tags: string[];
  };
}

const RenderTableRow = ({ journalData }: RenderTableRowProps) => {
  // State
  const [currentDate, setCurrentDate] = useState(formatDate(journalData?.date));
  const journalLink = `/dashboard/journal/${journalData._id}`;

  return (
    <TableRow className="  hover:bg-white cursor-pointer">
      <TableCell className="font-medium">
        <Link href={journalLink}>{journalData.title}</Link>
      </TableCell>
      <TableCell>
        <Link href={journalLink}>{String(currentDate)}</Link>
      </TableCell>
      <TableCell className="max-w-sm truncate">
        <Link href={journalLink}>{journalData.content}</Link>
      </TableCell>
      <TableCell>
        <Link href={journalLink}>{journalData.mood}</Link>
      </TableCell>
      <TableCell>
        {journalData.tags.map((tag, index) => (
          <Link href={journalLink} key={index}>
            {tag}
          </Link>
        ))}
      </TableCell>
    </TableRow>
  );
};

export default RenderTableRow;
