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

 // Fetch New Arrivals from Firebase
 function fetchNewArrivals() {
   const newArrivalsRef = ref(database, 'newArrivals');  // Reference to 'newArrivals' in Firebase DB

   get(newArrivalsRef)
     .then((snapshot) => {
       const data = snapshot.val();
       console.log(data);  // Log the data to the console for debugging
       displayNewArrivals(data);  // Directly display new arrivals
     })
     .catch((error) => {
       console.error('Error fetching new arrivals:', error);
       document.getElementById('newArrivalsList').innerHTML = "<p>Error fetching new arrivals</p>"; // Show error message
     });
 }

 // Display New Arrivals on the Page
 function displayNewArrivals(newArrivals) {
   const newArrivalsList = document.getElementById('newArrivalsList');
   newArrivalsList.innerHTML = ''; // Clear any existing content

   if (newArrivals) {
     Object.entries(newArrivals).forEach(([key, item]) => {
       const itemElement = document.createElement('div');
       itemElement.classList.add('new-arrival');
       
       // Creating the HTML content for each new item
       itemElement.innerHTML = `
         <h3>${item.title}</h3>
         <p><strong>Deal Name:</strong> ${key}</p>
         <p>${item.description}</p>
         <p><strong>Price:</strong> $${item.price}</p>
         <img src="${item.image}" alt="${item.title}" class="product-image">
       `;

       // Append the item element to the list
       newArrivalsList.appendChild(itemElement);
     });
   } else {
     newArrivalsList.innerHTML = "<p>No new arrivals found</p>";
   }
 }

 // Show New Arrivals content when the button is clicked
 document.getElementById("newArrivalsBtn").addEventListener("click", function() {
   // Fetch the new arrivals from Firebase when button is clicked
   fetchNewArrivals();
   
   // Show the new arrivals section
   document.getElementById("new-arrivals").style.display = "block";
 });