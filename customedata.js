
// Import Firebase modules correctly for modular SDK
    // import { database } from '/firebaseConfig.js';  // Correct path to the firebaseConfig.js file
    import { initializeApp, getApp, getApps } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';  // Firebase app
    import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';  // Firestore
    import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';  // Firebase Auth

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

    // Ensure Firebase is initialized only once
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    // Initialize Firestore and Auth
    const db = getFirestore(app);  // Firestore instance
    const auth = getAuth(app);  // Auth instance

    // Now you can use Firestore and Auth in your code
// Fetch and display customer data
async function getCustomerData() {
  try {
    const customersRef = collection(db, "customers");
    const querySnapshot = await getDocs(customersRef);
    const customerList = document.getElementById("customer-list");
    const customerPointsList = document.getElementById("customer-points-list");

    querySnapshot.forEach((doc) => {
      const customerData = doc.data();
      const customerItem = document.createElement("li");
      customerItem.textContent = `${customerData.name} (ID: ${doc.id})`;
      customerList.appendChild(customerItem);

      const pointsItem = document.createElement("li");
      pointsItem.textContent = `${customerData.name}: ${customerData.points} points`;
      customerPointsList.appendChild(pointsItem);
    });
  } catch (error) {
    console.error("Error fetching customer data: ", error);
  }
}

// Delete a customer by ID
async function deleteCustomer() {
  const customerId = document.getElementById("delete-customer-id").value;
  if (customerId) {
    try {
      const customerRef = doc(db, "customers", customerId);
      await deleteDoc(customerRef);
      alert("Customer deleted successfully!");
      location.reload(); // Reload to update the list
    } catch (error) {
      console.error("Error deleting customer: ", error);
      alert("Error deleting customer.");
    }
  } else {
    alert("Please enter a customer ID.");
  }
}

// Attach event listener to the delete button
document.getElementById("delete-customer-button").addEventListener("click", deleteCustomer);

// Initialize the functions when the page loads
window.onload = function() {
  getCustomerData();
};


//TOGGLE CUSTOMER SECTIONS
  // Function to toggle between sections
  function showSection(sectionId) {
      // First hide all sections
      const sections = document.querySelectorAll('.content-section');
      sections.forEach(section => {
        section.classList.remove('active-section');
      });

      // Remove active class from all tabs
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.classList.remove('active-tab');
      });

      // Show the clicked section and highlight its tab
      document.getElementById(sectionId).classList.add('active-section');
      const activeTab = Array.from(tabs).find(tab => tab.textContent.toLowerCase() === sectionId.replace('-', ' '));
      if (activeTab) activeTab.classList.add('active-tab');
    }

    // Placeholder functions for search and refresh buttons
    window.searchCustomerPoints = function() {
      // Function to search customer points logic
    };

    window.toggleCustomerPoints = function() {
      // Refresh points logic
    };

    window.searchCustomerDetails = function() {
      // Function to search customer details
    };