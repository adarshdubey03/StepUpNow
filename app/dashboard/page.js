"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const VerifyPhone = dynamic(() => import("@/components/VerifyPhone").then(mod => mod.default), { ssr: false });

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [userHasPhone, setUserHasPhone] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`/api/payments/me`);
        const data = await res.json();
        setPayments(data || []);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoadingPayments(false);
      }
    };

    if (status === "authenticated") {
      fetchPayments();
    }
  }, [status]);

  useEffect(() => {
    const checkPhone = async () => {
      if (!session || !session.user || !session.user.email) return;
      try {
        const res = await fetch(`/api/user/by-email?email=${encodeURIComponent(session.user.email)}`);
        const data = await res.json();
        setUserHasPhone(data?.user?.phone ? true : false);
      } catch (err) {
        console.error("Phone check failed:", err);
        setUserHasPhone(true); // fallback to let dashboard load
      }
    };

    if (status === "authenticated") {
      checkPhone();
    }
  }, [session, status]);

  if (status === "loading" || userHasPhone === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[85vh] bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 border border-gray-800 p-8 rounded-xl bg-gray-950 shadow-xl">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
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
              {(session && session.user && (session.user.name || session.user.email)) || "User"}
            </h2>
          </div>

          {!userHasPhone && (
            <div className="bg-yellow-700 border border-yellow-500 text-white px-4 py-3 rounded shadow-md">
              <p className="font-semibold mb-2">⚠️ Your phone number is not verified.</p>
              <p className="mb-3 text-sm">Please verify your phone to receive session updates and reminders.</p>
              <VerifyPhone userId={session?.user?.id ?? ""} onVerified={() => setUserHasPhone(true)} />
            </div>
          )}

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
            onClick={() => setShowConfirmLogout(true)}
            className="mt-6 cursor-pointer bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col space-y-4">
          <h3 className="text-2xl font-bold mb-4">My Bookings</h3>

          {loadingPayments ? (
            <Loader />
          ) : payments.length === 0 ? (
            <p className="text-gray-400">You have no bookings yet.</p>
          ) : (
            <div
              className="max-h-96 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#4B5563 black" }}
            >
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
                    className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold min-w-[110px] text-center ${
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

      {/* Logout Model */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-8 max-w-sm w-full shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 cursor-pointer py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
