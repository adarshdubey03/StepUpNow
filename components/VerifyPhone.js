"use client";

import { useEffect, useRef, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "@/lib/firebase";

export default function VerifyPhone({ userId, onVerified }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false); // ✅ New state
  const [resendCooldown, setResendCooldown] = useState(0); // ✅ For resend button cooldown
  const recaptchaContainerRef = useRef(null);

  const auth = getAuth(app);

  // ✅ Check if user is already verified
  useEffect(() => {
    const checkIfVerified = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (data?.phone) {
          setVerified(true);
          if (typeof onVerified === "function") onVerified();
        }
      } catch (err) {
        console.error("Failed to check phone verification status", err);
      }
    };
    checkIfVerified();
  }, [userId, onVerified]);

  // ✅ Resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (typeof window === "undefined" || window.recaptchaVerifier) return;

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired, reset required.");
        },
      });
    } catch (err) {
      console.error("Recaptcha setup error:", err);
      setError("Failed to setup reCAPTCHA");
    }
  }, [auth]);

  const sendOtp = async () => {
    setError("");
    if (!phone.match(/^\d{10}$/)) {
      return setError("Enter a valid 10-digit phone number");
    }

    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
      setResendCooldown(30); // ✅ Start cooldown
    } catch (err) {
      console.error("Failed to send OTP:", err);
      setError("Failed to send OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => {
    if (resendCooldown > 0) return;
    sendOtp();
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp.match(/^\d{6}$/)) {
      return setError("Enter a valid 6-digit OTP");
    }

    setLoading(true);
    try {
      const res = await confirmationResult.confirm(otp);
      const phoneNumber = res.user.phoneNumber;

      // ✅ Save verified phone to MongoDB
      await fetch("/api/user/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, phone: phoneNumber }),
      });

      setVerified(true); // ✅ Update local state
      if (typeof onVerified === "function") onVerified();
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (verified) return null; // ✅ Hide component if already verified

  return (
    <div className="w-full max-w-sm space-y-4">
      {step === "phone" && (
        <>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit phone"
            className="w-full px-4 py-2 rounded text-black"
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 rounded text-black"
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            onClick={resendOtp}
            disabled={resendCooldown > 0}
            className="w-full bg-gray-600 mt-2 text-white py-2 rounded"
          >
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
          </button>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
    </div>
  );
}
