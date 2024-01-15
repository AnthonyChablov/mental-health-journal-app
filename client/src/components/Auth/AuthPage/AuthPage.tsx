"use client";
import { useEffect } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "../AuthForms/LoginForm";
import { LoginForm } from "../AuthForms/RegisterForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

interface IAuthenticationPage {
  mode: "register" | "login";
}

export default function AuthenticationPage({ mode }: IAuthenticationPage) {
  /* Variables */
  const isRegisterMode = mode === "register";

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-skin  ">
        <Link
          href={isRegisterMode ? "/login" : "/register"}
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
        >
          {isRegisterMode ? "Login" : "Register"}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0  bg-gradient-to-b from-dark-purple  to-[#9B6794]" />
          <div className="relative z-20 flex items-center text-lg font-medium ">
            <p className="text-white font-playFairDisplay text-3xl">
              Better.me
            </p>
          </div>
        </div>
        <div className="">
          <div className="h-screen  flex justify-center items-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6  sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                {isRegisterMode ? (
                  <>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Choose a register method below
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Log in to your account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Choose a login method below
                    </p>
                  </>
                )}
              </div>
              {isRegisterMode ? <LoginForm /> : <RegisterForm />}
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
