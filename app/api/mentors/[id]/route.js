import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const mentor = await Mentor.findById(params.id);

    if (!mentor) {
      return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    }

    return NextResponse.json(mentor, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
