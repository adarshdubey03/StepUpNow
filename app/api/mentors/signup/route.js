import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const newMentor = new Mentor({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      title: body.title,
      company: body.company,
      experience: body.experience,
      skills: body.skills?.split(",").map(s => s.trim()),
      linkedin: body.linkedin,
      bio: body.bio,
      price: body.price,
      profileImage: body.profileImage
    });

    await newMentor.save();

    return NextResponse.json({ message: "Mentor created successfully!" }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating mentor" }, { status: 500 });
  }
}
