import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/mongoosedb";
import User from "@/models/user";

export async function POST(request) {
  console.log(" Incoming signup request...");
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password } = body;
    console.log(" Body:", { name, email, password });

    if (!name || !email || !password) {
      console.log(" Missing fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(" Email already exists");
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(" User created");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(" Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



