import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAkMf8KzBuiyemAXm0PVhFlUftL-2bofzI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "profsummit-29a2a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "profsummit-29a2a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "profsummit-29a2a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1014183960763",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1014183960763:web:25c192a6cfffe5f035c99e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5FCPFXF1JL",
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
