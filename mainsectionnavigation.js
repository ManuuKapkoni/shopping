  // Function to show the selected section
  function showSection(sectionId) {
    // Hide all sections first
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('show');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('show');
    }

    // Set the active class to the clicked button
    const buttons = document.querySelectorAll('#navigation button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });

    const activeButton = Array.from(buttons).find(button => button.innerText.toLowerCase() === sectionId.replace(/-/g, ' ').toLowerCase());
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }

  // Default to showing the Dashboard section when the page loads
  window.onload = function() {
    showSection('dashboard');
  };
  function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll("section");
  
    // Hide all sections
    sections.forEach(section => {
      section.style.display = "none";
    });
  
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  }
  