import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
/* import { Button } from "@/components/ui/button";*/
import { Icons } from "@/components/Common/Icons/Icons";
import { useToast } from "@/components/ui/use-toast";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import FormSeparator from "./FormSeparator";
import { Button } from "@nextui-org/button";

export function LoginForm() {
  /* State */
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = useState("");

  /* Router */
  const router = useRouter();

  /* Auth Session */
  const { data: session } = useSession();

  /* Actions */
  const { toast } = useToast();

  const handleRegister = (provider: "github" | "google" | "facebook") => {
    try {
      setIsLoading(true);
      signIn(provider);
    } catch (error) {
      setError(`${error}`);
      console.error("Error signing in with", provider, error);
      // You can also show a toast or handle the error in some other way
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      router.replace("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [session]);

  return (
    <div className={cn("grid gap-6 ")}>
      <Button
        type="button"
        disabled={isLoading}
        className="bg-dark-purple hover:bg-dark-purple-brown text-white rounded-lg"
        onClick={() => {
          handleRegister("facebook");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2">
            <ReactIcons size={20} color="white" type="facebook" />
          </span>
        )}{" "}
        <span className="text-base">Facebook</span>
      </Button>
      <Button
        type="button"
        disabled={isLoading}
        className="bg-dark-purple hover:bg-dark-purple-brown text-white rounded-lg"
        onClick={() => {
          handleRegister("github");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2">
            <ReactIcons size={20} color="white" type="github" />
          </span>
        )}{" "}
        <span className="text-base">GitHub</span>
      </Button>
      <FormSeparator />
      <Button
        type="button"
        disabled={isLoading}
        className=" bg-dark-purple hover:bg-dark-purple-brown text-white rounded-lg"
        onClick={() => {
          handleRegister("google");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        <span className="text-base">Google</span>
      </Button>
    </div>
  );
}
