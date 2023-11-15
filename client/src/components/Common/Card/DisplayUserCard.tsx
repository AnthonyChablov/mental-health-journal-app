import React from "react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image, { ImageLoader } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DisplayUserCard = () => {
  const { data: session } = useSession();

  const imageLoader: ImageLoader = () => {
    return `${session?.user?.image}`;
  };

  return (
    <Card className="shadow-none border-0">
      {session ? (
        <div className="flex items-center justify-start">
          <Button
            size="icon"
            className={`bg-transparent shadow-none hover:bg-slate-100 w-full h-fit flex items-start justify-start`}
            asChild
          >
            <Link
              href={"/dashboard/profile"}
              className=" w-fit flex flex-row items-center"
            >
              <div className="text-center mr-4">
                <Image
                  src={session?.user?.image || ""}
                  alt={`${session?.user?.name?.[0]}`}
                  width={40}
                  height={40}
                  className="rounded-full mx-auto"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg text-black font-semibold">
                  {session?.user?.name}
                </p>
                <p className="text-sm   text-gray-500">
                  {session?.user?.email}
                </p>
              </div>
            </Link>
          </Button>
        </div>
      ) : (
        <p className="text-center text-gray-500">User not logged in.</p>
      )}
    </Card>
  );
};

export default DisplayUserCard;
