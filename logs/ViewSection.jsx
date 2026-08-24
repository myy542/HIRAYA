// logs/ViewSection.jsx - Converted from logs/view_section.html
import React from 'react';

export default function AdminViewSection() {
    const sec = {
        grade: 'Grade 7',
        name: 'Diamond',
        adviser: 'Mrs. Santos',
        room: 'Room 201',
        students: 45
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Section Details</h2>
                    <a href="/logs/sections.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Sections
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1B2A4A' }}>{sec.grade} - {sec.name}</h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Adviser: <strong>{sec.adviser}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Room: <strong>{sec.room}</strong></p>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Capacity: <strong>{sec.students} / 45</strong></p>
                </div>
            </div>
        </div>
    );
}
