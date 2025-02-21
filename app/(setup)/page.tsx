"use client";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";
import { prisma } from "@/lib/db";
import { Profile } from "@/lib/types";
import { redirect } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

const setupPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }
  const getUser = async () => {
    const response = await fetch("http://localhost:3000/api/signIn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    return response;
  };
  getUser()
    .then((res) => res.json())
    .then((data) => console.log("Fetched User : ", data));

  // return (
  //   <div>
  //     Hello, {userId}! Your current active session is {sessionId}.
  //   </div>
  // );

  // console.log("Setup page loaded");

  // const server = await prisma.server.findFirst({
  //   where: {
  //     members: {
  //       some: {
  //         profileId: profile?.id,
  //       },
  //     },
  //   },
  // });

  // if (server) {
  //   return redirect(`/servers/${server.id}`);
  // }

  return <InitialModal />;
};

export default setupPage;
