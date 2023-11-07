import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const SkeletonCardDisplay = () => {
  return (
    <Card className="p-4 border border-gray-200 rounded-3xl shadow-md">
      <Skeleton className="h-36 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </Card>
  );
};

export default SkeletonCardDisplay;
