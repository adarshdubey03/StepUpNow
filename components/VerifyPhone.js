"use client";

import { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "@/lib/firebase";

export default function VerifyPhone({ userId, onVerified }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false); // ✅ TRACK readiness

  useEffect(() => {
    if (typeof window === "undefined") return;

    const auth = getAuth(app);

    // Only initialize once and do not clear on unmount
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved");
            },
          },
          auth
        );

        window.recaptchaVerifier.render().then((widgetId) => {
          console.log("reCAPTCHA rendered with widgetId:", widgetId);
          setRecaptchaReady(true);
        });
      } catch (err) {
        console.error("Recaptcha init error:", err);
      }
    } else {
      setRecaptchaReady(true);
    }
    // Do not clear recaptchaVerifier on unmount to avoid breaking the flow
  }, []);

  const sendOtp = async () => {
    setLoading(true);
    setError("");

    const auth = getAuth(app);

    if (!recaptchaReady || !window.recaptchaVerifier) {
      setError("reCAPTCHA not ready. Please wait or refresh the page.");
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      console.error("Failed to send OTP:", err);
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      if (!confirmationResult) {
        setError("No OTP request found. Please try again.");
        return;
      }

      await confirmationResult.confirm(otp);

      const res = await fetch("/api/user/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, phone }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Phone verified successfully!");
        if (onVerified) onVerified();
      } else {
        setError("Failed to save phone number.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-gray-700 max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Verify Your Phone</h2>

      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone (e.g., 9876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-[#8e44f8] text-white"
          />
          <button
            onClick={sendOtp}
            disabled={loading || !recaptchaReady}
            className="w-full bg-[#8e44f8] hover:bg-[#a66dfc] text-white p-2 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-[#8e44f8] text-white"
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-[#8e44f8] hover:bg-[#a66dfc] text-white p-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
}
