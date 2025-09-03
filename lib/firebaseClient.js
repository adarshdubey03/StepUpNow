// lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase config pulled from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase (only once, client-side only)
function initFirebase() {
  if (typeof window === "undefined") {
    // Don’t run Firebase init on server
    return null;
  }

  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

// ✅ Get Auth instance safely
export function getFirebaseAuth() {
  const app = initFirebase();
  if (!app) {
    console.error("Firebase app not initialized (server-side call?)");
    return null;
  }
  return getAuth(app);
}
