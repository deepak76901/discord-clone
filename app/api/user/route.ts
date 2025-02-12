import { prisma } from "@/lib/db";
import { Profile } from "@/lib/types";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  const user: Profile | null = await prisma.profile.findUnique({
    where: {
      userId: "deepak123",
    },
  });
  console.log("User : ", user);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(user), {
    headers: { "content-type": "text/plain" },
  });
}

export async function POST(request: NextRequest) {
  const { userId, name, email } = await request.json();
  console.log("Data : ", userId, name, email);
  const newUser = await prisma.profile.create({
    data: {
      name,
      email,
      userId,
    },
  });

  return Response.json(newUser);
}
