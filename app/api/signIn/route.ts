import { prisma } from "@/lib/db";
import { Profile } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export function GET(): Response {
  return Response.json({ name: "deepak" });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { ...user } = await request.json();
  const existingProfile: Profile | null = await prisma.profile.findFirst({
    where: { userId: user.id },
  });

  if (existingProfile) {
    return NextResponse.json(existingProfile);
  }

  const newProfile: Profile | null = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return NextResponse.json(newProfile);
}
