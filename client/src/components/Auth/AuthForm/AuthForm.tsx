import React, { FormEvent, ReactEventHandler, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Common/Icons/Icons";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { loginUser, registerUser } from "@/api/userAuthentication";

interface UserAuthFormProps {
  isRegisterMode: boolean; // Add a prop to determine the mode
}

export function UserAuthForm({ isRegisterMode }: UserAuthFormProps) {
  // State
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an Axios POST request to your login endpoint
      const response = await loginUser({
        email,
        password,
      });
      // Assuming the API returns an authentication token upon successful login
      const authToken = response.data;
      // Handle the successful login, e.g., store the token in local storage
      localStorage.setItem("authorizationToken", authToken);
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
        email,
        password,
      });
      // Assuming the API returns an authentication token upon successful login
      const authToken = response.data;
      // Handle the successful login, e.g., store the token in local storage
      localStorage.setItem("authToken", authToken);
      setIsLoading(false);
      // Redirect to the user's dashboard or any other page
      // You can use react-router-dom for navigation
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={isRegisterMode ? onSubmitRegister : onSubmitLogin}>
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
            />
            {!isRegisterMode && ( // Conditionally render password input for registration
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
                />
              </>
            )}
          </div>
          <Button
            disabled={isLoading}
            className="bg-gradient-to-br from-red-300  to-red-400"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isRegisterMode ? "Sign Up with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
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
