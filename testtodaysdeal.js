 // Import Firebase modules
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
 import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

 // Firebase configuration
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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);

 // Fetch Deals from Firebase
 function fetchDeals() {
   const dealsRef = ref(database, 'deals');  // Reference to 'deals' in Firebase DB

   get(dealsRef)
     .then((snapshot) => {
       const data = snapshot.val();
       console.log(data);  // Log the data to the console for debugging
       displayDeals(data);
     })
     .catch((error) => {
       console.error('Error fetching deals:', error);
       document.getElementById('dealsList').innerHTML = "<p>Error fetching deals</p>"; // Show error message
     });
 }

 // Display Deals on the Page
 function displayDeals(deals) {
   const dealsList = document.getElementById('dealsList');
   dealsList.innerHTML = ''; // Clear any existing content

   if (deals) {
     Object.entries(deals).forEach(([key, deal]) => {
       const dealElement = document.createElement('div');
       dealElement.classList.add('deal');
       
       dealElement.innerHTML = `
         <h3>${deal.title}</h3>
         <p><strong>Deal Name:</strong> ${key}</p>
         <p>${deal.description}</p>
         <p><strong>Discount:</strong> ${deal.discount}</p>
         <p><strong>Price:</strong> $${deal.price}</p>
       `;

       dealsList.appendChild(dealElement);
     });
   } else {
     dealsList.innerHTML = "<p>No deals found</p>";
   }
 }

 // Show Today's Deals content when the button is clicked
 document.getElementById("todaysDealsBtn").addEventListener("click", function() {
   // Fetch the deals from Firebase when button is clicked
   fetchDeals();
   
   // Show the deals section
   document.getElementById("todays-deals").style.display = "block";
 });