import Razorpay from "razorpay";
import connectDB from "@/db/mongoosedb";
import Payment from "@/models/payment";

export async function POST(req) {
    await connectDB();  // ensures DB is connected

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
            done: false
        });

        console.log("✅ Created payment record in DB:", payment);

        // ✅ FIXED: Return key to frontend too
        return Response.json({
            ...order,
            bookingId: payment._id,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error("❌ Razorpay order creation failed", err);
        return new Response(
            JSON.stringify({ error: "Failed to create order" }),
            { status: 500 }
        );
    }
}
