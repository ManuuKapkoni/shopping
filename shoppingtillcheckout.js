import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, get, set, update,push } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js"; // Import `set` and `update`

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let totalAmount = 0;
let itemsPurchased = []; // Array to hold the items the customer bought




// Fetch the cart items from Firebase and corresponding product data
function fetchCartAndProducts() {
    const cartRef = ref(database, 'cart');  // Reference to the 'cart' table in Firebase
    get(cartRef)
        .then((snapshot) => {
            const cartData = snapshot.val();
            if (cartData) {
                const cartItemIds = Object.keys(cartData);  // Get the keys (IDs) of the cart items

                // Loop through each item ID in the cart
                cartItemIds.forEach(cartItemId => {
                    const cartItem = cartData[cartItemId];

                    // Now fetch product details from the 'products' table using the cart item's ID
                    const productRef = ref(database, 'products/' + cartItemId);
                    get(productRef)
                        .then((productSnapshot) => {
                            const productData = productSnapshot.val();
                            if (productData) {
                                // Display RFID scan results (name and price) in the RFID section
                                const tagsList = document.getElementById('tagsList');
                                const tagElement = document.createElement('div');
                                tagElement.classList.add('tag');
                                tagElement.innerHTML = `
                                    <p>Product: ${productData.name}</p>
                                    <p>Price: $${productData.price}</p>
                                `;
                                tagsList.appendChild(tagElement);

                                // Display cart item in the Cart section (name and price only)
                                const cartList = document.getElementById('cartList');
                                const cartElement = document.createElement('div');
                                cartElement.classList.add('cart-item');
                                cartElement.innerHTML = `
                                    <h3>${productData.name}</h3>
                                    <p>Price: $${productData.price}</p>
                                    <button onclick="toggleCartDetails('${cartItemId}')">View Details</button>
                                    <div id="details-${cartItemId}" class="cart-details" style="display: none;">
                                        <p>${productData.description}</p>
                                        <p>Other Info: ${productData.otherInfo}</p>
                                    </div>
                                `;
                                cartList.appendChild(cartElement);

                                // Add product to the items array and update total amount
                                itemsPurchased.push({
                                    name: productData.name,
                                    description: productData.description,
                                    price: productData.price
                                });

                                totalAmount += parseFloat(productData.price);
                                document.getElementById('total-price').innerText = `Total: $${totalAmount.toFixed(2)}`;
                            } else {
                                console.log('Product not found for ID:', cartItemId);
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching product data:', error);
                        });
                });
            } else {
                console.log('No items in the cart');
            }
        })
        .catch((error) => {
            console.error('Error fetching cart data:', error);
        });
}

// Function to toggle visibility of product details in the cart
function toggleCartDetails(cartItemId) {
    const detailsDiv = document.getElementById('details-' + cartItemId);
    if (detailsDiv) {
        // Toggle the display of the product details
        if (detailsDiv.style.display === 'none') {
            detailsDiv.style.display = 'block';
        } else {
            detailsDiv.style.display = 'none';
        }
    }
}

// // Handle checkout and payment method
// function handleCheckout() {
//     const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
//     const phoneNumber = document.getElementById('phoneNumber').value;

//     if (!paymentMethod || !phoneNumber) {
//         alert('Please select a payment method and provide a phone number.');
//         return;
//     }

//     // Calculate points (example: 1 point for every $10 spent)
//     const pointsAwarded = Math.floor(totalAmount / 10);

//     // Create a payment record in Firebase under the customer's phone number
//     const paymentRef = ref(database, 'payments/' + phoneNumber); // Use phone number as the primary key
//     set(paymentRef, {
//         items: itemsPurchased, // List of items purchased
//         pointsAwarded: pointsAwarded, // Points awarded
//         totalAmount: totalAmount, // Total amount paid
//         paymentMethod: paymentMethod, // Payment method
//         timestamp: Date.now() // Timestamp of the transaction
//     })
//     .then(() => {
//         alert('Payment details saved successfully!');

//         // Optionally, update user's points in the 'users' section
//         const userRef = ref(database, 'users/' + phoneNumber); // Use phone number as user ID
//         update(userRef, {
//             points: pointsAwarded // Update the user's points
//         });

//         // Optionally reset the cart after payment
//         document.getElementById('cartList').innerHTML = '';
//         document.getElementById('total-price').innerText = 'Total: $0.00';
//     })
//     .catch((error) => {
//         console.error('Error saving payment data:', error);
//     });
// }


function handleCheckout() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!paymentMethod || !phoneNumber) {
        alert('Please select a payment method and provide a phone number.');
        return;
    }

    // Calculate points (example: 1 point for every $10 spent)
    const pointsAwarded = Math.floor(totalAmount / 10);

    // Prepare the payment data
    const paymentData = {
        phoneNumber: phoneNumber, // Customer's phone number
        items: itemsPurchased, // List of items purchased
        totalAmount: totalAmount, // Total amount paid
        paymentMethod: paymentMethod, // Payment method used
        pointsAwarded: pointsAwarded, // Points awarded
        timestamp: Date.now() // Timestamp of the transaction
    };

    // Create a payment record in the 'payments' table with a unique key
    const paymentRef = ref(database, 'payments');
    const newPaymentRef = push(paymentRef); // Generate a new unique key for this payment

    set(newPaymentRef, paymentData)
        .then(() => {
            alert('Payment details saved successfully!');

            // Optionally update user's points in the 'users' section
            const userRef = ref(database, 'users/' + phoneNumber); // Use phone number as user ID
            update(userRef, {
                points: pointsAwarded // Update the user's points
            });

            // Reset the cart after payment
            document.getElementById('cartList').innerHTML = '';
            document.getElementById('total-price').innerText = 'Total: $0.00';
            itemsPurchased = []; // Clear the purchased items array
            totalAmount = 0; // Reset the total amount
        })
        .catch((error) => {
            console.error('Error saving payment data:', error);
        });
}

// Call this function to update and display scanned tags when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchCartAndProducts();  // Fetch cart and product data
});

// Bind checkout button
document.getElementById('checkoutBtn').addEventListener('click', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'block'; // Show payment form
});

// Bind payment submission
document.getElementById('submitPayment').addEventListener('click', handleCheckout);

// Get references to the button and the section
const todaysDealsBtn = document.getElementById('todaysDealsBtn');
const todaysDealsSection = document.getElementById('todays-deals');

// Add event listener to the button
todaysDealsBtn.addEventListener('click', function() {
    // Toggle the display of the Today's Deals section
    if (todaysDealsSection.style.display === 'none' || todaysDealsSection.style.display === '') {
        todaysDealsSection.style.display = 'block';  // Show the section
        todaysDealsBtn.textContent = "Hide Today's Deals";  // Change button text
    } else {
        todaysDealsSection.style.display = 'none';   // Hide the section
        todaysDealsBtn.textContent = "Show Today's Deals";  // Reset button text
    }
});
