import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DeleteJournalModal from "../Modal/DeleteJournalModal";
import EditJournalModal from "../Modal/EditJournalModal";

const PopOverButton = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger className="mx-4 flex items-center justify-center text-2xl text-dark-purple">
          ...
        </PopoverTrigger>
        <PopoverContent className="flex flex-col space-y-3 w-[100px] p-4">
          <EditJournalModal displayTrigger={true} />
          {/* Delete Modal */}
          <DeleteJournalModal />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopOverButton;
