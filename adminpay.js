// Define checkPayment function
function checkPayment() {
    const phoneNumber = document.getElementById('phone-number').value;  // Example input ID
    const amountDue = document.getElementById('amount-due').value;      // Example input ID
  
    if (!phoneNumber || !amountDue) {
      alert("Please enter both phone number and amount.");
      return;
    }
  
    // Logic to check payment status from Firebase (Example)
    const paymentRef = ref(database, 'payments/' + phoneNumber);
    get(paymentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const paymentData = snapshot.val();
          if (paymentData.status === 'paid') {
            alert("Payment has been made.");
          } else {
            alert("Payment is pending.");
          }
        } else {
          alert("No payment data found for this phone number.");
        }
      })
      .catch((error) => {
        console.error("Error checking payment:", error);
        alert("Error checking payment status.");
      });
  }
  