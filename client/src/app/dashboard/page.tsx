import React from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Toaster } from "@/components/ui/toaster";

const page = () => {
  return (
    <div>
      <DashboardLayout />
      <Toaster />
    </div>
  );
};

export default page;
