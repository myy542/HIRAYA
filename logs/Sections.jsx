// logs/Sections.jsx - Converted from logs/sections.html
import React, { useState } from 'react';

export default function AdminSections() {
    const [sections] = useState([
        { id: 1, grade: 'Grade 7', name: 'Diamond', adviser: 'Mrs. Santos', room: 'Room 201', maxStudents: 45 },
        { id: 2, grade: 'Grade 8', name: 'Ruby', adviser: 'Mr. Dela Cruz', room: 'Room 203', maxStudents: 45 },
        { id: 3, grade: 'Grade 9', name: 'Emerald', adviser: 'Ms. Reyes', room: 'Room 305', maxStudents: 45 }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Manage Sections</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Curriculum class sections and room allocation</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <a href="/logs/create_section.html" style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: '#10b981', color: '#fff', fontWeight: 700, fontSize: 13 }}>
                            <i className="fas fa-plus" style={{ marginRight: 6 }}></i> Create Section
                        </a>
                        <a href="/logs/dashboard.html" style={{ textDecoration: 'none', padding: '8px 14px', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                            Back
                        </a>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {sections.map(s => (
                        <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: 12, color: '#1B2A4A', fontWeight: 700 }}>{s.grade}</span>
                            <h3 style={{ margin: '4px 0 8px 0', fontSize: 18, color: '#1E293B' }}>{s.name}</h3>
                            <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: 12 }}>
                                Adviser: <strong>{s.adviser}</strong><br />
                                Room: {s.room} • Cap: {s.maxStudents}
                            </p>
                            <a href={`/logs/view_section.html?id=${s.id}`} style={{ display: 'block', textAlign: 'center', padding: '8px 12px', background: '#1B2A4A', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
                                View Section Details
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
