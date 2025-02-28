function showCalculator(calcId) {
    // Hide all calculators
    document.querySelectorAll('.calculator').forEach(el => el.classList.remove('active'));
    // Show the selected calculator
    document.getElementById(calcId).classList.add('active');
}

// Set default calculator on page load
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const calc = urlParams.get('calc') || 'aagradient'; // Default to A-a Gradient
    showCalculator(calc);
};
