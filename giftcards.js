// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, equalTo, update } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

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

// Handle Gift Card Submission
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('giftCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const giftCardCode = document.getElementById('giftCardCode').value.trim();
    validateGiftCard(giftCardCode);
  });
});

// Validate the Gift Card Code
function validateGiftCard(code) {
  const giftCardRef = ref(database, 'giftCards');
  const giftCardQuery = query(giftCardRef, orderByChild('code'), equalTo(code));

  get(giftCardQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const giftCard = snapshot.val()[Object.keys(snapshot.val())[0]]; // Get the gift card data

        if (giftCard.isUsed) {
          displayMessage('This gift card has already been used.', 'error');
        } else if (new Date(giftCard.expiryDate) < new Date()) {
          displayMessage('This gift card has expired.', 'error');
        } else {
          applyGiftCard(giftCard); // Apply the gift card value
        }
      } else {
        displayMessage('Invalid gift card code.', 'error');
      }
    })
    .catch((error) => {
      console.error('Error validating gift card:', error);
      displayMessage('An error occurred while validating the gift card.', 'error');
    });
}

// Apply the Gift Card to the Cart
function applyGiftCard(giftCard) {
  const cartTotal = parseFloat(document.getElementById('cartTotal').textContent.replace('$', '')); // Get the cart total
  let newTotal = cartTotal - giftCard.balance;

  if (newTotal < 0) {
    newTotal = 0; // If the gift card exceeds the cart total, set total to 0
  }

  // Update the cart total
  document.getElementById('cartTotal').textContent = `$${newTotal.toFixed(2)}`;

  // Mark the gift card as used in Firebase
  const giftCardRef = ref(database, `giftCards/${giftCard.code}`);
  update(giftCardRef, { isUsed: true })
    .then(() => {
      displayMessage('Gift card applied successfully!', 'success');
    })
    .catch((error) => {
      console.error('Error updating gift card:', error);
      displayMessage('Failed to update gift card status.', 'error');
    });
}

// Display messages to the user
function displayMessage(message, type) {
  const messageDiv = document.getElementById('giftCardMessage');
  messageDiv.textContent = message;
  messageDiv.className = type; // Apply class for styling (success or error)
}