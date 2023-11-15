import React, { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Common/Icons/Icons";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast";
import ReactIcons from "@/components/Common/Icons/ReactIcons";
import { AxiosResponse } from "axios";
import FormSeparator from "./FormSeparator";

export function LoginForm() {
  /* State */
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* Router */
  const router = useRouter();

  /* Auth Session */
  const { data: session } = useSession();

  /* Actions */
  const { toast } = useToast();

  /* async function onSubmitRegister(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an Axios POST request to your login endpoint
      const response = await loginUser({
        email,
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
      toast({
        title: "Register failed",
        description: "Please enter valid credentials and try again.",
      });
      setIsLoading(false);
    }
  } */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists: AxiosResponse<{ user: boolean }> = await axios.post(
        "api/userExists",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { user } = resUserExists.data;

      if (user) {
        setError("User already exists.");
        toast({
          title: "Register failed",
          description: `${error}`,
        });
        return;
      }

      const res: AxiosResponse = await axios.post(
        "api/register",
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/dashboard");
      } else {
        setError("User registration failed.");
        toast({
          title: "Registration failed",
          description: `${error}`,
        });
      }
    } catch (error) {
      setError("User registration failed.");
      console.log("Error during registration: ", error);
      toast({
        title: "Registration failed",
        description: `${error}`,
      });
    }
  };

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
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="bg-dark-purple hover:bg-dark-purple-brown text-white"
        onClick={() => {}}
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
        onClick={() => {}}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2">
            <ReactIcons size={20} color="white" type="linkedin" />
          </span>
        )}{" "}
        <span>LinkedIn</span>
      </Button>
      <FormSeparator />
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className=" bg-dark-purple hover:bg-dark-purple-brown text-white"
        onClick={() => {}}
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
