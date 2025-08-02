// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_x2AsKEpkzawUBqCsm5BizORN5xgPFTY",
  authDomain: "stepupnow-51bc5.firebaseapp.com",
  projectId: "stepupnow-51bc5",
  storageBucket: "stepupnow-51bc5.appspot.com",
  messagingSenderId: "834665518824",
  appId: "1:834665518824:web:2328db09ca571c88e21b5d",
  measurementId: "G-GQ5HFHVBFE"
};

// Prevent re-initializing during hot-reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
