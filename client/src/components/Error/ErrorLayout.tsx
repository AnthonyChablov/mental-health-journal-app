import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ErrorLayoutProps {
  errorMessage: string;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ errorMessage }) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center h-screen bg-skin">
      <div className="text-center">
        <div className="text-dark-purple text-4xl mb-4">
          <svg
            className="inline-block align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>

        <p className="text-lg text-gray-600 mb-4">{errorMessage}</p>
        <Button
          className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-lg p-6 w-fit"
          onClick={() => {
            router.back();
          }}
        >
          <p>Go Back</p>
        </Button>
      </div>
    </div>
  );
};

export default ErrorLayout;
