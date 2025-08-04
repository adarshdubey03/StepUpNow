import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";
import Mentor from "@/models/mentor";

export async function GET(req, { params }) {
  await connectDB();

  const { bookingId } = params;

  try {
    const payment = await Payment.findById(bookingId).populate("mentor");

    if (!payment) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        mentor: {
          name: payment.mentor?.name || "Mentor",
        },
        sessionDate: payment.sessionDate,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to fetch booking:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch booking" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
