// js/main.js

function selectCalculator(calcId) {
    try {
        document.getElementById('calc-list').style.display = 'none';
        document.querySelectorAll('.calculator').forEach(el => el.style.display = 'none');
        document.getElementById(calcId).style.display = 'block';
        console.log(`Selected calculator: ${calcId}`);
    } catch (error) {
        console.error('Error in selectCalculator:', error);
    }
}

function backToList() {
    try {
        document.getElementById('calc-list').style.display = 'block';
        document.querySelectorAll('.calculator').forEach(el => el.style.display = 'none');
        console.log('Returned to calculator list');
    } catch (error) {
        console.error('Error in backToList:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    let auth, db;
    try {
        initializeFirebase();
        auth = firebase.auth();
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        document.getElementById('calc-list').style.display = 'block';
        document.getElementById('loading-message').style.display = 'none';
        return;
    }

    auth.onAuthStateChanged(user => {
        try {
            if (user) {
                console.log('User logged in:', user.email);
                document.getElementById('calc-list').style.display = 'block';
                document.getElementById('loading-message').style.display = 'none';
                $('#loginModal').modal('hide');
            } else {
                console.log('No user logged in');
                document.getElementById('calc-list').style.display = 'none';
                document.getElementById('loading-message').style.display = 'none';
                $('#loginModal').modal({ backdrop: 'static', keyboard: false });
            }
        } catch (error) {
            console.error('Error in auth state change:', error);
            document.getElementById('calc-list').style.display = 'block';
            document.getElementById('loading-message').innerHTML = 'An error occurred. Please check the console.';
        }
    });

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
                console.log('Login successful for:', userCredential.user.email);
                setTimeout(() => {
                    $('#loginModal').modal('hide');
                }, 1000);
            })
            .catch((error) => {
                document.getElementById('authMessage').innerHTML = `Error: ${error.message}`;
                console.error('Login error:', error);
            });
    });

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
                console.log('Account created for:', userCredential.user.email);
                db.collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log('User data stored in Firestore successfully');
                    setTimeout(() => {
                        $('#loginModal').modal('hide');
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Error storing user data in Firestore:', error);
                    document.getElementById('authMessage').innerHTML += `<br>Firestore error: ${error.message}`;
                });
            })
            .catch((error) => {
                document.getElementById('authMessage').innerHTML = `Error: ${error.message}`;
                console.error('Create account error:', error);
            });
    });
});
