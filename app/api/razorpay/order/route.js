import Razorpay from "razorpay";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";

export async function POST(req) {
  console.log(" Connecting to DB...");
  await connectDB();

  console.log(" RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
  console.log(" RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
  console.log(" NEXT_PUBLIC_RAZORPAY_KEY_ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    console.error(" Missing Razorpay environment variables");
    return new Response(
      JSON.stringify({ error: "Server misconfigured. Contact support." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json();
  console.log(" Incoming request body:", body);

  if (!body.amount) {
    console.error(" Missing amount in request");
    return new Response(
      JSON.stringify({ error: "Amount is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const receiptId = body.userId 
    ? `user_${body.userId}_order_${Math.floor(Math.random() * 10000)}`
    : `guest_order_${Math.floor(Math.random() * 10000)}`;

  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt: receiptId,
  };

  console.log(" Creating Razorpay order with options:", options);

  try {
    const order = await instance.orders.create(options);
    console.log(" Razorpay order created:", order);

    const payment = await Payment.create({
      user: body.userId || null,
      mentor: body.mentorId || null,
      amount: order.amount,
      done: false,
    });

    console.log(" Payment record created in DB:", payment);

    return new Response(
      JSON.stringify({
        ...order,
        bookingId: payment._id,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(" Razorpay order creation or DB save failed", err);
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
