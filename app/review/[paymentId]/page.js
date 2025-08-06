"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const paymentId = params.paymentId;

  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          rating,
          text,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned invalid JSON.");
      }

      setLoading(false);

      if (res.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => router.push("/"), 2000);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Review error:", err);
      alert("❌ Network error. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-green-500 text-lg font-medium">
          ✅ Thank you for your review!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl border border-gray-700 shadow space-y-6">
        <h1 className="text-2xl font-bold text-center">Leave a Review</h1>

        {/* ⭐ Rating */}
        <div className="text-center">
          <label className="block text-lg font-semibold mb-2">Your Rating</label>
          <div className="[&>*]:!ring-0 [&>*]:!ring-offset-0">
            <Rating
              style={{ maxWidth: 180, margin: "0 auto" }}
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>

        {/* 💬 Comment */}
        <div>
          <label className="block mb-1 font-medium">Your Comment</label>
          <textarea
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            rows={4}
            placeholder="How was your session? (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="text-right text-sm text-gray-400">{text.length}/300</p>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
