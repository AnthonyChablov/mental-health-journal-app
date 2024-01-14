"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import ReactIcons from "../Icons/ReactIcons";
import { Separator } from "@/components/ui/separator";
import DisplayUserCard from "../Card/DisplayUserCard";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const buttons = [
  {
    link: "/dashboard/journal",
    iconType: "journal",
    text: "Journals",
  },
  {
    link: "/dashboard/report",
    iconType: "document",
    text: "Reports",
  },
  {
    link: "/dashboard/profile",
    iconType: "user",
    text: "Profile",
  },
];

const Drawer = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      // You can redirect the user or perform other actions after signing out
    } catch (error) {
      // Handle errors here
      console.error("Error during sign out:", error);
      // You might want to show an error message to the user or perform other error-handling actions
    }
  };

  useEffect(() => {
    if (!session) {
      router.replace("./");
    }
  }, [session]);

  return (
    <Sheet>
      <SheetTrigger asChild className={"absolute top-2 left-3"}>
        <Button
          size="icon"
          className="bg-transparent shadow-none hover:bg-dark-purple hover:text-white"
        >
          <ReactIcons type="menu" size={30} color="purple" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="w-screen xs:w-96">
        <SheetHeader className=" ">
          <SheetTitle className=" font-playFairDisplay text-3xl text-dark-purple">
            Better.me
          </SheetTitle>
          <div className="text-md text-gray-600 mt-2 font-regular">
            Empowering your journey to wellness.
          </div>
        </SheetHeader>
        <div className="">
          {status === "authenticated" ? (
            <div className="flex flex-col justify-start items-start ">
              <Separator className="my-5" />
              <div className="space-y-3 flex flex-col w-full">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    size="icon"
                    className={`bg-transparent shadow-none hover:bg-slate-100 w-full  px-2 py-5 flex items-center justify-start`}
                    asChild
                  >
                    <Link href={button.link} className=" w-fit">
                      <div className="flex justify-center items-center">
                        <ReactIcons
                          type={button.iconType}
                          size={22}
                          color="#414a5a"
                        />
                        <span className=" ml-3 text-md md:text-lg font-medium text-gray-700">
                          {button.text}
                        </span>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="absolute bottom-6 w-10/12 ">
                <Separator className="my-5" />
                <DisplayUserCard isClickable={true} />
                <Button
                  variant="outline"
                  className="mt-4 px-2 bg-transparent text-black shadow-none border-0 transition-all duration-300 hover:bg-slate-100 text-md "
                  onClick={handleSignOut}
                >
                  <ReactIcons type="logout" size={23} color="black" />
                  <span className="ml-3 text-gray-900">Log Out</span>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Sign in to view user information.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
