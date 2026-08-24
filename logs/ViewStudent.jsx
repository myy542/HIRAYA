// logs/ViewStudent.jsx - Converted from logs/view_student.html
import React from 'react';

export default function AdminViewStudent() {
    const student = {
        name: 'Juan Dela Cruz',
        lrn: '123456789012',
        grade: 'Grade 7 - Diamond',
        gender: 'Male',
        email: 'juan@example.com',
        status: 'Enrolled'
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Student Registry Details</h2>
                    <a href="/logs/students.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Students
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1B2A4A' }}>{student.name}</h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>LRN: <strong>{student.lrn}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Grade & Section: <strong>{student.grade}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Gender: <strong>{student.gender}</strong></p>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Status: <strong style={{ color: '#10b981' }}>{student.status}</strong></p>
                </div>
            </div>
        </div>
    );
}
