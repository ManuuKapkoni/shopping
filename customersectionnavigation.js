// Function to show a specific tab and hide the others
function showTab(tabId) {
  // Remove the "active-tab" class from all tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('active-tab');
  });

  // Add the "active-tab" class to the clicked tab
  const activeTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
  activeTab.classList.add('active-tab');

  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active-section');
  });

  // Show the selected section
  const activeSection = document.getElementById(tabId);
  activeSection.classList.add('active-section');
}

// Automatically show the "Bonus Points" section by default
window.onload = function() {
  showTab('bonus-points');
};