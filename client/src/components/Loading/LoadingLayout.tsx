import React from "react";
import { Spinner } from "@nextui-org/spinner";
const LoadingLayout = () => {
  return (
    <div className="h-screen  w-screen bg-gradient-to-tr from-red-300 via-red-350 via-red-400 to-yellow-400">
      <Spinner label="Loading..." color="danger" />
    </div>
  );
};

export default LoadingLayout;
