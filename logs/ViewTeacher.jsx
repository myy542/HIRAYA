// logs/ViewTeacher.jsx - Converted from logs/view_teacher.html
import React from 'react';

export default function AdminViewTeacher() {
    const teacher = {
        name: 'Mrs. Santos',
        email: 'santos@plsnhs.edu.ph',
        department: 'Mathematics',
        advisory: 'Grade 7 - Diamond',
        status: 'Active'
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Faculty Profile Details</h2>
                    <a href="/logs/teachers.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Teachers
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1B2A4A' }}>{teacher.name}</h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Email: <strong>{teacher.email}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Department: <strong>{teacher.department}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Advisory Section: <strong>{teacher.advisory}</strong></p>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Status: <strong style={{ color: '#10b981' }}>{teacher.status}</strong></p>
                </div>
            </div>
        </div>
    );
}
