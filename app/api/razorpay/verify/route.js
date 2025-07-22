import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";
import User from "@/models/user";
import Mentor from "@/models/mentor";
import { sendBookingConfirmationEmail } from "@/lib/mail";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;

  const sign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign === razorpay_signature) {
    console.log(" Payment verified successfully!");

    const payment = await Payment.findByIdAndUpdate(bookingId, { done: true }, { new: true });

    if (payment) {
      const user = await User.findById(payment.user);
      const mentor = await Mentor.findById(payment.mentor);

      if (user && mentor) {
        await sendBookingConfirmationEmail({
          to: user.email,
          name: user.name || user.email,
          mentorName: mentor.name,
          amount: payment.amount
        });
      }
    }

    return NextResponse.json({ status: "success" });
  } else {
    console.log(" Invalid signature. Possible fraud.");
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }
}

