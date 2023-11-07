import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactIcons from "../Icons/ReactIcons";
import DeleteJournalModal from "../Modal/DeleteJournalModal";
import EditJournalModal from "../Modal/EditJournalModal";

const PopOverButton = () => {
  return (
    <Popover>
      <PopoverTrigger className="mx-3 flex items-center justify-center text-2xl text-white ">
        <ReactIcons type="kebab" color="white" size={23} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-3 w-[100px] p-4">
        <EditJournalModal displayTrigger={true} />
        {/* Delete Modal */}
        <DeleteJournalModal />
      </PopoverContent>
    </Popover>
  );
};

export default PopOverButton;
