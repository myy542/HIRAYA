/**
 * PLSNHS Enrollment - Firebase (No Hardcode)
 */

import { auth } from '../../firebase/config.js';
import { saveEnrollment } from '../../firebase/firestore.js';

(function() {
    'use strict';

    console.log('📝 Enrollment page ready!');

    // ============================================
    // TOAST NOTIFICATION
    // ============================================

    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message, type = 'success') {
        if (!toast || !toastMessage) return;

        toast.classList.remove('success', 'error', 'warning', 'show');
        toast.classList.add(type);

        const icon = toast.querySelector('i');
        if (icon) {
            if (type === 'success') icon.className = 'fas fa-check-circle';
            else if (type === 'error') icon.className = 'fas fa-exclamation-circle';
            else if (type === 'warning') icon.className = 'fas fa-exclamation-triangle';
            else icon.className = 'fas fa-info-circle';
        }

        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ============================================
    // ENROLLMENT FORM - FIREBASE (NO HARDCODE)
    // ============================================

    const enrollForm = document.getElementById('enrollForm');

    if (enrollForm) {
        enrollForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('enrollName').value.trim();
            const email = document.getElementById('enrollEmail').value.trim();
            const phone = document.getElementById('enrollPhone').value.trim();
            const grade = document.getElementById('enrollGrade').value;

            // Validation
            if (!name) {
                showToast('⚠️ Please enter your full name', 'warning');
                document.getElementById('enrollName').focus();
                return;
            }

            if (!email) {
                showToast('⚠️ Please enter your email address', 'warning');
                document.getElementById('enrollEmail').focus();
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showToast('⚠️ Please enter a valid email address', 'error');
                document.getElementById('enrollEmail').focus();
                return;
            }

            if (!grade) {
                showToast('⚠️ Please select your grade level', 'warning');
                document.getElementById('enrollGrade').focus();
                return;
            }

            // Check if user is logged in
            if (!auth.currentUser) {
                showToast('⚠️ Please login first before enrolling', 'warning');
                setTimeout(() => {
                    window.location.href = '../auth/login.html';
                }, 1500);
                return;
            }

            // 🔥 SAVE TO FIREBASE - WALAY HARDCODE
            const result = await saveEnrollment({
                name: name,
                email: email,
                phone: phone || 'N/A',
                grade: grade,
                userId: auth.currentUser.uid,
                userEmail: auth.currentUser.email,
                status: 'pending'
            });

            if (result.success) {
                showToast(`✅ Enrollment successful! Welcome, ${name}!`, 'success');
                setTimeout(() => {
                    enrollForm.reset();
                }, 1500);
            } else {
                showToast('❌ Error: ' + result.error, 'error');
            }
        });
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (toast) toast.classList.remove('show');
        }
    });

    console.log('  📌 Fill out the form and click Submit');
    console.log('  ✅ Data will be saved to Firebase Firestore');

})();