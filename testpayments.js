
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkqf4xzSFa6qpFlMF-ce9x6WwDlxCvitw",
  authDomain: "fir-1-7332d.firebaseapp.com",
  databaseURL: "https://fir-1-7332d-default-rtdb.firebaseio.com",
  projectId: "fir-1-7332d",
  storageBucket: "fir-1-7332d.appspot.com",
  messagingSenderId: "689157988789",
  appId: "1:689157988789:web:89530ef7190e4802e2b9fc",
  measurementId: "G-165ZMR7RPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Check Payment Status
async function checkPayment() {
  const phone = document.getElementById("phone").value;
  const paymentInfoDiv = document.getElementById("payment-info");

  if (!phone) {
    alert("Please enter a phone number.");
    return;
  }

  try {
    const paymentRef = ref(database, `payments/${phone}`);
    const snapshot = await get(paymentRef);

    if (snapshot.exists()) {
      const paymentData = snapshot.val();
      paymentInfoDiv.innerHTML = `
        <p>Phone: ${phone}</p>
        <p>Amount Due: $${paymentData.amount_due}</p>
        <p>Status: ${paymentData.status}</p>
        <button onclick="markAsPaid('${phone}')">Mark as Paid</button>
      `;
    } else {
      paymentInfoDiv.innerHTML = `<p>No payment record found for this number.</p>`;
    }
  } catch (error) {
    console.error("Error fetching payment data:", error);
  }
}

// Mark as Paid
async function markAsPaid(phone) {
  try {
    const paymentRef = ref(database, `payments/${phone}`);
    await update(paymentRef, { status: 'paid' });
    alert("Payment marked as paid.");
    checkPayment(); // Refresh payment status
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
}

// Attach functions to the window object to make them accessible globally
window.checkPayment = checkPayment;
window.markAsPaid = markAsPaid;
