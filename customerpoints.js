 // Import Firebase functions
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { database } from '/firebaseConfig.js';  // Import the shared database instance
 import { getDatabase, ref, get, update, child} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

//  // Firebase Configuration
//  const firebaseConfig = {
//    apiKey: "AIzaSyAkqf4xzSFa6qpFlMF-ce9x6WwDlxCvitw",
//    authDomain: "fir-1-7332d.firebaseapp.com",
//    databaseURL: "https://fir-1-7332d-default-rtdb.firebaseio.com",
//    projectId: "fir-1-7332d",
//    storageBucket: "fir-1-7332d.firebasestorage.app",
//    messagingSenderId: "689157988789",
//    appId: "1:689157988789:web:89530ef7190e4802e2b9fc",
//    measurementId: "G-165ZMR7RPV"
//  };

//  // Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//  const database = getDatabase(app);

 // Function to calculate points
 function calculatePoints(purchaseHistory, visits) {
   let points = visits * 10; // 10 points per visit

   // Calculate points based on purchases
   purchaseHistory.forEach(purchase => {
     let multiplier = 1; // Default multiplier
     if (purchase.category === "fruits" || purchase.category === "vegetables") {
       multiplier = 2; // Double points for fruits and vegetables
     }
     points += purchase.amountSpent * multiplier;
   });

   return points;
 }

 // Function to toggle customer points display
 let isPointsVisible = false; // Track visibility state

 async function toggleCustomerPoints() {
   const customerPointsList = document.getElementById("customer-points-list");

   if (isPointsVisible) {
     // Hide the points list
     customerPointsList.innerHTML = "";
     isPointsVisible = false;
     return;
   }

   // Show the points list
   customerPointsList.innerHTML = ""; // Clear previous list
   const customersRef = ref(database, "customers");

   try {
     const snapshot = await get(customersRef);
     if (snapshot.exists()) {
       const customers = snapshot.val();

       Object.keys(customers).forEach(async customerID => {
         const customer = customers[customerID];
         const totalPoints = calculatePoints(customer.purchaseHistory || [], customer.visits || 0);

         // Display customer info
         const li = document.createElement("li");
         li.textContent = `${customer.name} - Points: ${totalPoints}`;
         customerPointsList.appendChild(li);

         // Update points in Firebase
         await update(ref(database, `customers/${customerID}`), { points: totalPoints });
       });
     } else {
       customerPointsList.innerHTML = "<li>No customers found</li>";
     }
   } catch (error) {
     console.error("Error fetching data:", error);
   }

   isPointsVisible = true; // Mark as visible
 }

 // Expose the function to the global window object
 window.toggleCustomerPoints = toggleCustomerPoints;

  // Function to search for a customer's points
  async function searchCustomerPoints() {
    const customerID = document.getElementById("search-customer-id").value;
    const customerPointsDisplay = document.getElementById("search-result");

    if (!customerID.trim()) {
      customerPointsDisplay.textContent = "Please enter a valid Customer ID.";
      return;
    }

    const customerRef = child(ref(database), `customers/${customerID}`);

    try {
      const snapshot = await get(customerRef);
      if (snapshot.exists()) {
        const customer = snapshot.val();
        const points = customer.points || "No points available";
        customerPointsDisplay.textContent = `${customer.name || "Customer"} - Points: ${points}`;
      } else {
        customerPointsDisplay.textContent = "Customer not found.";
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      customerPointsDisplay.textContent = "An error occurred while searching.";
    }
  }

  // Expose the function globally
  window.searchCustomerPoints = searchCustomerPoints;