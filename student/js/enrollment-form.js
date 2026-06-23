/**
 * Student Enrollment Form - Firebase Integration
 */

import { auth, db } from '../../firebase/config.js';
import { 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

(function() {
    'use strict';

    console.log('📝 Enrollment Form ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const studentName = document.getElementById('studentName');
    const studentInitial = document.getElementById('studentInitial');
    const logoutBtn = document.getElementById('logoutBtn');
    const backBtn = document.getElementById('backBtn');

    // Form Elements
    const gradeSelect = document.getElementById('grade');
    const studentTypeGroup = document.getElementById('studentTypeGroup');
    const studentTypeSelect = document.getElementById('student_type');
    const strandDiv = document.getElementById('strandDiv');
    const strandSelect = document.getElementById('strand');
    const requirementsSection = document.getElementById('requirementsSection');
    const requirementsList = document.getElementById('requirementsList');
    const schoolYearInput = document.getElementById('school_year');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const alertContainer = document.getElementById('alertContainer');

    // Existing enrollment display
    const existingEnrollmentDiv = document.getElementById('existingEnrollment');
    const enrollmentDisplay = document.getElementById('enrollmentDisplay');

    // Student info
    const studentIdDisplay = document.getElementById('studentIdDisplay');
    const studentNameDisplay = document.getElementById('studentNameDisplay');
    const studentEmailDisplay = document.getElementById('studentEmailDisplay');

    // ============================================
    // REQUIREMENTS DATA
    // ============================================

    const requirementsData = {
        'Grade 7': {
            'new': [
                { name: 'Form 137 (Permanent Record)', required: true, can_follow: false, field: 'form_137' },
                { name: 'Certificate of Completion (Elementary)', required: true, can_follow: false, field: 'certificate_of_completion' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: '2x2 ID Pictures', required: true, can_follow: false, field: 'id_pictures' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' },
                { name: 'Medical/Dental Certificate', required: false, can_follow: true, field: 'medical_cert' }
            ]
        },
        'Grade 8': {
            'continuing': [
                { name: 'Form 138 (Report Card)', required: true, can_follow: false, field: 'form_138' }
            ],
            'transferee': [
                { name: 'Form 138 (Latest Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Form 137 (Permanent Record - to follow)', required: true, can_follow: true, field: 'form_137' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' },
                { name: '2x2 ID Pictures', required: true, can_follow: false, field: 'id_pictures' }
            ]
        },
        'Grade 9': {
            'continuing': [
                { name: 'Form 138 (Report Card)', required: true, can_follow: false, field: 'form_138' }
            ],
            'transferee': [
                { name: 'Form 138 (Latest Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Form 137 (Permanent Record - to follow)', required: true, can_follow: true, field: 'form_137' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' },
                { name: '2x2 ID Pictures', required: true, can_follow: false, field: 'id_pictures' }
            ]
        },
        'Grade 10': {
            'continuing': [
                { name: 'Form 138 (Report Card)', required: true, can_follow: false, field: 'form_138' }
            ],
            'transferee': [
                { name: 'Form 138 (Latest Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Form 137 (Permanent Record - to follow)', required: true, can_follow: true, field: 'form_137' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' },
                { name: '2x2 ID Pictures', required: true, can_follow: false, field: 'id_pictures' }
            ]
        },
        'Grade 11': {
            'same_school': [
                { name: 'Form 138 (Grade 10 Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Certificate of Completion (Junior High)', required: true, can_follow: false, field: 'certificate_of_completion' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' }
            ],
            'different_school': [
                { name: 'Form 137 (Permanent Record)', required: true, can_follow: false, field: 'form_137' },
                { name: 'Form 138 (Grade 10 Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Certificate of Completion (Junior High)', required: true, can_follow: false, field: 'certificate_of_completion' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' }
            ]
        },
        'Grade 12': {
            'continuing': [
                { name: 'Form 138 (Grade 11 Report Card)', required: true, can_follow: false, field: 'form_138' }
            ],
            'transferee': [
                { name: 'Form 138 (Grade 11 Report Card)', required: true, can_follow: false, field: 'form_138' },
                { name: 'Form 137 (Permanent Record)', required: true, can_follow: false, field: 'form_137' },
                { name: 'PSA Birth Certificate', required: true, can_follow: false, field: 'psa_birth_cert' },
                { name: 'Good Moral Certificate', required: true, can_follow: false, field: 'good_moral_cert' },
                { name: '2x2 ID Pictures', required: true, can_follow: false, field: 'id_pictures' }
            ]
        }
    };

    // ============================================
    // AUTH STATE
    // ============================================

    let currentUser = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            console.log('✅ User logged in:', user.email);
            const displayName = user.displayName || user.email || 'Student';
            const firstName = displayName.split('@')[0];
            studentName.textContent = firstName;
            studentInitial.textContent = firstName.charAt(0).toUpperCase();
            
            // Set student info
            studentEmailDisplay.textContent = user.email;
            studentNameDisplay.textContent = displayName;
            
            // Load student data
            loadStudentData(user.uid);
            loadExistingEnrollment(user.uid);
        } else {
            console.log('❌ User logged out - redirecting to login');
            window.location.href = '../auth/login.html';
        }
    });

    // ============================================
    // LOGOUT
    // ============================================

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = '../auth/login.html';
            }).catch((error) => {
                console.error('Logout error:', error);
            });
        });
    }

    // ============================================
    // BACK BUTTON
    // ============================================

    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    // ============================================
    // LOAD STUDENT DATA
    // ============================================

    async function loadStudentData(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const data = userDoc.data();
                studentIdDisplay.textContent = data.idNumber || 'Not Assigned';
                studentNameDisplay.textContent = data.displayName || data.email || 'N/A';
                studentEmailDisplay.textContent = data.email || 'N/A';
            }
        } catch (error) {
            console.error('Error loading student data:', error);
        }
    }

    // ============================================
    // LOAD EXISTING ENROLLMENT
    // ============================================

    async function loadExistingEnrollment(userId) {
        try {
            const enrollmentsRef = collection(db, 'enrollments');
            const q = query(enrollmentsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(1));
            const snapshot = await getDocs(q);
            
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const data = doc.data();
                
                // Show existing enrollment card
                if (existingEnrollmentDiv) {
                    existingEnrollmentDiv.style.display = 'block';
                    enrollmentForm.style.display = 'none';
                    
                    enrollmentDisplay.innerHTML = `
                        <div class="enrollment-badge status-${(data.status || 'pending').toLowerCase()}">
                            Status: ${data.status || 'Pending'}
                        </div>
                        <div class="enrollment-details">
                            <p><strong>Grade Level:</strong> ${data.grade || 'N/A'}</p>
                            ${data.strand ? `<p><strong>Strand:</strong> ${data.strand}</p>` : ''}
                            <p><strong>School Year:</strong> ${data.schoolYear || 'N/A'}</p>
                            <p><strong>Date Submitted:</strong> ${data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                        </div>
                    `;
                }
            } else {
                if (existingEnrollmentDiv) {
                    existingEnrollmentDiv.style.display = 'none';
                    enrollmentForm.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Error loading existing enrollment:', error);
        }
    }

    // ============================================
    // FORM FUNCTIONS
    // ============================================

    // Grade select change
    if (gradeSelect) {
        gradeSelect.addEventListener('change', function() {
            updateStudentTypeOptions();
        });
    }

    // Student type change
    if (studentTypeSelect) {
        studentTypeSelect.addEventListener('change', function() {
            updateRequirements();
        });
    }

    function updateStudentTypeOptions() {
        const selectedOption = gradeSelect.options[gradeSelect.selectedIndex];
        const gradeName = selectedOption ? selectedOption.getAttribute('data-grade') : '';
        
        if (gradeName) {
            const options = getStudentTypeOptions(gradeName);
            studentTypeSelect.innerHTML = '<option value="">-- Select Student Type --</option>';
            
            for (const [value, label] of Object.entries(options)) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = label;
                studentTypeSelect.appendChild(option);
            }
            
            studentTypeGroup.style.display = 'block';
            updateStrandVisibility(gradeName);
        } else {
            studentTypeGroup.style.display = 'none';
        }
        
        // Reset requirements
        requirementsSection.style.display = 'none';
        requirementsList.innerHTML = '';
    }

    function getStudentTypeOptions(gradeName) {
        switch(gradeName) {
            case 'Grade 7':
                return { 'new': 'New Student (From Elementary)' };
            case 'Grade 8':
            case 'Grade 9':
            case 'Grade 10':
                return {
                    'continuing': 'Continuing Student (Moving to next grade)',
                    'transferee': 'Transferee (From another school)'
                };
            case 'Grade 11':
                return {
                    'same_school': 'From the same school (Placido L. Señor SHS - Junior High)',
                    'different_school': 'From a different school (Transferee)'
                };
            case 'Grade 12':
                return {
                    'continuing': 'Continuing Student (From Grade 11)',
                    'transferee': 'Transferee (From another school)'
                };
            default:
                return { 'new': 'New Student', 'continuing': 'Continuing', 'transferee': 'Transferee' };
        }
    }

    function updateStrandVisibility(gradeName) {
        if (gradeName === 'Grade 11' || gradeName === 'Grade 12') {
            strandDiv.style.display = 'block';
            strandSelect.setAttribute('required', 'required');
        } else {
            strandDiv.style.display = 'none';
            strandSelect.removeAttribute('required');
        }
    }

    function updateRequirements() {
        const selectedOption = gradeSelect.options[gradeSelect.selectedIndex];
        const gradeName = selectedOption ? selectedOption.getAttribute('data-grade') : '';
        const studentType = studentTypeSelect.value;
        
        if (gradeName && studentType && requirementsData[gradeName] && requirementsData[gradeName][studentType]) {
            requirementsSection.style.display = 'block';
            const requirements = requirementsData[gradeName][studentType];
            
            requirementsList.innerHTML = '';
            requirements.forEach(req => {
                const reqDiv = document.createElement('div');
                reqDiv.className = 'requirement-item';
                
                let badgeHtml = '';
                if (req.required) {
                    badgeHtml = '<span class="req-badge badge-required">Required</span>';
                } else {
                    badgeHtml = '<span class="req-badge badge-optional">Optional</span>';
                }
                
                if (req.can_follow) {
                    badgeHtml += ' <span class="req-badge badge-follow">Can be followed up</span>';
                }
                
                reqDiv.innerHTML = `
                    <div class="requirement-name">
                        <span><i class="fas fa-file"></i> ${req.name}</span>
                        <div>${badgeHtml}</div>
                    </div>
                    <div class="file-upload-area" onclick="document.getElementById('${req.field}').click()">
                        <i class="fas fa-cloud-upload-alt"></i> Click to upload
                        <p style="font-size: 11px; color: #666; margin-top: 5px;">PDF, JPG, JPEG, or PNG</p>
                    </div>
                    <input type="file" name="${req.field}" id="${req.field}" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" 
                           ${req.required ? 'required' : ''}>
                    <div class="file-name" id="${req.field}_name"></div>
                `;
                requirementsList.appendChild(reqDiv);
            });
            
            // Add file name display
            document.querySelectorAll('input[type="file"]').forEach(input => {
                input.addEventListener('change', function() {
                    const fileNameDiv = document.getElementById(this.id + '_name');
                    if (this.files && this.files.length > 0) {
                        fileNameDiv.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i> ' + this.files[0].name;
                    } else {
                        fileNameDiv.innerHTML = '';
                    }
                });
            });
        } else {
            requirementsSection.style.display = 'none';
        }
    }

    // ============================================
    // SUBMIT ENROLLMENT
    // ============================================

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const gradeSelect = document.getElementById('grade');
            const studentType = document.getElementById('student_type').value;
            const strand = document.getElementById('strand').value;
            const schoolYear = document.getElementById('school_year').value.trim();
            
            const selectedOption = gradeSelect.options[gradeSelect.selectedIndex];
            const gradeName = selectedOption ? selectedOption.getAttribute('data-grade') : '';
            const gradeId = gradeSelect.value;
            
            // Validate
            if (!gradeId) {
                showAlert('⚠️ Please select your grade level', 'error');
                return;
            }
            
            if (!studentType) {
                showAlert('⚠️ Please select your student type', 'error');
                return;
            }
            
            if (!schoolYear) {
                showAlert('⚠️ Please enter the school year', 'error');
                return;
            }
            
            // Check if requirements are uploaded
            const requirements = requirementsData[gradeName] && requirementsData[gradeName][studentType] ? requirementsData[gradeName][studentType] : [];
            const missingFiles = [];
            
            requirements.forEach(req => {
                if (req.required) {
                    const fileInput = document.getElementById(req.field);
                    if (fileInput && (!fileInput.files || fileInput.files.length === 0)) {
                        missingFiles.push(req.name);
                    }
                }
            });
            
            if (missingFiles.length > 0) {
                showAlert(`⚠️ Please upload the following required documents: ${missingFiles.join(', ')}`, 'error');
                return;
            }
            
            // Show loading
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            try {
                // Save to Firestore
                const enrollmentData = {
                    userId: currentUser.uid,
                    userEmail: currentUser.email,
                    grade: gradeName,
                    gradeId: gradeId,
                    studentType: studentType,
                    schoolYear: schoolYear,
                    status: 'Pending',
                    createdAt: serverTimestamp()
                };
                
                if (strand) {
                    enrollmentData.strand = strand;
                }
                
                // Add file references (for demo, we'll just save filenames)
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => {
                    if (input.files && input.files.length > 0) {
                        enrollmentData[input.name + '_filename'] = input.files[0].name;
                    }
                });
                
                const docRef = await addDoc(collection(db, 'enrollments'), enrollmentData);
                
                showAlert('✅ Enrollment submitted successfully! Wait for approval.', 'success');
                
                // Reset form
                enrollmentForm.reset();
                requirementsSection.style.display = 'none';
                requirementsList.innerHTML = '';
                
                // Reload to show existing enrollment
                setTimeout(() => {
                    loadExistingEnrollment(currentUser.uid);
                }, 1500);
                
            } catch (error) {
                console.error('Error submitting enrollment:', error);
                showAlert('❌ Error submitting enrollment: ' + error.message, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================
    // ALERT SYSTEM
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
    // AUTO-POPULATE SCHOOL YEAR
    // ============================================

    if (schoolYearInput) {
        const today = new Date();
        const year = today.getFullYear();
        const nextYear = year + 1;
        schoolYearInput.value = year + '-' + nextYear;
    }

    console.log('✅ Enrollment Form ready!');

})();