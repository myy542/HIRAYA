/**
 * PLSNHS Register - Firebase Integration
 */

import { auth, db } from '../../firebase/config.js';
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

(function() {
    'use strict';

    console.log('📝 Register page ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const form = document.getElementById('registerForm');
    const firstName = document.getElementById('regFirstname');
    const middleName = document.getElementById('regMiddlename');
    const lastName = document.getElementById('regLastname');
    const birthdate = document.getElementById('regBirthdate');
    const gender = document.getElementById('regGender');
    const email = document.getElementById('regEmail');
    const password = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('regConfirmPassword');
    const registerBtn = document.getElementById('registerBtn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const alertContainer = document.getElementById('alertContainer');

    // ============================================
    // PASSWORD TOGGLE
    // ============================================

    const toggleBtn = document.getElementById('togglePassword');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const type = password.type === 'password' ? 'text' : 'password';
            password.type = type;
            this.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }

    // ============================================
    // PASSWORD STRENGTH & VALIDATION
    // ============================================

    const strengthFill = document.getElementById('strengthFill');
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqLower = document.getElementById('req-lower');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    const confirmMatch = document.getElementById('confirmMatch');

    function validatePassword(pwd) {
        return {
            length: pwd.length >= 8,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
        };
    }

    function updatePasswordStrength() {
        const pwd = password.value;
        const validation = validatePassword(pwd);

        // Update requirements
        const reqs = [
            { el: reqLength, valid: validation.length, text: 'At least 8 characters' },
            { el: reqUpper, valid: validation.uppercase, text: 'At least 1 uppercase letter' },
            { el: reqLower, valid: validation.lowercase, text: 'At least 1 lowercase letter' },
            { el: reqNumber, valid: validation.number, text: 'At least 1 number' },
            { el: reqSpecial, valid: validation.special, text: 'At least 1 special character' }
        ];

        reqs.forEach(({ el, valid, text }) => {
            if (el) {
                if (valid) {
                    el.classList.add('valid');
                    el.innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
                } else {
                    el.classList.remove('valid');
                    el.innerHTML = `<i class="fas fa-circle"></i> ${text}`;
                }
            }
        });

        // Update strength meter
        const validCount = Object.values(validation).filter(v => v).length;
        const percent = (validCount / 5) * 100;

        if (strengthFill) {
            strengthFill.style.width = percent + '%';
            strengthFill.className = 'strength-fill';
            if (percent <= 25) strengthFill.classList.add('weak');
            else if (percent <= 50) strengthFill.classList.add('fair');
            else if (percent <= 75) strengthFill.classList.add('good');
            else strengthFill.classList.add('strong');
        }

        // Update confirm password
        checkConfirmPassword();

        // Enable/disable register button
        const isStrong = Object.values(validation).every(v => v === true);
        const confirmValid = checkConfirmPassword();
        registerBtn.disabled = !(isStrong && confirmValid);
    }

    function checkConfirmPassword() {
        const pwd = password.value;
        const confirm = confirmPassword.value;

        if (confirm === '') {
            confirmMatch.innerHTML = '<i class="fas fa-info-circle"></i> Re-enter your password';
            confirmMatch.className = 'confirm-match';
            return false;
        }

        if (pwd === confirm) {
            confirmMatch.innerHTML = '<i class="fas fa-check-circle"></i> Passwords match!';
            confirmMatch.className = 'confirm-match match';
            return true;
        } else {
            confirmMatch.innerHTML = '<i class="fas fa-exclamation-circle"></i> Passwords do not match!';
            confirmMatch.className = 'confirm-match no-match';
            return false;
        }
    }

    password.addEventListener('input', updatePasswordStrength);
    confirmPassword.addEventListener('input', updatePasswordStrength);

    // Initial check
    setTimeout(updatePasswordStrength, 100);

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
    // FORM SUBMIT - FIREBASE REGISTRATION
    // ============================================

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get values
        const first = firstName.value.trim();
        const middle = middleName.value.trim();
        const last = lastName.value.trim();
        const birth = birthdate.value;
        const gen = gender.value;
        const em = email.value.trim();
        const pwd = password.value;
        const confirm = confirmPassword.value;

        // Validate
        if (!first) {
            showAlert('⚠️ Please enter your first name', 'error');
            firstName.focus();
            return;
        }

        if (!last) {
            showAlert('⚠️ Please enter your last name', 'error');
            lastName.focus();
            return;
        }

        if (!birth) {
            showAlert('⚠️ Please select your birthdate', 'error');
            birthdate.focus();
            return;
        }

        // Age validation
        const birthDate = new Date(birth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 15) {
            showAlert('⚠️ You must be at least 15 years old to register', 'error');
            birthdate.focus();
            return;
        }

        if (age > 30) {
            showAlert('⚠️ Age exceeds maximum allowed (30 years)', 'error');
            birthdate.focus();
            return;
        }

        if (!gen) {
            showAlert('⚠️ Please select your gender', 'error');
            gender.focus();
            return;
        }

        if (!em) {
            showAlert('⚠️ Please enter your email address', 'error');
            email.focus();
            return;
        }

        if (!em.includes('@') || !em.includes('.')) {
            showAlert('⚠️ Please enter a valid email address', 'error');
            email.focus();
            return;
        }

        if (!pwd) {
            showAlert('⚠️ Please create a password', 'error');
            password.focus();
            return;
        }

        // Validate password strength
        const validation = validatePassword(pwd);
        const isStrong = Object.values(validation).every(v => v === true);

        if (!isStrong) {
            showAlert('⚠️ Please make sure your password meets all requirements', 'error');
            password.focus();
            return;
        }

        if (pwd !== confirm) {
            showAlert('⚠️ Passwords do not match!', 'error');
            confirmPassword.focus();
            return;
        }

        // Disable button
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        try {
            // Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, em, pwd);
            const user = userCredential.user;

            // Send verification email
            await sendEmailVerification(user);

            // Save user profile to Firestore
            const fullName = middle ? `${first} ${middle} ${last}` : `${first} ${last}`;

            await setDoc(doc(db, 'users', user.uid), {
                firstName: first,
                middleName: middle || null,
                lastName: last,
                fullName: fullName,
                birthdate: birth,
                gender: gen,
                email: em,
                role: 'Student',
                status: 'pending',
                emailVerified: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            showAlert('✅ Registration successful! A verification code has been sent to your email.', 'success');
            showToast('📧 Please check your email to verify your account', 'success');

            // Redirect to verify email page after 2 seconds
            setTimeout(() => {
                window.location.href = 'verify-email.html';
            }, 2500);

        } catch (error) {
            console.error('Registration error:', error);

            if (error.code === 'auth/email-already-in-use') {
                showAlert('❌ Email already registered. Please use a different email or login.', 'error');
            } else if (error.code === 'auth/weak-password') {
                showAlert('❌ Password is too weak. Please create a stronger password.', 'error');
            } else if (error.code === 'auth/invalid-email') {
                showAlert('❌ Invalid email address.', 'error');
            } else {
                showAlert('❌ Registration failed: ' + error.message, 'error');
            }

            registerBtn.disabled = false;
            registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        }
    });

    console.log('✅ Register page ready!');

})();