"use client";
import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Features", "About Us", "Login", "Register"];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-neutral-50">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link color="foreground" href="/" as={NextLink}>
              <p className="bg-gradient-to-tr from-red-300 via-red-350 via-red-400 to-yellow-400 font-bold inline-block text-transparent bg-clip-text">
                HarmonyHelper
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4 " justify="center">
          <NavbarItem>
            <Link color="foreground" href="/" as={NextLink}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="features" aria-current="page">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Link color="foreground" href="/about" as={NextLink}>
              About Us
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex font-bold ">
            <Link href="/login" className="text-red-300 text-sm" as={NextLink}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/register"
              variant="flat"
              className="bg-gradient-to-r from-red-300  to-yellow-400 font-bold text-white text-xs"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {" "}
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
                as={NextLink}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
