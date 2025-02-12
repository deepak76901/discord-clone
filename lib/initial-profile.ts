import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { Profile } from "./types";
import { redirect } from "next/navigation";

export const initialProfile = async ({...user}): Promise<Profile | null> => {
  console.log("Initial Profile loaded");
  if (!user) {
    return redirect("/sign-in");
  }

  const profile: Profile | null = await prisma.profile.findUnique({
    where: { userId: user?.id },
  });

  if (profile) {
    return profile;
  }

  const newProfile: Profile | null = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
