// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB67lIALpPI0Yhi2Tr6jl56m7zn0fUqgF4",
    authDomain: "plsnhs-enrollment.firebaseapp.com",
    projectId: "plsnhs-enrollment",
    storageBucket: "plsnhs-enrollment.firebasestorage.app",
    messagingSenderId: "821000857004",
    appId: "1:821000857004:web:25f7d62e4971d7f2d0c609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('🔥 Firebase initialized!');
console.log('✅ Project:', firebaseConfig.projectId);