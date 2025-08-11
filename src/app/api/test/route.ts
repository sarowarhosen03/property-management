import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "127.0.0.1";
  return NextResponse.json({ ip });
}
