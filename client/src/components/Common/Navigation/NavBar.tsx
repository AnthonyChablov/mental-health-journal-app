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
import { siteConfig } from "@/config/siteConfig";
import Container from "../Utils/Container";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="bg-skin ">
      <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-transparent ">
        <NavbarContent className=" w-full flex justify-center items-center">
          <NavbarBrand>
            <Link color="foreground" href="/" as={NextLink}>
              <p className="text-dark-purple font-playFairDisplay text-3xl font-bold inline-block  bg-clip-text">
                {siteConfig.name}
              </p>
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-dark-purple "
          />
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <Button
              as={Link}
              href="./login"
              variant="flat"
              className="font-bold text-dark-purple hover:bg-transparent hover:underline  bg-transparent text-sm sm:text-md"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="./register"
              variant="flat"
              className=" font-bold text-white bg-dark-purple hover:bg-dark-purple-brown text-sm sm:text-md flex items-center justify-centers"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="w-full text-center pt-6">
          <Container>
            <NavbarItem>
              <Button
                as={Link}
                href="./login"
                variant="flat"
                className="my-3 font-bold text-dark-purple hover:bg-transparent hover:underline  bg-transparent text-lg  "
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="./register"
                variant="flat"
                className="my-3 font-bold text-white bg-dark-purple hover:bg-dark-purple-brown text-lg flex items-center justify-centers"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </Container>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
