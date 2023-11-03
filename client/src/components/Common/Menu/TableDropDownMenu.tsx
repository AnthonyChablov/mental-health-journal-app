import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { useJournalFilterStore } from "@/store/useJournalFilterStore";
import { IJournalFilter } from "@/models/journalModels";

interface ITableDropDownMenuProps {
  mode: "Title" | "Date" | "Content" | "Mood";
}

const TableDropDownMenu = ({ mode }: ITableDropDownMenuProps) => {
  /* State */
  const { setFilterContent, setFilterDate, setFilterTitle, setFilterMood } =
    useJournalFilterStore();

  // Define the filter function based on the mode
  function setFilter(order: "asc" | "desc" | "clear" | undefined) {
    switch (mode) {
      case "Title":
        setFilterTitle(order);
        break;
      case "Date":
        setFilterDate(order);
        break;
      case "Content":
        setFilterContent(order);
        break;
      case "Mood":
        setFilterMood(order);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between w-full">
          {mode} <CaretSortIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 text-dark-purple font-regular flex flex-col items-start w-fit">
          {/* <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Button
              className="bg-white text-dark-purple shadow-none hover:bg-transparent"
              onClick={() => setFilter("asc")}
            >
              Asc <ArrowUpIcon />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="bg-white text-dark-purple shadow-none hover:bg-transparent w-full"
              onClick={() => setFilter("desc")}
            >
              Desc <ArrowDownIcon />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Button
            className="bg-white text-dark-purple shadow-none hover:bg-transparent"
            onClick={() => setFilter("clear")}
          >
            <DropdownMenuLabel>Clear</DropdownMenuLabel>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableDropDownMenu;
