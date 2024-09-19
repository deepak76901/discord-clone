import { initialProfile } from "@/lib/initial-profile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

const setupPage = async () => {
  const profile = await initialProfile();
  // console.log("Profile : ",profile);

  // const server = await prisma.server.findFirst({
  //   where: {
  //     members: {
  //       some: {
  //         profileId: profile.id,
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
