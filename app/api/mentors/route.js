import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const mentor = new Mentor({
      ...data,
      verified: false,
    });

    await mentor.save();
    return NextResponse.json({ message: "Mentor created" }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const mentors = await Mentor.find({ verified: true });
    return NextResponse.json(mentors, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
