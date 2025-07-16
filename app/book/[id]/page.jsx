"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"; // <-- ADDED THIS

// load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookMentorPage() {
  const { id } = useParams();
  const { data: session } = useSession(); // <-- ADDED THIS
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/mentors/${id}`);
        const data = await res.json();
        setMentor(data);
      } catch (err) {
        console.error("Failed to fetch mentor", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMentor();
  }, [id]);

  const handlePayment = async () => {
  console.log("🚀 Pay button clicked");

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load.");
    console.log("❌ Razorpay SDK load failed.");
    return;
  }
  console.log("✅ Razorpay SDK loaded.");

  console.log("📡 Calling /api/razorpay/order...");
  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: mentor.price,
      userId: session?.user?.id || null,
      mentorId: mentor._id
    }),
  });

  const orderData = await orderRes.json();
  console.log("🧾 Order created:", orderData);

  const options = {
    key: orderData.key,  // ✅ fetched from backend
    amount: orderData.amount,
    currency: orderData.currency,
    name: "StepUpNow",
    description: `Session with ${mentor.name}`,
    order_id: orderData.id,
    handler: async function (response) {
      console.log("✅ Payment completed:", response);

      const verifyRes = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId: orderData.bookingId,
        }),
      });

      const verifyData = await verifyRes.json();
      console.log("🔍 Verify response:", verifyData);

      if (verifyData.status === "success") {
        alert("Payment successful and verified! 🎉");
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    },
    prefill: {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
    },
    theme: { color: "#6366F1" },
  };

  console.log("🚀 Opening Razorpay Checkout...");
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Mentor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 border border-gray-700 p-8 rounded-xl bg-gray-900 shadow-lg">

        {/* LEFT: Mentor details */}
        <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={mentor.profileImage || "https://via.placeholder.com/150"}
            alt={mentor.name}
            className="w-32 h-32 rounded-full border-2 border-gray-700 object-cover"
          />
          <h1 className="text-3xl font-bold">{mentor.name}</h1>
          <p className="text-gray-400">{mentor.title} at {mentor.company}</p>
          <p className="text-gray-300">{mentor.bio}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {mentor.skills.map((skill, i) => (
              <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Order summary */}
        <div className="space-y-6 border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Booking Summary</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Mentor:</strong> {mentor.name}</p>
            <p><strong>Expertise:</strong> {mentor.skills.join(", ")}</p>
            <p><strong>Price:</strong> ₹{mentor.price} / session</p>
          </div>
          <button
            onClick={handlePayment}
            className="bg-white cursor-pointer text-black py-3 rounded hover:bg-gray-200 transition text-lg font-semibold"
          >
            Pay ₹{mentor.price}
          </button>
        </div>

      </div>
    </div>
  );
}
