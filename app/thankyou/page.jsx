"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const mentor = searchParams.get("mentor");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-green-400">✅ Booking Confirmed!</h1>
      <p className="text-xl mb-2">Your session with <span className="text-blue-400">{mentor}</span> has been booked.</p>
      <p className="mb-4">We’ll share the session details with you shortly.</p>

      <Link href="/dashboard" className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white text-lg">
        Go to Dashboard
      </Link>
    </div>
  );
}
