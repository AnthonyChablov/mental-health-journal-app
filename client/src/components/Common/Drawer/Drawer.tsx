import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ReactIcons from "../Icons/ReactIcons";

const Drawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className={"fixed top-2 left-3"}>
        <Button
          size="icon"
          className="bg-transparent shadow-none hover:bg-dark-purple hover:text-white"
        >
          <ReactIcons type="menu" size={22} color="purple" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
