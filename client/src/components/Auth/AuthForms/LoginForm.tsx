"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Common/Icons/Icons";
import { useToast } from "@/components/ui/use-toast";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import FormSeparator from "./FormSeparator";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session && session.user) {
      router.replace("dashboard");
      setIsLoading(true);
    } else {
      setError(true);
    }
  }, [session, session?.user]);

  return (
    <div className={cn("grid gap-6")}>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="bg-dark-purple hover:bg-dark-purple-brown text-white"
        onClick={() => {
          signIn("linkedin");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2">
            <ReactIcons size={20} color="white" type="facebook" />
          </span>
        )}{" "}
        <span>Facebook</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="bg-dark-purple hover:bg-dark-purple-brown text-white"
        onClick={() => {
          signIn("github");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2">
            <ReactIcons size={20} color="white" type="github" />
          </span>
        )}{" "}
        <span>GitHub</span>
      </Button>
      <FormSeparator />
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className=" bg-dark-purple hover:bg-dark-purple-brown text-white"
        onClick={() => {
          signIn("google");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        <span>Google</span>
      </Button>
    </div>
  );
}
