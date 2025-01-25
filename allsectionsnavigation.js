
// Function to show a specific section
function showSection(sectionId) {
// Get all sections
const sections = document.querySelectorAll('.content-section');

// Hide all sections
sections.forEach(section => {
section.classList.add('d-none');
});

// Show the selected section
const sectionToShow = document.getElementById(sectionId);
sectionToShow.classList.remove('d-none');

// Update active link
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
link.classList.remove('active');
});

const activeLink = document.querySelector(`nav ul li a[href='#']`);
activeLink.classList.add('active');
}

// Automatically show the Dashboard section when the page loads
window.onload = function() {
showSection('dashboard');
}