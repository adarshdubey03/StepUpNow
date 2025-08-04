"use client";

import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewForm({ mentorId, bookingId, onSubmitSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId, rating, comment, bookingId }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSubmitted(true);
      if (onSubmitSuccess) onSubmitSuccess();
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <p className="text-green-500 text-center text-lg">
        ✅ Thank you for your feedback!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-gray-900 p-6 rounded-xl border border-gray-700 shadow"
    >
      <div className="text-center">
        <label className="block text-lg font-semibold text-white mb-2">
          Your Rating
        </label>
        <div className="[&>*]:!ring-0 [&>*]:!ring-offset-0">
          <Rating
            style={{ maxWidth: 180, margin: "0 auto" }}
            value={rating}
            onChange={setRating}
          />
        </div>
      </div>

      <div>
        <label className="block text-white mb-1 font-medium">
          Your Comment
        </label>
        <textarea
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows={4}
          placeholder="How was your session? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}
