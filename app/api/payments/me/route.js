import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";
import Mentor from "@/models/mentor";
import { cookies, headers } from "next/headers";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions, {
      headers: headers(),
      cookies: cookies(),
    });

    if (!session || !session.user?.id) {
      return NextResponse.json([], { status: 401 });
    }

    const payments = await Payment.find({ user: session.user.id })
      .populate("mentor")
      .sort({ createdAt: -1 });

    return NextResponse.json(Array.isArray(payments) ? payments : []);
  } catch (err) {
    console.error("Failed to fetch user payments", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
