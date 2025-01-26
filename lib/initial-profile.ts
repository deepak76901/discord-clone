import { currentUser, auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const initialProfile = async () => {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  // const router = useRouter();

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", "http://localhost:3000"));
  }
  console.log("Clerk Current User : ", user);

  const profile = await prisma.profile.findUnique({
    where: { userId: user?.id },
  });

  if (profile) {
    return profile;
  }

  const newProfile = prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
