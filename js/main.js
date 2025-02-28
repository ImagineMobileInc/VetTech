// js/main.js

// Initialize Firebase from firebase-config.js
initializeFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

// Function to show a selected calculator and hide the list
function selectCalculator(calcId) {
    document.getElementById('calc-list').style.display = 'none';
    document.querySelectorAll('.calculator').forEach(el => el.style.display = 'none');
    document.getElementById(calcId).style.display = 'block';
}

// Function to return to the calculator list
function backToList() {
    document.getElementById('calc-list').style.display = 'block';
    document.querySelectorAll('.calculator').forEach(el => el.style.display = 'none');
}

// Authentication and Initialization Logic
window.onload = function() {
    // Check authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in, show the calculator list
            document.getElementById('calc-list').style.display = 'block';
            $('#loginModal').modal('hide');
            console.log('User logged in:', user.email);
        } else {
            // No user signed in, show login modal
            document.getElementById('calc-list').style.display = 'none';
            $('#loginModal').modal({ backdrop: 'static', keyboard: false });
            console.log('No user logged in');
        }
    });

    // Login button event listener
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            document.getElementById('authMessage').innerHTML = 'Please enter both email and password.';
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                document.getElementById('authMessage').innerHTML = 'Login successful!';
                setTimeout(() => {
                    $('#loginModal').modal('hide');
                }, 1000); // Brief delay to show success message
            })
            .catch((error) => {
                document.getElementById('authMessage').innerHTML = `Error: ${error.message}`;
            });
    });

    // Create account button event listener
    document.getElementById('createAccountBtn').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            document.getElementById('authMessage').innerHTML = 'Please enter both email and password.';
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                document.getElementById('authMessage').innerHTML = 'Account created and logged in!';
                // Store user email in Firestore
                db.collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log('User data stored in Firestore');
                    setTimeout(() => {
                        $('#loginModal').modal('hide');
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Error storing user data:', error);
                });
            })
            .catch((error) => {
                document.getElementById('authMessage').innerHTML = `Error: ${error.message}`;
            });
    });
};
