import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }
  const profile = await prisma.profile.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (profile) {
    return profile;
  }
  console.log("Profile",profile);
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
