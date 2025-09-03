// app/api/save-phone/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import User from "@/models/user";   // ✅ corrected
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    await connectDB();
    const email = session.user.email;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { phone, phoneVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, phone: updatedUser.phone });
  } catch (err) {
    console.error("save-phone error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
