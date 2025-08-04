"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [mentorName, setMentorName] = useState(null);
  const [sessionDate, setSessionDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const res = await fetch(`/api/payments/${bookingId}`);
        const data = await res.json();
        setMentorName(data?.mentor?.name || "Mentor");
        setSessionDate(data?.sessionDate);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading your booking...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-400">✅ Booking Confirmed!</h1>
      <p className="text-xl mb-2">
        Your session with <span className="text-blue-400">{mentorName}</span> has been booked.
      </p>
      {sessionDate && (
        <p className="mb-2">
          <strong>Date:</strong>{" "}
          {new Date(sessionDate).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <p className="mb-4 text-gray-300">
        We'll shortly mail you the session time and meeting link.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white text-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
