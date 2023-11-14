import React from "react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image, { ImageLoader } from "next/image";

const DisplayUserCard = () => {
  const { data: session } = useSession();

  const imageLoader: ImageLoader = () => {
    return `${session?.user?.image}`;
  };

  return (
    <Card className="shadow-none border-0">
      {session ? (
        <div className="flex items-center">
          <div className="text-center mr-4">
            <Image
              src={session?.user?.image || ""}
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="text-center">
            <p className="text-lg md:text-xl font-semibold">
              {session?.user?.name}
            </p>
            <p className="text-sm md:text-base  text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">User not logged in.</p>
      )}
    </Card>
  );
};

export default DisplayUserCard;
