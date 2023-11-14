"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import ReactIcons from "../Icons/ReactIcons";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import DisplayUserCard from "../Card/DisplayUserCard";

const buttons = [
  {
    link: "/dashboard/journal",
    iconType: "journal",
    text: "Journals",
  },
  {
    link: "/dashboard/reports",
    iconType: "user",
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

  const handleSignOut = async () => {
    await signOut();
    // You can redirect the user or perform other actions after signing out
  };

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
      <SheetContent side={"left"}>
        <SheetHeader className=" ">
          <SheetTitle className=" font-playFairDisplay text-3xl text-dark-purple">
            Better.me
          </SheetTitle>
          <div className="text-sm text-gray-500 mt-2">
            Empowering your journey to wellness.
          </div>
        </SheetHeader>
        <div className="">
          {status === "authenticated" ? (
            <div className="flex flex-col justify-start items-start">
              <Separator className="my-5" />
              <div className="space-y-4 flex flex-col">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    size="icon"
                    className={`bg-transparent shadow-none hover:bg-slate-100 w-fit px-2`}
                    asChild
                  >
                    <Link href={button.link} className="flex items-center">
                      <ReactIcons
                        type={button.iconType}
                        size={22}
                        color="#705680"
                      />
                      <span className="text-dark-purple ml-2 text-md md:text-lg font-regular">
                        {button.text}
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="absolute bottom-6 w-10/12 ">
                <Separator className="my-5" />
                <DisplayUserCard />
                <Button
                  variant="outline"
                  className="mt-4 px-2 bg-transparent text-black shadow-none border-0 transition-all duration-300 hover:bg-slate-100 text-md "
                  onClick={handleSignOut}
                >
                  <ReactIcons type="logout" size={23} color="black" />
                  <span className="ml-2 ">Log Out</span>
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
