// window.onload = function() {
//     fetchDeals();
// }

// function fetchDeals() {
//     fetch('https://your-firebase-url.firebaseio.com/deals.json')
//         .then(response => response.json())
//         .then(data => {
//             const dealsContainer = document.getElementById('todaysDealsContent');

//             // Ensure the dealsContainer exists before trying to update it
//             if (dealsContainer) {
//                 // Check if data is an object (Firebase returns an object with keys, not an array)
//                 if (data && typeof data === 'object') {
//                     let dealsHTML = '';
                    
//                     // If it's an object, loop through the keys to get the deals
//                     for (let key in data) {
//                         const deal = data[key]; // Each deal is now an object with properties (name, price, etc.)
//                         dealsHTML += `<p>${deal.name}: $${deal.price}</p>`;
//                     }

//                     // Update the content area with the deals HTML
//                     dealsContainer.innerHTML = dealsHTML;
//                 } else {
//                     console.error('Invalid data format: expected an object or array.');
//                 }
//             } else {
//                 console.error('Deals container not found.');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching deals:', error);
//         });
// }

// Fetch deals from Firebase
function fetchDeals() {
    fetch('https://your-firebase-url.firebaseio.com/deals.json')
    .then(response => response.json())
    .then(data => {
        // Ensure data is an object with keys like 'deal1', 'deal2', etc.
        if (data && data.deals) {
            const deals = data.deals;
            let dealsHTML = '';  // Variable to hold the HTML content
            
            // Loop through each deal and create HTML content dynamically
            for (const dealKey in deals) {
                const deal = deals[dealKey];
                dealsHTML += `
                    <div class="deal">
                        <h3>${deal.title}</h3>
                        <p>${deal.description}</p>
                        <p><strong>Discount:</strong> ${deal.discount}</p>
                        <p><strong>Price:</strong> $${deal.price}</p>
                    </div>
                `;
            }
            
            // Insert the dynamically generated content into your page
            document.getElementById('todaysDealsContent').innerHTML = dealsHTML;
        } else {
            console.log('No deals found');
        }
    })
    .catch(error => {
        console.error('Error fetching deals:', error);
    });
}

// Ensure that the fetchDeals function runs when the page loads
window.onload = function() {
    fetchDeals();
};
