import { useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingLayout = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#6d527d");

  return (
    <div className=" h-screen w-full bg-skin flex flex-col items-center justify-center">
      <MoonLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className=" text-dark-purple font-semibold text-xl mt-4">
        Loading...
      </h1>
    </div>
  );
};

export default LoadingLayout;
