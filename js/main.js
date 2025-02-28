// js/main.js

// Import Firebase from firebase-config.js
initializeFirebase();
const db = firebase.firestore();

function showCalculator(calcId) {
    document.querySelectorAll('.calculator').forEach(el => el.classList.remove('active'));
    document.getElementById(calcId).classList.add('active');
}

// Check if user has visited before and show disclaimer/email prompt if first time
window.onload = function() {
    const hasVisited = localStorage.getItem('hasVisited');
    const urlParams = new URLSearchParams(window.location.search);
    const calc = urlParams.get('calc') || 'aagradient';
    
    if (!hasVisited) {
        $('#disclaimerModal').modal({ backdrop: 'static', keyboard: false }); // Prevent closing without submission
        document.getElementById('submitEmail').addEventListener('click', function() {
            const email = document.getElementById('userEmail').value;
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Basic email validation
                // Store email in Firestore
                db.collection('users').add({
                    email: email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    localStorage.setItem('hasVisited', 'true');
                    $('#disclaimerModal').modal('hide');
                    showCalculator(calc);
                })
                .catch((error) => {
                    console.error('Error storing email:', error);
                    alert('Failed to save email. Please try again.');
                });
            } else {
                alert('Please enter a valid email address.');
            }
        });
    } else {
        showCalculator(calc);
    }
};
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
