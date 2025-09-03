"use client";

import React, { useState, useRef } from "react";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneVerification({
  onVerified,
  initialPhone = "",
  show = false,
  onClose,
}) {
  const [phone, setPhone] = useState(initialPhone || "");
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  // ✅ Normalize to +91XXXXXXXXXX
  const normalizePhone = (p) => {
    if (!p) return "";
    let s = p.replace(/\s|-/g, "");
    s = s.replace(/^0+/, "");
    s = s.replace(/^\+?91/, "");
    return "+91" + s;
  };

  // ✅ Correct Recaptcha setup for Firebase v9+
  const setupRecaptcha = (auth) => {
    if (typeof window === "undefined") return null;
    if (!window.__firebaseRecaptcha) {
      window.__firebaseRecaptcha = new RecaptchaVerifier(
        auth, // ✅ first param is auth (not container ID)
        "recaptcha-container", // ✅ container ID
        { size: "invisible" } // ✅ config
      );
    }
    return window.__firebaseRecaptcha;
  };

  const startTimer = (sec = 60) => {
    setTimer(sec);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  // ✅ Send OTP
  const sendOtp = async () => {
    setSending(true);
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase auth not initialized.");
      const verifier = setupRecaptcha(auth);
      const normalized = normalizePhone(phone);

      if (!/^\+91\d{10}$/.test(normalized)) {
        throw new Error("Enter a valid 10 digit Indian mobile number.");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        normalized,
        verifier
      );

      setConfirmationResult(confirmation);
      startTimer(60);
      alert("OTP sent to " + normalized);
    } catch (err) {
      console.error("sendOtp error:", err);
      alert("Failed to send OTP: " + (err.message || err));
    } finally {
      setSending(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please request an OTP first.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      const verifiedPhone = result.user.phoneNumber;

      const res = await fetch("/api/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: verifiedPhone }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Failed to save phone");

      onVerified && onVerified(verifiedPhone);
      onClose && onClose();
    } catch (err) {
      console.error("verifyOtp error:", err);
      alert("OTP verification failed: " + (err.message || err));
    }
  };

  // ✅ Resend OTP
  const resendOtp = async () => {
    if (timer > 0) return;
    setOtp("");
    await sendOtp();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="relative max-w-md w-full p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Verify your Phone
        </h2>

        {/* Phone Input */}
        <label className="block text-sm text-gray-300 mb-2">
          Phone number (India)
        </label>
        <div className="flex gap-2">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendOtp}
            disabled={sending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </div>

        {/* Recaptcha container */}
        <div id="recaptcha-container" />

        {/* OTP Input */}
        {confirmationResult && (
          <>
            <label className="block text-sm text-gray-300 mt-4 mb-2">
              Enter OTP
            </label>
            <div className="flex gap-2">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={verifyOtp}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Verify
              </button>
            </div>

            <div className="mt-3 text-sm text-gray-400">
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-blue-400 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
