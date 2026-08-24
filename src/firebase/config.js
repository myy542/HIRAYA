// src/firebase/config.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB67lIALpPI0Yhi2Tr6jl56m7zn0fUqgF4",
  authDomain: "plsnhs-enrollment.firebaseapp.com",
  projectId: "plsnhs-enrollment",
  storageBucket: "plsnhs-enrollment.firebasestorage.app",
  messagingSenderId: "821000857004",
  appId: "1:821000857004:web:25f7d62e4971d7f2d0c609"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
