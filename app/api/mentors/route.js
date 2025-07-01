import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

// POST /api/mentors - create mentor
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const mentor = new Mentor(data);
    await mentor.save();
    return NextResponse.json({ message: "Mentor created" }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/mentors - get all mentors
export async function GET() {
  try {
    await connectDB();
    const mentors = await Mentor.find();
    return NextResponse.json(mentors, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
