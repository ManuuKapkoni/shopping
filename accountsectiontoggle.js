
    function showSection(sectionId) {
      // Hide all sections
      const sections = document.querySelectorAll('.content-section');
      sections.forEach(section => {
        section.style.display = 'none';
      });
  
      // Show the selected section
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.style.display = 'block';
      }
    }
  
    function toggleAccountSection() {
      const accountSection = document.getElementById('your-account');
      accountSection.style.display = accountSection.style.display === 'none' || accountSection.style.display === '' ? 'block' : 'none';
    }
  
    function previewImage() {
      const file = document.getElementById('upload-picture').files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        document.getElementById('profile-picture').src = reader.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        document.getElementById('profile-picture').src = '';
      }
    }
  
    function uploadImage() {
      // Placeholder function to handle image upload
      alert('Profile picture uploaded successfully!');
    }
  
    function togglePaymentOptions() {
      const paymentMethod = document.getElementById('payment-method').value;
      document.getElementById('bank-options').style.display = paymentMethod === 'bank' ? 'block' : 'none';
      document.getElementById('other-bank-details').style.display = paymentMethod === 'other' ? 'block' : 'none';
      document.getElementById('card-details').style.display = paymentMethod === 'bank' ? 'block' : 'none';
      document.getElementById('ussd-details').style.display = paymentMethod === 'ussd' ? 'block' : 'none';
    }
  