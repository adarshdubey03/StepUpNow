"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/payments/me`);
          const data = await res.json();
          setPayments(data || []);
        } catch (err) {
          console.error("Failed to fetch payments:", err);
        } finally {
          setLoadingPayments(false);
        }
      }
    };

    fetchPayments();
  }, [session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-[85vh] bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 border border-gray-800 p-8 rounded-xl bg-gray-950 shadow-xl">
        
        {/* LEFT COLUMN: Profile + Stats */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Profile */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.97 10.97 0 0112 15c2.07 0 3.984.63 5.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold">
              {session?.user?.name || session?.user?.email || "User"}
            </h2>
          </div>

          {/* Stats */}
          <div className="w-full space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold mb-1">Groups Joined</h3>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold mb-1">Sessions Taken</h3>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-6 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* RIGHT COLUMN: My Bookings */}
        <div className="flex-1 flex flex-col space-y-4">
          <h3 className="text-2xl font-bold mb-4">My Bookings</h3>

          {loadingPayments ? (
            <p className="text-gray-400">Loading your bookings...</p>
          ) : payments.length === 0 ? (
            <p className="text-gray-400">You have no bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-gray-900 p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold">
                      Session with {payment.mentor?.name || "Mentor"}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Amount: ₹{payment.amount / 100} 
                    </p>
                  </div>
                  <span
                    className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold ${
                      payment.done
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {payment.done ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
