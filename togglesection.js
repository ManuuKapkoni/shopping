// Show a specific section by its ID
function showSection(sectionId) {
    // Get all sections with the class 'content-section'
    const sections = document.querySelectorAll('.content-section');
  
    // Hide all sections
    sections.forEach(section => {
      section.classList.add('d-none');  // Use 'd-none' class to hide sections
    });
  
    // Show the selected section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
      sectionToShow.classList.remove('d-none');  // Remove 'd-none' to display the section
    }
  }
  
  // Toggle tab sections inside a section
  function toggleSection(tabId) {
    // Get all tab content sections
    const tabContents = document.querySelectorAll('.tab-content');
  
    // Hide all tab content sections
    tabContents.forEach(tabContent => {
      tabContent.style.display = 'none';
    });
  
    // Show the selected tab content section
    const tabToShow = document.getElementById(tabId);
    if (tabToShow) {
      tabToShow.style.display = 'block';  // Show the selected tab content section
    }
  }
  
  // Optional: Automatically show the Dashboard section by default
  document.addEventListener("DOMContentLoaded", function () {
    showSection('dashboard');  // This will make the Dashboard section visible by default
  });
  