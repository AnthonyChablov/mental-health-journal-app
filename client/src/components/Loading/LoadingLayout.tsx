import React from "react";
import { Spinner } from "@nextui-org/spinner";
const LoadingLayout = () => {
  return (
    <div className="h-screen  w-screen bg-skin">
      <Spinner label="Loading..." color="danger" />
    </div>
  );
};

export default LoadingLayout;
