"use client";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";
import { prisma } from "@/lib/db";
import { Profile } from "@/lib/types";
import { redirect, useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const setupPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

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
    const fetchedUser = await response.json();
    return fetchedUser;
  };
  const fetchServer = async () => {
    const user = await getUser();
    const server = await axios
      .get(`api/servers/find/${user.id}`)
      .then((res) => res.data);

    console.log("Fetched Server :==", server);

    if (server) {
      router.push(`/servers/${server.id}`);
    }
  };
  fetchServer();

  // return (
  //   <div>
  //     Hello, {userId}! Your current active session is {sessionId}.
  //   </div>
  // );

  // console.log("Setup page loaded");

  return <InitialModal />;
};

export default setupPage;
