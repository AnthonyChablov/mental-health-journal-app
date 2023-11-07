import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const SkeletonChartDisplay = () => {
  return (
    <Card className="bg-white p-4 rounded-3xl ">
      <div className="h-64 w-full">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonChartDisplay;
