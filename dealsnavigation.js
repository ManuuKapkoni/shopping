
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
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Fetch Deals from Firebase
  function fetchDeals() {
    const dealsRef = database.ref('deals');  // Reference to 'deals' in Firebase DB
  
    dealsRef.once('value', (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const deals = data.deals;
        displayDeals(deals);
      } else {
        console.error('No deals found');
      }
    });
  }
  
  // Display Deals on the Page
  function displayDeals(deals) {
    const dealsList = document.getElementById('dealsList');
    dealsList.innerHTML = ''; // Clear any existing content
  
    // Loop through deals and display them
    for (const key in deals) {
      if (deals.hasOwnProperty(key)) {
        const deal = deals[key];
        const dealElement = document.createElement('div');
        dealElement.classList.add('deal');
        
        dealElement.innerHTML = `
          <h3>${deal.title}</h3>
          <p>${deal.description}</p>
          <p>Discount: ${deal.discount}</p>
          <p>Price: $${deal.price}</p>
        `;
  
        dealsList.appendChild(dealElement);
      }
    }
  }
  