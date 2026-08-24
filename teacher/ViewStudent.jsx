// teacher/ViewStudent.jsx - Converted from teacher/view-student.html & teacher/js/view-student.js
import React, { useState } from 'react';

export default function TeacherViewStudent() {
    const student = {
        name: 'Juan Dela Cruz',
        lrn: '123456789012',
        grade: 'Grade 7 - Diamond',
        email: 'juan@example.com',
        birthdate: 'August 15, 2009',
        gender: 'Male',
        guardian: 'Maria Dela Cruz (09181234567)',
        attendanceRate: '98%',
        gpa: '90.25%'
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 750, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Student Record</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Individual learner profile and academic progress</span>
                    </div>
                    <a href="/teacher/classes.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Classes
                    </a>
                </div>

                {/* Profile Banner */}
                <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 28, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 2px 0', fontSize: 18 }}>{student.name}</h3>
                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: 12 }}>LRN: {student.lrn} • {student.grade}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, marginBottom: 24 }}>
                    <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Email Address</span>
                        <strong>{student.email}</strong>
                    </div>
                    <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Date of Birth</span>
                        <strong>{student.birthdate}</strong>
                    </div>
                    <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Parent / Guardian</span>
                        <strong>{student.guardian}</strong>
                    </div>
                    <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Attendance Record</span>
                        <strong style={{ color: '#10b981' }}>{student.attendanceRate} (Present)</strong>
                    </div>
                    <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Academic Average</span>
                        <strong style={{ color: '#FFD700', background: '#1B2A4A', padding: '2px 6px', borderRadius: 4 }}>{student.gpa}</strong>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => alert('Sending notification to parent...')} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                        <i className="fas fa-bell" style={{ marginRight: 6 }}></i> Notify Parent
                    </button>
                    <a href={`/teacher/grades.html?student=${student.lrn}`} style={{ flex: 1, textAlign: 'center', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
                        <i className="fas fa-edit" style={{ marginRight: 6 }}></i> Edit Grades
                    </a>
                </div>
            </div>
        </div>
    );
}
