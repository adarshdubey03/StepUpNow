"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import Loader from "@/components/Loader";

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking");
  const mentorId = searchParams.get("mentor");

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/mentors/${mentorId}`);
        const data = await res.json();
        setMentor(data);
      } catch (err) {
        console.error("Failed to fetch mentor", err);
      } finally {
        setLoading(false);
      }
    };

    if (mentorId) fetchMentor();
  }, [mentorId]);

  if (loading) return <Loader />;

  if (!mentor || !bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg text-red-400">❌ Invalid review link</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-gray-950 shadow-2xl p-10 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white">
            Rate & Review Your Mentor
          </h1>
          <p className="text-gray-400 mt-1 text-lg">
            {mentor.name} – {mentor.title} at {mentor.company}
          </p>
        </div>

        <ReviewForm mentorId={mentorId} bookingId={bookingId} />
      </div>
    </div>
  );
}
