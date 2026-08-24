// Step navigation
let currentStep = 1;

function goToStep(step) {
    if (step > currentStep) {
        if (!validateStep(currentStep)) {
            return;
        }
    }

    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });

    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');

    document.querySelectorAll('.progress-step').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.step) <= step) {
            el.classList.add('active');
        }
    });

    if (step === 5) {
        populateReview();
    }

    currentStep = step;
}

function validateStep(step) {
    const stepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    if (step === 4) {
        const gradeSelected = document.querySelector('input[name="gradeLevel"]:checked');
        if (!gradeSelected) {
            isValid = false;
            showToast('Please select a grade level.', 'error');
        }

        const gradeValue = gradeSelected ? gradeSelected.value : '';
        if (gradeValue === 'Grade 11' || gradeValue === 'Grade 12') {
            const strandSelected = document.querySelector('input[name="strand"]:checked');
            if (!strandSelected) {
                isValid = false;
                showToast('Please select a strand for Senior High School.', 'error');
            }
        }
    }

    if (!isValid) {
        showToast('Please fill in all required fields.', 'error');
    }

    return isValid;
}

// Show/hide strand based on grade level
document.querySelectorAll('input[name="gradeLevel"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const strandGroup = document.getElementById('strandGroup');
        const grade = this.value;
        if (grade === 'Grade 11' || grade === 'Grade 12') {
            strandGroup.style.display = 'block';
            document.querySelectorAll('input[name="strand"]').forEach(r => r.required = true);
        } else {
            strandGroup.style.display = 'none';
            document.querySelectorAll('input[name="strand"]').forEach(r => r.required = false);
        }
    });
});

// Populate review
function populateReview() {
    // Student Details
    const firstName = document.getElementById('firstName').value || 'N/A';
    const middleName = document.getElementById('middleName').value || 'N/A';
    const lastName = document.getElementById('lastName').value || 'N/A';
    const dob = document.getElementById('dob').value || 'N/A';
    const birthplace = document.getElementById('birthplace').value || 'N/A';
    const gender = document.getElementById('gender').value || 'N/A';
    const age = document.getElementById('age').value || 'N/A';
    const nationality = document.getElementById('nationality').value || 'N/A';
    const address = document.getElementById('address').value || 'N/A';

    // Parent/Guardian
    const motherName = document.getElementById('motherName').value || 'N/A';
    const motherOccupation = document.getElementById('motherOccupation').value || 'N/A';
    const fatherName = document.getElementById('fatherName').value || 'N/A';
    const fatherOccupation = document.getElementById('fatherOccupation').value || 'N/A';
    const guardian = document.getElementById('guardian').value || 'N/A';
    const guardianRelationship = document.getElementById('guardianRelationship').value || 'N/A';
    const guardianContact = document.getElementById('guardianContact').value || 'N/A';
    const guardianEmail = document.getElementById('guardianEmail').value || 'N/A';
    const guardianAddress = document.getElementById('guardianAddress').value || 'N/A';

    // Academic Background
    const previousSchool = document.getElementById('previousSchool').value || 'N/A';
    const schoolLocation = document.getElementById('schoolLocation').value || 'N/A';
    const schoolId = document.getElementById('schoolId').value || 'N/A';
    const lastGradeLevel = document.getElementById('lastGradeLevel').value || 'N/A';
    const schoolYear = document.getElementById('schoolYear').value || 'N/A';

    // Grade Level
    const gradeSelected = document.querySelector('input[name="gradeLevel"]:checked');
    const grade = gradeSelected ? gradeSelected.value : 'N/A';
    
    let strand = 'N/A';
    if (grade === 'Grade 11' || grade === 'Grade 12') {
        const strandSelected = document.querySelector('input[name="strand"]:checked');
        strand = strandSelected ? strandSelected.value : 'Not selected';
    }

    // Signatures
    const studentSignature = document.getElementById('studentSignature').value || 'N/A';
    const guardianSignature = document.getElementById('guardianSignature').value || 'N/A';

    const reviewHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px;">
            <strong style="grid-column: 1/-1; color: #1a2a6c; font-size: 14px; margin-top: 5px;">📋 Student Details</strong>
            <strong>Last Name:</strong> <span>${lastName}</span>
            <strong>First Name:</strong> <span>${firstName}</span>
            <strong>Middle Name:</strong> <span>${middleName}</span>
            <strong>Date of Birth:</strong> <span>${dob}</span>
            <strong>Place of Birth:</strong> <span>${birthplace}</span>
            <strong>Gender:</strong> <span>${gender}</span>
            <strong>Age:</strong> <span>${age}</span>
            <strong>Nationality:</strong> <span>${nationality}</span>
            <strong>Address:</strong> <span>${address}</span>

            <strong style="grid-column: 1/-1; color: #1a2a6c; font-size: 14px; margin-top: 10px;">👨‍👩‍👧 Parent/Guardian Information</strong>
            <strong>Mother's Name:</strong> <span>${motherName}</span>
            <strong>Mother's Occupation:</strong> <span>${motherOccupation}</span>
            <strong>Father's Name:</strong> <span>${fatherName}</span>
            <strong>Father's Occupation:</strong> <span>${fatherOccupation}</span>
            <strong>Guardian's Name:</strong> <span>${guardian}</span>
            <strong>Relationship:</strong> <span>${guardianRelationship}</span>
            <strong>Phone Number:</strong> <span>${guardianContact}</span>
            <strong>Email Address:</strong> <span>${guardianEmail}</span>
            <strong>Guardian Address:</strong> <span>${guardianAddress}</span>

            <strong style="grid-column: 1/-1; color: #1a2a6c; font-size: 14px; margin-top: 10px;">🎓 Academic Background</strong>
            <strong>Previous School:</strong> <span>${previousSchool}</span>
            <strong>School Location:</strong> <span>${schoolLocation}</span>
            <strong>School ID:</strong> <span>${schoolId}</span>
            <strong>Last Grade Level:</strong> <span>${lastGradeLevel}</span>
            <strong>School Year:</strong> <span>${schoolYear}</span>

            <strong style="grid-column: 1/-1; color: #1a2a6c; font-size: 14px; margin-top: 10px;">📚 Grade Level</strong>
            <strong>Applying for:</strong> <span style="font-weight: 700; color: #1a2a6c;">${grade}</span>
            ${grade === 'Grade 11' || grade === 'Grade 12' ? `<strong>Strand:</strong> <span style="font-weight: 700; color: #1a2a6c;">${strand}</span>` : ''}

            <strong style="grid-column: 1/-1; color: #1a2a6c; font-size: 14px; margin-top: 10px;">✍️ Signatures</strong>
            <strong>Student's Signature:</strong> <span>${studentSignature}</span>
            <strong>Parent/Guardian's Signature:</strong> <span>${guardianSignature}</span>
        </div>
    `;

    document.getElementById('reviewContent').innerHTML = reviewHTML;
}

// Show toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');

    toastMessage.textContent = message;

    if (type === 'error') {
        toast.style.background = '#e74c3c';
        icon.className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = '#1a2a6c';
        icon.className = 'fas fa-check-circle';
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Handle form submission
document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!document.getElementById('agree').checked) {
        showToast('Please agree to the school\'s rules and regulations.', 'error');
        return;
    }

    if (!document.getElementById('agreeDataPrivacy').checked) {
        showToast('Please consent to the data privacy policy.', 'error');
        return;
    }

    showToast('🎉 Enrollment submitted successfully! You will receive a confirmation email.');

    setTimeout(() => {
        this.reset();
        goToStep(1);
        document.getElementById('strandGroup').style.display = 'none';
    }, 2000);
});

// Input validation on blur
document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// Auto-calculate age based on date of birth
document.getElementById('dob').addEventListener('change', function() {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age > 0 && age < 100) {
        document.getElementById('age').value = age;
    }
});

// Make goToStep globally accessible
window.goToStep = goToStep;