// Function to toggle the Cart section visibility
function toggleCart() {
    const cartPage = document.getElementById("cartPage");
    const currentDisplay = cartPage.style.display;
    
    // Toggle between block and none
    if (currentDisplay === "none" || currentDisplay === "") {
      cartPage.style.display = "flex"; // Show cart and scanned items side by side
      fetchScannedItems(); // This can be a function to get scanned RFID tags dynamically
      fetchCartItems(); // Similarly, function to fetch cart items
    } else {
      cartPage.style.display = "none"; // Hide cart and scanned items
    }
  }

  // Function to simulate fetching scanned items (replace with actual RFID scanning code)
  function fetchScannedItems() {
    const scannedItemsContainer = document.getElementById("scannedItemsContainer");
    scannedItemsContainer.innerHTML = ""; // Clear previous items

    // Simulated scanned RFID tags (replace with actual dynamic data from your system)
    const scannedItems = [
      { id: "12345", name: "Item 1" },
      { id: "67890", name: "Item 2" },
    ];

    scannedItems.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.innerHTML = `<p>ID: ${item.id} - Name: ${item.name}</p>`;
      scannedItemsContainer.appendChild(itemElement);
    });
  }

  // Function to simulate fetching cart items (replace with actual data from your system)
  function fetchCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let totalAmount = 0;

    // Simulated cart items (replace with actual dynamic data)
    const cartItems = [
      { name: "Product 1", price: 10.99, description: "This is a sample product." },
      { name: "Product 2", price: 15.50, description: "This is another sample product." },
    ];

    cartItems.forEach(item => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>Price: $${item.price}</p>
      `;
      cartItemsContainer.appendChild(productElement);
      totalAmount += item.price;
    });

    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
  }

  // Checkout function (for future implementation)
  function checkout() {
    alert("Proceeding to checkout...");
  }