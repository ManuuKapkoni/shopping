// firebaseConfig.js
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkqf4xzSFa6qpFlMF-ce9x6WwDlxCvitw",
  authDomain: "fir-1-7332d.firebaseapp.com",
  databaseURL: "https://fir-1-7332d-default-rtdb.firebaseio.com",
  projectId: "fir-1-7332d",
  storageBucket: "fir-1-7332d.firebasestorage.app",
  messagingSenderId: "689157988789",
  appId: "1:689157988789:web:89530ef7190e4802e2b9fc",
  measurementId: "G-165ZMR7RPV"
};

// Initialize Firebase only if no app exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
