import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function GET() {
  try {
    await connectDB();
    const unverifiedMentors = await Mentor.find({ verified: false });
    return NextResponse.json(unverifiedMentors, { status: 200 });
  } catch (err) {
    console.error("GET pending mentors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
