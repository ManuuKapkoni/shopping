
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { database } from '/firebaseConfig.js';  // Import the shared database instance
// import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


// // Check if Firebase app is already initialized
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);  // Replace with your Firebase config
//   } else {
//     firebase.app();  // If already initialized, use that app
//   }
  

// // Function to search for customer details
// window.searchCustomerDetails = async function () {
//   const customerId = document.getElementById('search-customer-id').value;

//   if (!customerId) {
//     alert('Please enter a customer ID');
//     return;
//   }

//   try {
//     const customerRef = ref(database, 'customers/' + customerId);
//     const snapshot = await get(customerRef);

//     if (snapshot.exists()) {
//       const customerData = snapshot.val();
//       console.log('Customer Data:', customerData); // Logging the data

//       // Format the purchase history, visit history, and reward redemption history for display
//       const purchaseHistory = customerData.purchaseHistory.map(purchase => `
//         <li>${purchase.product} on ${purchase.date} for $${purchase.amount}</li>
//       `).join('');

//       const visitHistory = customerData.visitHistory.map(visit => `
//         <li>${visit}</li>
//       `).join('');

//       const rewardRedemptionHistory = customerData.rewardRedemptionHistory.map(reward => `
//         <li>${reward.reward} on ${reward.date}</li>
//       `).join('');

//       // Display customer details
//       document.getElementById('customer-details').innerHTML = `
//         <p><strong>Customer ID:</strong> ${customerId}</p>
//         <p><strong>Name:</strong> ${customerData.name}</p>
//         <p><strong>Total Points:</strong> ${customerData.totalPoints}</p>
//         <p><strong>Purchase History:</strong></p>
//         <ul>${purchaseHistory}</ul>
//         <p><strong>Visit History:</strong></p>
//         <ul>${visitHistory}</ul>
//         <p><strong>Reward Redemption History:</strong></p>
//         <ul>${rewardRedemptionHistory}</ul>
//       `;
//     } else {
//       document.getElementById('customer-details').innerHTML = `<p>No customer found with ID: ${customerId}</p>`;
//     }
//   } catch (error) {
//     console.error("Error fetching customer data:", error);
//     alert("Error fetching customer data: " + error.message);
//   }
// };


// import { database } from '/firebaseConfig.js'; // Import the shared database instance
// import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// // Function to check payment status
// window.checkPayment = async function () {
//   const customerId = document.getElementById('search-customer-id').value;

//   if (!customerId) {
//     alert('Please enter a customer ID');
//     return;
//   }

//   try {
//     // Reference to the customer's payment data in Firebase
//     const paymentRef = ref(database, 'payments/' + customerId);
//     const snapshot = await get(paymentRef);

//     if (snapshot.exists()) {
//       const paymentData = snapshot.val();
//       console.log('Payment Data:', paymentData);

//       // Display payment information on the page
//       document.getElementById('payment-info').innerHTML = `
//         <p><strong>Customer ID:</strong> ${customerId}</p>
//         <p><strong>Total Amount Paid:</strong> $${paymentData.totalAmount}</p>
//         <p><strong>Number of Payments:</strong> ${paymentData.paymentCount}</p>
//         <p><strong>Last Payment Date:</strong> ${paymentData.lastPaymentDate}</p>
//       `;
//     } else {
//       document.getElementById('payment-info').innerHTML = `
//         <p>No payment records found for Customer ID: ${customerId}</p>
//       `;
//     }
//   } catch (error) {
//     console.error("Error fetching payment data:", error);
//     alert("Error fetching payment data: " + error.message);
//   }
// };

import { database } from './firebase.js'; // Adjust the path as needed
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Function to fetch customer details
window.searchCustomerDetails = async function () {
  const customerId = document.getElementById('search-customer-id').value;

  if (!customerId) {
    alert('Please enter a customer ID');
    return;
  }

  try {
    const customerRef = ref(database, 'customers/' + customerId);
    const snapshot = await get(customerRef);

    if (snapshot.exists()) {
      const customerData = snapshot.val();
      console.log('Customer Data:', customerData);

      // Render customer data dynamically
      document.getElementById('customer-details').innerHTML = `
        <p><strong>Customer ID:</strong> ${customerId}</p>
        <p><strong>Name:</strong> ${customerData.name}</p>
        <p><strong>Total Points:</strong> ${customerData.totalPoints}</p>
      `;
    } else {
      document.getElementById('customer-details').innerHTML = `<p>No customer found with ID: ${customerId}</p>`;
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    alert("Error fetching customer data: " + error.message);
  }
};
