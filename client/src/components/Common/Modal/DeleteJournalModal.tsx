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
import { deleteJournal } from "@/api/journalData";
import { useParams, useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const DeleteJournalModal = () => {
  /* Router */
  const params = useParams();
  const journalId = String(params.journalId);
  const router = useRouter();

  /* Display Toast */
  const { toast } = useToast();

  async function deleteHandler() {
    try {
      const deletePromise = deleteJournal(journalId);
      const navigatePromise = router.push("/dashboard/journal");

      // Wait for both promises to resolve
      await Promise.all([deletePromise, navigatePromise]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot delete journal, please try again later.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-dark-purple hover:bg-dark-purple-brown">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            journal.
          </DialogDescription>
          <div className="flex items-center justify-center sm:justify-end text-right pt-4">
            <DialogTrigger>
              <Button className="text-dark-purple bg-transparent shadow-none hover:bg-transparent hover:underline mr-4">
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              className="text-white bg-dark-purple hover:bg-dark-purple-brown"
              onClick={() => {
                deleteHandler();
              }}
            >
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJournalModal;
