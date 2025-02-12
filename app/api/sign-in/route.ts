import { NextRequest, NextResponse } from "next/server";

export function GET (){
  return Response.json({"name":"deepak"})
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
}
