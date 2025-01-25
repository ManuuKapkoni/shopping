// Function to preview the uploaded image
function previewImage() {
    const file = document.getElementById('upload-picture').files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      document.getElementById('profile-picture').src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // Function to handle image upload (Placeholder)
  function uploadImage() {
    const file = document.getElementById('upload-picture').files[0];
    if (file) {
      // Placeholder for actual upload logic (e.g., upload to a server or cloud storage)
      console.log('Uploading image:', file.name);
    } else {
      console.log('No file selected');
    }
  }

  // Add event listener to the form to handle image upload on submission
  document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadImage();
    // Proceed with the form submission (e.g., updating user info in the database)
  });