import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js"; // Import `set` and `update`

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

// Fetch the scanned RFID tags from Firebase
function fetchScannedTags() {
    const scannedTagsRef = ref(database, 'scanned_rfid_tags');
    get(scannedTagsRef)
        .then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tags = Object.values(data); // Convert object to array of tag objects
                displayScannedTags(tags); // Function to display them
            } else {
                console.log('No scanned tags found');
            }
        })
        .catch((error) => {
            console.error('Error fetching scanned RFID tags:', error);
        });
}

// Display the scanned RFID tags and corresponding product information
function displayScannedTags(tags) {
    const tagsList = document.getElementById('tagsList');
    const cartList = document.getElementById('cartList');
    tagsList.innerHTML = ''; // Clear previous content
    cartList.innerHTML = ''; // Clear cart content
    totalAmount = 0; // Reset total
    itemsPurchased = []; // Reset items array

    tags.forEach(tag => {
        const rfidTag = tag.rfid_tag;
        
        // Display RFID tag and product name under scanned RFID section
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.innerHTML = `<p>RFID Tag ID: ${rfidTag}</p>`;
        tagsList.appendChild(tagElement);

        // Retrieve the corresponding product information from the "products" node
        const productRef = ref(database, 'products/' + rfidTag);
        get(productRef)
            .then((productSnapshot) => {
                const productData = productSnapshot.val();
                if (productData) {
                    // Display product details in cart
                    const cartElement = document.createElement('div');
                    cartElement.classList.add('cart-item');
                    cartElement.innerHTML = `
                        <h3>${productData.name}</h3>
                        <p>${productData.description}</p>
                        <p>Price: $${productData.price}</p>
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
                    console.log('Product not found for RFID tag:', rfidTag);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    });
}

// Handle checkout and payment method
function handleCheckout() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!paymentMethod || !phoneNumber) {
        alert('Please select a payment method and provide a phone number.');
        return;
    }

    // Calculate points (example: 1 point for every $10 spent)
    const pointsAwarded = Math.floor(totalAmount / 10);

    // Create a payment record in Firebase under the customer's phone number
    const paymentRef = ref(database, 'payments/' + phoneNumber); // Use phone number as the primary key
    set(paymentRef, {
        items: itemsPurchased, // List of items purchased
        pointsAwarded: pointsAwarded, // Points awarded
        totalAmount: totalAmount, // Total amount paid
        paymentMethod: paymentMethod, // Payment method
        timestamp: Date.now() // Timestamp of the transaction
    })
    .then(() => {
        alert('Payment details saved successfully!');

        // Optionally, update user's points in the 'users' section
        const userRef = ref(database, 'users/' + phoneNumber); // Use phone number as user ID
        update(userRef, {
            points: pointsAwarded // Update the user's points
        });

        // Fetch and display the payment details (purchased items) in the cart section
        displayPurchasedItems(phoneNumber);
    })
    .catch((error) => {
        console.error('Error saving payment data:', error);
    });
}

// Fetch and display the purchased items for the customer from Firebase
function displayPurchasedItems(phoneNumber) {
    const paymentRef = ref(database, 'payments/' + phoneNumber); // Use phone number as the primary key
    get(paymentRef)
        .then((snapshot) => {
            const paymentData = snapshot.val();
            if (paymentData) {
                const cartList = document.getElementById('cartList');
                cartList.innerHTML = ''; // Clear previous cart content

                // Display items from the payment data
                paymentData.items.forEach(item => {
                    const cartElement = document.createElement('div');
                    cartElement.classList.add('cart-item');
                    cartElement.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>Price: $${item.price}</p>
                    `;
                    cartList.appendChild(cartElement);
                });

                // Update the total amount in the cart
                document.getElementById('total-price').innerText = `Total: $${paymentData.totalAmount.toFixed(2)}`;
            } else {
                console.log('No payment data found for phone number:', phoneNumber);
            }
        })
        .catch((error) => {
            console.error('Error fetching payment data:', error);
        });
}

// Call this function to update and display scanned tags when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchScannedTags();
});

// Bind checkout button
document.getElementById('checkoutBtn').addEventListener('click', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'block'; // Show payment form
});

// Bind payment submission
document.getElementById('submitPayment').addEventListener('click', handleCheckout);