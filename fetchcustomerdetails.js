import { database } from '/firebaseConfig.js';  // Import the shared database instance

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAkqf4xzSFa6qpFlMF-ce9x6WwDlxCvitw",
//   authDomain: "fir-1-7332d.firebaseapp.com",
//   databaseURL: "https://fir-1-7332d-default-rtdb.firebaseio.com",
//   projectId: "fir-1-7332d",
//   storageBucket: "fir-1-7332d.appspot.com",
//   messagingSenderId: "689157988789",
//   appId: "1:689157988789:web:89530ef7190e4802e2b9fc",
//   measurementId: "G-165ZMR7RPV"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

window.searchCustomerDetails = async function () {
  const customerId = document.getElementById('search-customer-id').value;

  if (!customerId) {
    alert('Please enter a customer ID');
    return;
  }

  try {
    // Log the path for debugging
    const customerRef = ref(database, 'customers/' + customerId);
    console.log("Fetching customer data from:", customerRef.toString());  // Log the path
    const snapshot = await get(customerRef);

    if (snapshot.exists()) {
      const customerData = snapshot.val();
      console.log('Customer Data:', customerData); // Logging the data

      // Format the purchase history, visit history, and reward redemption history for display
      const purchaseHistory = customerData.purchaseHistory.map(purchase => `
        <li>${purchase.product} on ${purchase.date} for $${purchase.amount}</li>
      `).join('');

      const visitHistory = customerData.visitHistory.map(visit => `
        <li>${visit}</li>
      `).join('');

      const rewardRedemptionHistory = customerData.rewardRedemptionHistory.map(reward => `
        <li>${reward.reward} on ${reward.date}</li>
      `).join('');

      // Display customer details
      document.getElementById('customer-details').innerHTML = `
        <p><strong>Customer ID:</strong> ${customerId}</p>
        <p><strong>Name:</strong> ${customerData.name}</p>
        <p><strong>Total Points:</strong> ${customerData.totalPoints}</p>
        <p><strong>Purchase History:</strong></p>
        <ul>${purchaseHistory}</ul>
        <p><strong>Visit History:</strong></p>
        <ul>${visitHistory}</ul>
        <p><strong>Reward Redemption History:</strong></p>
        <ul>${rewardRedemptionHistory}</ul>
      `;
    } else {
      console.log("No customer found with ID:", customerId);
      document.getElementById('customer-details').innerHTML = `<p>No customer found with ID: ${customerId}</p>`;
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    alert("Error fetching customer data: " + error.message);
  }
};