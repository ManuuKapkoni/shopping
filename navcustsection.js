import { database } from '/firebaseConfig.js';  // Import the shared database instance

// Example of using Firebase
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

function fetchData() {
  const usersRef = ref(database, 'users');
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Fetched data:', data);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

fetchData();
