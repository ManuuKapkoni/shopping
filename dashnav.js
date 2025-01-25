 // Function to toggle between sections
 function toggleSection(section) {
    // Hide all sections
    document.getElementById('new-item-section').style.display = 'none';
    document.getElementById('recent-activity').style.display = 'none';
    document.getElementById('progress-tracker').style.display = 'none';

    // Remove 'active' class from all tabs
    document.getElementById('tab-new-items').classList.remove('active');
    document.getElementById('tab-recent-activity').classList.remove('active');
    document.getElementById('tab-progress-tracker').classList.remove('active');

    // Show the selected section and add 'active' class to the clicked tab
    document.getElementById(section).style.display = 'block';

    // Add active class to the selected tab
    if (section === 'new-item-section') {
      document.getElementById('tab-new-items').classList.add('active');
    } else if (section === 'recent-activity') {
      document.getElementById('tab-recent-activity').classList.add('active');
    } else if (section === 'progress-tracker') {
      document.getElementById('tab-progress-tracker').classList.add('active');
    }
  }

  // Set default view to New Items on load
  window.onload = function() {
    toggleSection('new-item-section');
  };