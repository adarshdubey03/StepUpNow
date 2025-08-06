import connectDB from "@/db/mongoosedb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Payment from "@/models/payment";
import Review from "@/models/review";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { paymentId, rating, text } = await req.json();

  console.log("Session:", session);
  console.log("Received:", { paymentId, rating, text });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const existing = await Review.findOne({ paymentId });
    console.log("Existing review:", existing);

    const payment = await Payment.findById(paymentId).populate("mentor").populate("user");
    console.log("Fetched payment:", payment);

    if (!payment || !payment.done) {
      return new Response("Invalid or incomplete session", { status: 400 });
    }

    const review = await Review.create({
      paymentId,
      user: payment.user._id,
      mentor: payment.mentor._id,
      rating,
      text,
    });

    return Response.json({ success: true, review });
  } catch (err) {
    console.error("Review Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
