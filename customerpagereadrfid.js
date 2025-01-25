// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Fetch product details when an RFID tag is scanned
function fetchProductDetails(rfidTag) {
  const cartRef = ref(database, `cart/${rfidTag}`);
  onValue(cartRef, (snapshot) => {
    const product = snapshot.val();
    if (product) {
      displayRFIDScan(product.productName, product.price);
      fetchFullProductDetails(rfidTag);
    }
  });
}

// Display product name and price in the RFID Scans section
function displayRFIDScan(name, price) {
  const tagsList = document.getElementById('tagsList');
  const item = document.createElement('div');
  item.innerHTML = `<p><strong>Product:</strong> ${name} | <strong>Price:</strong> $${price}</p>`;
  tagsList.appendChild(item);
}

// Fetch full product details (name, price, description, varieties)
function fetchFullProductDetails(rfidTag) {
  const productRef = ref(database, `products/${rfidTag}`);
  onValue(productRef, (snapshot) => {
    const productDetails = snapshot.val();
    if (productDetails) {
      displayCartItem(productDetails);
      updateTotalPrice(productDetails.price);
    }
  });
}

// Display full product details in the Cart section
function displayCartItem(product) {
  const cartList = document.getElementById('cartList');
  const item = document.createElement('div');
  item.innerHTML = `
    <h4>${product.productName}</h4>
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <p><strong>Varieties:</strong> ${product.varieties}</p>
    <hr>
  `;
  cartList.appendChild(item);
}

// Update the total price
let totalPrice = 0;
function updateTotalPrice(price) {
  totalPrice += price;
  document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Simulate RFID scanning (replace this with real RFID reader logic)
function simulateRFIDScan() {
  const simulatedTags = ["d9d83f2", "e3862cda", "6ea973f"];
  simulatedTags.forEach(tag => {
    fetchProductDetails(tag);
  });
}

// Event Listener for the "Shop Now" button
document.getElementById('shopNowButton').addEventListener('click', function () {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('cartPage').style.display = 'block';
  simulateRFIDScan();
});

// Payment Submission
document.getElementById('submitPayment').addEventListener('click', function () {
  const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
  const phoneNumber = document.getElementById('phoneNumber').value;

  if (selectedPaymentMethod && phoneNumber) {
    alert(`Payment of $${totalPrice.toFixed(2)} made via ${selectedPaymentMethod.value}.`);
    // Clear the cart after payment
    document.getElementById('cartList').innerHTML = '';
    document.getElementById('tagsList').innerHTML = '';
    document.getElementById('total-price').innerText = 'Total: $0.00';
    totalPrice = 0;
  } else {
    alert("Please select a payment method and enter your phone number.");
  }
});
