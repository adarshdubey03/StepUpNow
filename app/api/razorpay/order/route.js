import Razorpay from "razorpay";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";

export async function POST(req) {
  await connectDB(); // ensures DB is connected

  // Log environment variables to help debug Vercel config
  console.log("🔑 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
  console.log("🔑 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
  console.log("🔑 NEXT_PUBLIC_RAZORPAY_KEY_ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    console.error("🚨 Missing Razorpay environment variables");
    return new Response(
      JSON.stringify({ error: "Server misconfigured. Contact support." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: body.amount * 100, // amount in paisa
    currency: "INR",
    receipt: "receipt_order_" + Math.floor(Math.random() * 10000),
  };

  try {
    // Create Razorpay order
    const order = await instance.orders.create(options);

    // Also create Payment record in MongoDB
    const payment = await Payment.create({
      user: body.userId || null,
      mentor: body.mentorId || null,
      amount: order.amount,
      done: false,
    });

    console.log("✅ Created payment record in DB:", payment);

    return new Response(
      JSON.stringify({
        ...order,
        bookingId: payment._id,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ✅ send key to frontend
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Razorpay order creation failed", err);
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

