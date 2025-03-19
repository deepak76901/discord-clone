import { v4 as uuidV4 } from "uuid";

import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { Server } from "@/lib/types";

const POST = async (req: NextRequest, { params }: { params: any }) => {
  const { user_id } = await params;

  const profile = await currentProfile(user_id);

  if (!profile) {
    console.log("User not found");
    return NextResponse.json(
      { message: "User could not find" },
      { status: 400 }
    );
  }

  const { name, imageUrl }: { name: string; imageUrl: string } =
    await req.json();

  if (!name || !imageUrl) {
    return new NextResponse("Server name and image url are required", {
      status: 400,
    });
  }

  const newServer: Server | null = await prisma.server.create({
    data: {
      profileId: profile.id,
      name,
      imageUrl,
      inviteCode: uuidV4(),
    },
  });

  return NextResponse.json({
    message: "Server created successfully",
    body: newServer,
  });
};

export { POST };
