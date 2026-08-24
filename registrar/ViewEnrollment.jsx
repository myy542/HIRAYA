// registrar/ViewEnrollment.jsx - Converted from registrar/view_enrollment.html & registrar/js/view_enrollment.js
import React, { useState } from 'react';

export default function RegistrarViewEnrollment() {
    const [enrollment, setEnrollment] = useState({
        fullName: 'Juan Dela Cruz',
        lrn: '123456789012',
        grade: 'Grade 7',
        strand: null,
        birthdate: 'August 15, 2009',
        gender: 'Male',
        studentType: 'new',
        guardianName: 'Maria Dela Cruz',
        guardianContact: '09181234567',
        lastSchoolAttended: 'Langtad Central Elementary School',
        generalAverage: '88.5',
        status: 'Pending',
        schoolYear: '2026-2027'
    });

    const handleAction = (status) => {
        setEnrollment(prev => ({ ...prev, status }));
        alert(`Enrollment marked as ${status}!`);
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 750, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Review Enrollment</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Application details & verification</span>
                    </div>
                    <a href="/registrar/enrollments.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to List
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 18, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3 style={{ margin: 0, color: '#1B2A4A' }}>{enrollment.fullName}</h3>
                        <span style={{ padding: '4px 10px', borderRadius: 4, background: enrollment.status === 'Approved' ? '#d1fae5' : '#fef3c7', color: enrollment.status === 'Approved' ? '#065f46' : '#92400e', fontWeight: 700, fontSize: 12 }}>
                            {enrollment.status}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                        <div><span style={{ color: '#64748b' }}>Grade Level:</span> <strong>{enrollment.grade}</strong></div>
                        <div><span style={{ color: '#64748b' }}>LRN:</span> <strong>{enrollment.lrn}</strong></div>
                        <div><span style={{ color: '#64748b' }}>Birthdate:</span> <strong>{enrollment.birthdate}</strong></div>
                        <div><span style={{ color: '#64748b' }}>Gender:</span> <strong>{enrollment.gender}</strong></div>
                        <div><span style={{ color: '#64748b' }}>Guardian:</span> <strong>{enrollment.guardianName} ({enrollment.guardianContact})</strong></div>
                        <div><span style={{ color: '#64748b' }}>Previous School:</span> <strong>{enrollment.lastSchoolAttended}</strong></div>
                        <div><span style={{ color: '#64748b' }}>Average Grade:</span> <strong>{enrollment.generalAverage}%</strong></div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => handleAction('Approved')} style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Approve Application
                    </button>
                    <button onClick={() => handleAction('Rejected')} style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Reject Application
                    </button>
                </div>
            </div>
        </div>
    );
}
