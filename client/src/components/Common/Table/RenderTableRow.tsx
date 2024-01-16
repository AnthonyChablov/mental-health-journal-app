import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCurrentFormattedDate } from "@/lib/utils";
import { formatDate } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import { Tag } from "@/models/journalModels";

interface RenderTableRowProps {
  journalData: {
    _id?: string;
    title: string;
    date: string | Date | undefined;
    content: string;
    mood: string;
    tags: Tag[];
  };
}

const RenderTableRow = ({ journalData }: RenderTableRowProps) => {
  /* Router */
  const router = useRouter();

  // State
  const [currentDate, setCurrentDate] = useState(formatDate(journalData?.date));
  const journalLink = `/dashboard/journal/${journalData._id}`;

  /* Variables */
  const selectButtonOptions = ["Edit", "Delete", "View"];

  function onClickHandeller() {
    router.push(journalLink, { scroll: false });
  }

  return (
    <TableRow
      className=" hover:bg-slate-100 cursor-pointer text-base "
      onClick={() => {
        onClickHandeller();
      }}
    >
      <TableCell className=" max-w-sm font-medium">
        {journalData.title}
      </TableCell>
      <TableCell className=" max-w-sm truncate ">
        {String(currentDate)}
      </TableCell>
      <TableCell className="max-w-sm truncate">{journalData.content}</TableCell>
      <TableCell className="max-w-sm truncate ">{journalData.mood}</TableCell>
    </TableRow>
  );
};

export default RenderTableRow;
