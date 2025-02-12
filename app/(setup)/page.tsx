"use client"
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";
import { prisma } from "@/lib/db";
import { Profile } from "@/lib/types";
import { redirect } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import {getUser} from "@/lib/getUser"

const setupPage = () => {

  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }
  
  const res = getUser()
  console.log(" Fethced User : ",res);
  
 
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

  // return <InitialModal />;
};

export default setupPage;
