import React from "react";

const FormSeparator = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-skin px-2  text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
};

export default FormSeparator;
