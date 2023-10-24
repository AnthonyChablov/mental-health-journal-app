import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const PopOverButton = () => {
  function deleteHandeller() {}

  return (
    <>
      <Popover>
        <PopoverTrigger className="mx-4 flex items-center justify-center text-2xl text-dark-purple">
          ...
        </PopoverTrigger>
        <PopoverContent className="flex flex-col space-y-3 w-[100px] p-4">
          {/* Edit Modal */}
          <Dialog>
            <DialogTrigger>
              <Button className="text-dark-purple bg-transparent shadow-none hover:underline">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {/* Delete Modal */}
          <Dialog>
            <DialogTrigger>
              <Button
                className="text-white bg-dark-purple hover:bg-dark-purple-brown"
                onClick={() => {
                  deleteHandeller;
                }}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  this journal.
                </DialogDescription>
                <div className="flex items-center justify-center sm:justify-end text-right pt-4">
                  <DialogTrigger>
                    <Button className="text-dark-purple bg-transparent shadow-none hover:bg-dark-purple-brown mr-5">
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <Button className="text-white bg-dark-purple hover:bg-dark-purple-brown">
                    Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopOverButton;
