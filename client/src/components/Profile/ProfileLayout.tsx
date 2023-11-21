"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AppNav from "../Common/Navigation/AppNav";
import Hero from "../Common/Hero/Hero";
import Container from "../Common/Utils/Container";
import Drawer from "../Common/Drawer/Drawer";
import { Card } from "../ui/card";
import { CardTitle } from "../ui/card";
import SkeletonCardDisplay from "../Common/Loading/SkeletonCardDisplay";

const ProfileLayout = () => {
  /* Actions */
  const { data: session } = useSession();

  return (
    <div className="bg-skin h-full min-h-screen pb-24">
      <Hero
        header="My Profile"
        subHeader={`Explore and manage your profile details`}
        displayDate={true}
      />
      <Container>
        <Card className="mt-2 max-w-3xl mx-auto rounded-3xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold text-left text-gray-800 ">
              Mood Insights
            </CardTitle>
            <Link
              href={"/dashboard/report"}
              className="text-sm font-regular text-left text-dark-purple"
            >
              View Report
            </Link>
          </div>
          <div className="p-4 mt-2">
            {!session ? <SkeletonCardDisplay /> : <>123</>}
          </div>
        </Card>
      </Container>
      <Drawer />
      <AppNav />
    </div>
  );
};

export default ProfileLayout;
