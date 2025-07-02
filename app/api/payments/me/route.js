import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";

export async function GET(req) {
  try {
    console.log("🔍 API HIT: /api/payments/me");

    await connectDB();
    console.log("✅ Connected to DB");

    const session = await getServerSession(authOptions);
    console.log("🧑 Session:", session);

    if (!session || !session.user?.id) {
      console.log("🚫 Unauthorized - no session user id");
      return NextResponse.json([], { status: 200 }); // ✅ return empty array on unauthorized
    }

    const payments = await Payment.find({ user: session.user.id })
      .populate("mentor")
      .sort({ createdAt: -1 });

    console.log("💰 Payments fetched:", payments);

    return NextResponse.json(payments || []); // ✅ always return array

  } catch (err) {
    console.error("🔥 Error in /api/payments/me:", err);
    return NextResponse.json([], { status: 500 }); // ✅ return array on error too
  }
}
