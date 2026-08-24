// auth/Enrollment.jsx - Converted from auth/enrollment.html & auth/js/enrollment.js
import React, { useState } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Enrollment() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Form fields
    const [lrn, setLrn] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [dob, setDob] = useState('');
    const [birthplace, setBirthplace] = useState('');
    const [gender, setGender] = useState('');
    const [studentType, setStudentType] = useState('New');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    // Parent/Guardian
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianRelationship, setGuardianRelationship] = useState('Parent');
    const [guardianContact, setGuardianContact] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');

    // Academic
    const [lastSchool, setLastSchool] = useState('');
    const [schoolAddress, setSchoolAddress] = useState('');
    const [lastGradeCompleted, setLastGradeCompleted] = useState('Grade 6');
    const [generalAverage, setGeneralAverage] = useState('');

    // Grade Level & Track
    const [gradeLevel, setGradeLevel] = useState('Grade 7');
    const [trackStrand, setTrackStrand] = useState('GAS');

    // Consent
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const isSHS = gradeLevel === 'Grade 11' || gradeLevel === 'Grade 12';

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const handleNext = () => {
        if (step === 1) {
            if (!firstName.trim() || !lastName.trim() || !dob || !gender || !address.trim()) {
                showAlert('⚠️ Please fill in all required student details.', 'error');
                return;
            }
        } else if (step === 2) {
            if (!guardianName.trim() || !guardianContact.trim()) {
                showAlert('⚠️ Please provide parent/guardian name and contact number.', 'error');
                return;
            }
        } else if (step === 3) {
            if (!lastSchool.trim()) {
                showAlert('⚠️ Please enter the previous school attended.', 'error');
                return;
            }
        }
        setStep((prev) => Math.min(prev + 1, 5));
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreePrivacy) {
            showAlert('⚠️ You must agree to the data privacy statement to submit.', 'error');
            return;
        }

        setLoading(true);

        try {
            const currentUserId = auth.currentUser ? auth.currentUser.uid : 'guest_' + Date.now();
            const fullName = middleName.trim()
                ? `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`
                : `${firstName.trim()} ${lastName.trim()}`;

            await addDoc(collection(db, 'enrollments'), {
                userId: currentUserId,
                lrn: lrn.trim() || null,
                firstName: firstName.trim(),
                middleName: middleName.trim() || null,
                lastName: lastName.trim(),
                fullName: fullName,
                birthdate: dob,
                birthplace: birthplace.trim() || null,
                gender: gender,
                studentType: studentType.toLowerCase(),
                address: address.trim(),
                contactNumber: contact.trim() || null,
                email: email.trim() || null,
                fatherName: fatherName.trim() || null,
                motherName: motherName.trim() || null,
                guardianName: guardianName.trim(),
                guardianRelationship: guardianRelationship,
                guardianContact: guardianContact.trim(),
                emergencyContact: emergencyContact.trim() || null,
                lastSchoolAttended: lastSchool.trim(),
                schoolAddress: schoolAddress.trim() || null,
                lastGradeCompleted: lastGradeCompleted,
                generalAverage: generalAverage.trim() || null,
                grade: gradeLevel,
                strand: isSHS ? trackStrand : null,
                schoolYear: '2026-2027',
                status: 'Pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            showAlert('🎉 Enrollment application submitted successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/student/dashboard.html';
            }, 2000);
        } catch (error) {
            console.error('Enrollment submission error:', error);
            showAlert('❌ Failed to submit enrollment: ' + error.message, 'error');
            setLoading(false);
        }
    };

    return (
        <div className="enrollment-wrapper" style={{ minHeight: '100vh', background: '#f1f5f9', padding: '30px 15px' }}>
            <div className="enrollment-container" style={{ maxWidth: 750, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                {/* Header */}
                <div className="enrollment-header" style={{ textAlign: 'center', marginBottom: 25 }}>
                    <div className="logo-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
                        <div className="school-logo">
                            <img src="/pictures/logo sa skwelahan.jpg" alt="School Logo" style={{ width: 48, height: 48, borderRadius: 10 }} onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="school-name" style={{ textAlign: 'left' }}>
                            <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0a015c', margin: 0 }}>Placido L. Señor</h1>
                            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>National High School</p>
                        </div>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '6px 0' }}>Student <span style={{ color: '#0a015c' }}>Enrollment</span></h2>
                    <p style={{ fontSize: 13, color: '#64748b' }}>Fill out the form to enroll for School Year 2026-2027</p>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30, borderBottom: '1px solid #e2e8f0', paddingBottom: 15 }}>
                    {[
                        { s: 1, lbl: 'Student Details' },
                        { s: 2, lbl: 'Parent/Guardian' },
                        { s: 3, lbl: 'Academic' },
                        { s: 4, lbl: 'Grade Level' },
                        { s: 5, lbl: 'Review' }
                    ].map(({ s, lbl }) => (
                        <div key={s} style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 15, background: step >= s ? '#0a015c' : '#e2e8f0', color: step >= s ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto', fontWeight: 700, fontSize: 12 }}>
                                {s}
                            </div>
                            <span style={{ fontSize: 11, color: step === s ? '#0a015c' : '#94a3b8', fontWeight: step === s ? 700 : 500 }}>{lbl}</span>
                        </div>
                    ))}
                </div>

                {alert && (
                    <div style={{ padding: 12, borderRadius: 8, background: alert.type === 'success' ? '#d1fae5' : '#fee2e2', color: alert.type === 'success' ? '#065f46' : '#991b1b', marginBottom: 20, fontSize: 13, fontWeight: 600 }}>
                        {alert.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a015c', marginBottom: 16 }}>Step 1: Student Information</h3>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Learner Reference Number (LRN)</label>
                                <input type="text" placeholder="12-digit LRN (Optional for new students)" value={lrn} onChange={(e) => setLrn(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Last Name *</label>
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>First Name *</label>
                                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Middle Name</label>
                                    <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Date of Birth *</label>
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Gender *</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Student Type *</label>
                                <select value={studentType} onChange={(e) => setStudentType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                    <option value="New">New Student</option>
                                    <option value="Continuing">Continuing Student</option>
                                    <option value="Transferee">Transferee</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Complete Home Address *</label>
                                <input type="text" placeholder="Street, Barangay, Municipality/City, Province" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a015c', marginBottom: 16 }}>Step 2: Parent / Guardian Details</h3>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Parent / Guardian Full Name *</label>
                                <input type="text" placeholder="Full Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Relationship *</label>
                                    <select value={guardianRelationship} onChange={(e) => setGuardianRelationship(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Guardian">Guardian</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Contact Number *</label>
                                    <input type="tel" placeholder="09123456789" value={guardianContact} onChange={(e) => setGuardianContact(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a015c', marginBottom: 16 }}>Step 3: Academic Background</h3>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Last School Attended *</label>
                                <input type="text" placeholder="School Name" value={lastSchool} onChange={(e) => setLastSchool(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Last Grade Level Completed</label>
                                    <select value={lastGradeCompleted} onChange={(e) => setLastGradeCompleted(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                        <option value="Grade 6">Grade 6</option>
                                        <option value="Grade 7">Grade 7</option>
                                        <option value="Grade 8">Grade 8</option>
                                        <option value="Grade 9">Grade 9</option>
                                        <option value="Grade 10">Grade 10</option>
                                        <option value="Grade 11">Grade 11</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>General Average</label>
                                    <input type="text" placeholder="e.g. 88.5" value={generalAverage} onChange={(e) => setGeneralAverage(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a015c', marginBottom: 16 }}>Step 4: Grade Level & Track</h3>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Grade Level to Enroll *</label>
                                <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                    <option value="Grade 7">Grade 7</option>
                                    <option value="Grade 8">Grade 8</option>
                                    <option value="Grade 9">Grade 9</option>
                                    <option value="Grade 10">Grade 10</option>
                                    <option value="Grade 11">Grade 11</option>
                                    <option value="Grade 12">Grade 12</option>
                                </select>
                            </div>

                            {isSHS && (
                                <div style={{ marginBottom: 14 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Senior High School Track / Strand *</label>
                                    <select value={trackStrand} onChange={(e) => setTrackStrand(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                        <option value="GAS">GAS (General Academic Strand)</option>
                                        <option value="HUMSS">HUMSS (Humanities & Social Sciences)</option>
                                        <option value="TVL-Cookery">TVL (Technical-Vocational - Cookery)</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 5 */}
                    {step === 5 && (
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a015c', marginBottom: 16 }}>Step 5: Review & Submit</h3>
                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 16, fontSize: 13 }}>
                                <p><strong>Student Name:</strong> {firstName} {middleName} {lastName}</p>
                                <p><strong>Grade to Enroll:</strong> {gradeLevel} {isSHS ? `(${trackStrand})` : ''}</p>
                                <p><strong>Enrollee Type:</strong> {studentType} Student</p>
                                <p><strong>Parent/Guardian:</strong> {guardianName} ({guardianContact})</p>
                                <p><strong>School Year:</strong> 2026-2027</p>
                            </div>

                            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 12, color: '#475569', marginBottom: 20 }}>
                                <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} style={{ marginTop: 3 }} />
                                <span>I certify that all information provided is accurate and consent to data processing for school admission.</span>
                            </label>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 15, borderTop: '1px solid #f1f5f9' }}>
                        {step > 1 && (
                            <button type="button" onClick={handlePrev} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', color: '#1e293b', fontWeight: 600, cursor: 'pointer' }}>
                                Previous
                            </button>
                        )}
                        {step < 5 ? (
                            <button type="button" onClick={handleNext} style={{ marginLeft: 'auto', padding: '10px 24px', borderRadius: 8, border: 'none', background: '#0a015c', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                                Continue
                            </button>
                        ) : (
                            <button type="submit" disabled={loading || !agreePrivacy} style={{ marginLeft: 'auto', padding: '10px 24px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
