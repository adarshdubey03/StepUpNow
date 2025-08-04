import connectDB from "@/db/mongoosedb";
import Review from "@/models/review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { mentorId, rating, comment, bookingId } = await req.json();

  if (!mentorId || !rating) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    const review = await Review.create({
      mentor: mentorId,
      user: session.user.id,
      rating,
      comment,
      bookingId,
    });

    return new Response(JSON.stringify({ success: true, review }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Review error:", error);
    return new Response(JSON.stringify({ error: "Failed to submit review" }), {
      status: 500,
    });
  }
}
