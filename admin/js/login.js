/**
 * PLSNHS Login - Firebase Integration
 */

import { auth, db } from '../../firebase/config.js';
import { 
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

(function() {
    'use strict';

    console.log('🔐 Login page ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheck = document.getElementById('remember');
    const loginBtn = document.getElementById('loginBtn');
    const alertContainer = document.getElementById('alertContainer');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // ============================================
    // PASSWORD TOGGLE
    // ============================================

    const toggleBtn = document.querySelector('.toggle-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }

    // ============================================
    // CHECK IF ALREADY LOGGED IN
    // ============================================

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('✅ User already logged in:', user.email);
            
            // Get user role from Firestore
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const role = data.role || 'Student';
                    
                    // Redirect based on role
                    const paths = {
                        'Admin': '../logs/dashboard.html',
                        'Registrar': '../registrar/dashboard.html',
                        'Teacher': '../teacher/dashboard.html',
                        'Student': '../student/dashboard.html',
                        'Parent': '../parents/dashboard.html',
                        'Parents': '../parents/dashboard.html'
                    };
                    const path = paths[role] || '../student/dashboard.html';
                    window.location.href = path;
                }
            } catch (error) {
                console.error('Error getting user role:', error);
            }
        }
    });

    // ============================================
    // CHECK REMEMBER ME COOKIE
    // ============================================

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const savedEmail = getCookie('user_email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheck.checked = true;
    }

    // ============================================
    // SHOW ALERT
    // ============================================

    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }

    // ============================================
    // SHOW TOAST
    // ============================================

    function showToast(message, type = 'success') {
        toast.className = 'toast show ' + type;
        toastMessage.textContent = message;

        const icon = toast.querySelector('i');
        if (icon) {
            if (type === 'success') icon.className = 'fas fa-check-circle';
            else if (type === 'error') icon.className = 'fas fa-exclamation-circle';
            else if (type === 'warning') icon.className = 'fas fa-exclamation-triangle';
            else icon.className = 'fas fa-info-circle';
        }

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ============================================
    // LOGIN FORM SUBMIT
    // ============================================

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheck.checked;

        // Validate
        if (!email) {
            showAlert('⚠️ Please enter your email address', 'error');
            emailInput.focus();
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showAlert('⚠️ Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }

        if (!password) {
            showAlert('⚠️ Please enter your password', 'error');
            passwordInput.focus();
            return;
        }

        // Disable button
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified (for students)
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            let userData = {};
            if (userDoc.exists()) {
                userData = userDoc.data();
            }

            const role = userData.role || 'Student';
            const emailVerified = user.emailVerified || userData.emailVerified || false;

            // Check if student needs email verification
            if (role === 'Student' && !emailVerified) {
                // Send verification email
                await sendEmailVerification(user);
                showAlert('⚠️ Please verify your email address first. Check your inbox for the verification link.', 'error');
                showToast('📧 Verification email sent to ' + email, 'warning');
                
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> LOGIN';
                return;
            }

            // Set remember me cookie
            if (remember) {
                document.cookie = `user_email=${email}; path=/; max-age=${60 * 60 * 24 * 30}`;
            } else {
                document.cookie = 'user_email=; path=/; max-age=0';
            }

            // Redirect based on role
            const paths = {
                'Admin': '../logs/dashboard.html',
                'Registrar': '../registrar/dashboard.html',
                'Teacher': '../teacher/dashboard.html',
                'Student': '../student/dashboard.html',
                'Parent': '../parents/dashboard.html',
                'Parents': '../parents/dashboard.html'
            };
            const path = paths[role] || '../student/dashboard.html';

            showToast('✅ Login successful! Welcome back!', 'success');

            setTimeout(() => {
                window.location.href = path;
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);

            if (error.code === 'auth/user-not-found') {
                showAlert('❌ Email not registered. Please create an account.', 'error');
            } else if (error.code === 'auth/wrong-password') {
                showAlert('❌ Incorrect password. Please try again.', 'error');
            } else if (error.code === 'auth/invalid-email') {
                showAlert('❌ Invalid email address.', 'error');
            } else if (error.code === 'auth/too-many-requests') {
                showAlert('⚠️ Too many failed attempts. Please try again later.', 'error');
            } else if (error.code === 'auth/user-disabled') {
                showAlert('❌ Your account has been disabled. Please contact administrator.', 'error');
            } else {
                showAlert('❌ Login failed: ' + error.message, 'error');
            }

            loginBtn.disabled = false;
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> LOGIN';
        }
    });

    console.log('✅ Login ready!');

})();