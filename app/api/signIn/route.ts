import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return Response.json({ name: "deepak" });
}

export async function POST(request: NextRequest) {
  const { ...user } = await request.json();
  const existingUser = await prisma.profile.findFirst({where:{userId:user.id}})
  console.log("User Found: ",existingUser)

  return Response.json({"greet" : "Hello !"})
}
