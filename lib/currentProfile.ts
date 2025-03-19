import { Profile } from "@/lib/types";
import { prisma } from "@/lib/db";

const currentProfile = async (user_id: string): Promise<Profile | null> => {
  const profile: Profile | null = await prisma.profile.findUnique({
    where: { userId: user_id },
  });

  if (!profile) {
    return null;
  }
  return profile;
};

export { currentProfile };
