// logs/ViewEnrollment.jsx - Converted from logs/view_enrollment.html
import React from 'react';

export default function AdminViewEnrollment() {
    const item = {
        name: 'Juan Dela Cruz',
        lrn: '123456789012',
        grade: 'Grade 7',
        track: 'N/A',
        guardian: 'Maria Dela Cruz',
        contact: '09181234567',
        status: 'Enrolled'
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Application Record</h2>
                    <a href="/logs/enrollments.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Applications
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1B2A4A' }}>{item.name}</h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>LRN: <strong>{item.lrn}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Grade Level: <strong>{item.grade}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Guardian: <strong>{item.guardian} ({item.contact})</strong></p>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Status: <strong style={{ color: '#10b981' }}>{item.status}</strong></p>
                </div>
            </div>
        </div>
    );
}
