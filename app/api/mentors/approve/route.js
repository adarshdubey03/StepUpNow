import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function PATCH(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing mentor id" }, { status: 400 });
    }

    // Find mentor by ID and set verified true
    const mentor = await Mentor.findByIdAndUpdate(id, { verified: true }, { new: true });

    if (!mentor) {
      return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mentor approved", mentor }, { status: 200 });
  } catch (err) {
    console.error("PATCH approve error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


