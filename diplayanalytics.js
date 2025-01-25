// Find the canvas element
var canvas = document.getElementById('salesChart');

// Check if there's an existing chart
if (window.salesChartInstance) {
    window.salesChartInstance.destroy();  // Destroy the existing chart
}

// Now, create a new chart
var ctx = canvas.getContext('2d');
window.salesChartInstance = new Chart(ctx, {
    type: 'bar',  // Replace with your chart type (line, pie, etc.)
    data: {
        labels: ['January', 'February', 'March'],
        datasets: [{
            label: 'Sales',
            data: [10, 20, 30],
            // Add more dataset properties as needed
        }]
    },
    options: {
        // Add your chart options here
    }
});
