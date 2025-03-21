import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";

const GET = async (_req: NextRequest, { params }: { params: any }) => {
  const { userId }: { userId: string } = await params;
  console.log("UserId : ", userId);

  const server = await prisma.server.findFirst({
    where: {
      profileId: userId,
    },
  });

  console.log(`Sever : `, server);

  return NextResponse.json(server);

  // if (server) {
  //   return redirect(`/servers/${server.id}`);
  // }
};
export { GET };
