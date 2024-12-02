import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBK0ZdTFtvYlOkuLuMsFtN0_XCaltfnAY",
    authDomain: "aareadshub.firebaseapp.com",
    projectId: "aareadshub",
    storageBucket: "aareadshub.appspot.com",
    messagingSenderId: "215894112106",
    appId: "1:215894112106:web:116df2ea1ca83cbb42d713",
    measurementId: "G-TS0HFJC377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 5000);
}

// Sign-Up logic
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = { email, firstName, lastName };
        await setDoc(doc(db, "users", user.uid), userData);

        showMessage("Account Created Successfully", "signUpMessage");
        window.location.href = "admin.html"; // Redirect to admin page
    } catch (error) {
        console.error("Error during sign-up", error);
        if (error.code === "auth/email-already-in-use") {
            showMessage("Email Address Already Exists!", "signUpMessage");
        } else {
            showMessage("Unable to Create User", "signUpMessage");
        }
    }
});
