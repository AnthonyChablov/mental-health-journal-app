import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { useJournalStore } from "@/store/useJournalStore";
import UpdateJournalForm from "../Forms/UpdateJournalForm/UpdateJournalForm";

interface IEditJournalModalProps {
  displayTrigger: boolean;
}

const EditJournalModal = ({ displayTrigger }: IEditJournalModalProps) => {
  const { toggleEditModal, setToggleEditModal } = useModalStore();
  const {} = useJournalStore();

  return (
    <>
      {/* Edit Modal */}
      <Dialog
        open={toggleEditModal}
        onOpenChange={() => setToggleEditModal(!toggleEditModal)}
      >
        {displayTrigger && (
          <DialogTrigger asChild>
            <Button className="text-dark-purple bg-transparent hover:bg-transparent shadow-none hover:underline">
              Edit
            </Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Journal</DialogTitle>
            <DialogDescription>
              <UpdateJournalForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditJournalModal;
