import React, { FormEvent, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Common/Icons/Icons";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  loginUser,
  registerUser,
  isUserLoggedIn,
} from "@/api/userAuthentication";

export function RegisterForm() {
  /* State */
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  /* Router */
  const router = useRouter();

  /* Auth Session */
  const { data: session } = useSession();

  /* Submit functions */
  async function onSubmitLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an Axios POST request to your login endpoint
      const response = await loginUser({
        username,
        password,
      });
      // Assuming the API returns an authentication token upon successful login

      // Handle the successful login, e.g., store the token in local storage
      localStorage.setItem("authorizationToken", response.token);
      setIsLoading(false);
      // Redirect to the user's dashboard or any other page
      // You can use react-router-dom for navigation
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  }

  async function onSubmitRegister(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an Axios POST request to your login endpoint
      const response = await loginUser({
        username,
        password,
      });

      // Handle the successful login, e.g., store the token in local storage
      localStorage.setItem("authorizationToken", response.token);
      setIsLoading(false);
      // Redirect to the user's dashboard or any other page
      // You can use react-router-dom for navigation
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  }

  /*  useEffect(() => {
    if (isUserLoggedIn()) {
      console.log("User is logged In");
      router.push("/dashboard", { scroll: false });
    }
  }, []); */

  useEffect(() => {
    console.log(session, session?.user);
  }, [session]);

  return (
    <div className={cn("grid gap-6 ")}>
      <form onSubmit={onSubmitRegister}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </>
          </div>
          <Button
            disabled={isLoading}
            className="bg-dark-purple  hover:bg-dark-purple-brown"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {"Sign In with Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-skin px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className=""
        onClick={() => {
          signIn();
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
