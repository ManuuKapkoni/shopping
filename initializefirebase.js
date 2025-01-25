 // Firebase Configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAkqf4xzSFa6qpFlMF-ce9x6WwDlxCvitw",
    authDomain: "fir-1-7332d.firebaseapp.com",
    projectId: "fir-1-7332d",
    storageBucket: "fir-1-7332d.firebasestorage.app",
    messagingSenderId: "689157988789",
    appId: "1:689157988789:web:89530ef7190e4802e2b9fc",
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  // Initialize Firebase Services
  const auth = firebase.auth(); // Initialize Firebase Authentication
  const db = firebase.firestore(); // Initialize Firestore
  const storage = firebase.storage(); // Initialize Firebase Storage
