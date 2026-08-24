// student/EnrollmentForm.jsx - Converted from student/enrollment-form.html & student/js/enrollment-form.js
import React, { useState } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function StudentEnrollmentForm() {
    const [grade, setGrade] = useState('Grade 7');
    const [strand, setStrand] = useState('GAS');
    const [studentType, setStudentType] = useState('Continuing');
    const [guardianName, setGuardianName] = useState('');
    const [guardianContact, setGuardianContact] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const isSHS = grade === 'Grade 11' || grade === 'Grade 12';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            await addDoc(collection(db, 'enrollments'), {
                userId: user ? user.uid : 'guest_' + Date.now(),
                email: user ? user.email : null,
                grade: grade,
                strand: isSHS ? strand : null,
                studentType: studentType.toLowerCase(),
                guardianName: guardianName.trim(),
                guardianContact: guardianContact.trim(),
                address: address.trim(),
                schoolYear: '2026-2027',
                status: 'Pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            alert('🎉 Enrollment submitted successfully!');
            window.location.href = '/student/dashboard.html';
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to submit enrollment: ' + error.message);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Online Enrollment Application</h2>
                    <a href="/student/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Grade Level *</label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
                            <option value="Grade 7">Grade 7</option>
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                        </select>
                    </div>

                    {isSHS && (
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Senior High Track / Strand *</label>
                            <select value={strand} onChange={(e) => setStrand(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
                                <option value="GAS">GAS (General Academic)</option>
                                <option value="HUMSS">HUMSS (Humanities & Social Sciences)</option>
                                <option value="TVL-Cookery">TVL (Cookery)</option>
                            </select>
                        </div>
                    )}

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Student Type *</label>
                        <select value={studentType} onChange={(e) => setStudentType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
                            <option value="Continuing">Continuing Student</option>
                            <option value="New">New Student</option>
                            <option value="Transferee">Transferee</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Parent / Guardian Name *</label>
                        <input type="text" placeholder="Full Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }} />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Parent / Guardian Contact *</label>
                        <input type="tel" placeholder="09123456789" value={guardianContact} onChange={(e) => setGuardianContact(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }} />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Current Home Address *</label>
                        <input type="text" placeholder="Barangay, City, Province" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }} />
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 20px', borderRadius: 10, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                        {loading ? 'Submitting Application...' : 'Submit Enrollment Application'}
                    </button>
                </form>
            </div>
        </div>
    );
}
