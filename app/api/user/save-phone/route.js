import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { userId, phone } = body;

  if (!userId || !phone) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  try {
    await User.findByIdAndUpdate(userId, { phone });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
