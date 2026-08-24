// registrar/Sections.jsx - Converted from registrar/sections.html & registrar/js/sections.js
import React, { useState } from 'react';

export default function RegistrarSections() {
    const [sections, setSections] = useState([
        { id: 1, grade: 'Grade 7', name: 'Diamond', adviser: 'Mrs. Santos', room: 'Room 201', maxStudents: 45, currentStudents: 45 },
        { id: 2, grade: 'Grade 8', name: 'Ruby', adviser: 'Mr. Dela Cruz', room: 'Room 203', maxStudents: 45, currentStudents: 42 },
        { id: 3, grade: 'Grade 9', name: 'Emerald', adviser: 'Ms. Reyes', room: 'Room 305', maxStudents: 45, currentStudents: 40 },
        { id: 4, grade: 'Grade 11', name: 'GAS - Section A', adviser: 'Mr. Garcia', room: 'Room 401', maxStudents: 40, currentStudents: 38 }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Class Section Management</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Configure grade sections, advisers, and room assignments</span>
                    </div>
                    <a href="/registrar/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {sections.map(sec => (
                        <div key={sec.id} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 12, color: '#1B2A4A', fontWeight: 700 }}>{sec.grade}</span>
                                <span style={{ padding: '2px 6px', background: '#d1fae5', color: '#065f46', fontSize: 10, borderRadius: 4, fontWeight: 700 }}>Active</span>
                            </div>
                            <h3 style={{ margin: '0 0 6px 0', fontSize: 18, color: '#1E293B' }}>{sec.name}</h3>
                            <p style={{ margin: '0 0 14px 0', color: '#64748b', fontSize: 12 }}>
                                Adviser: <strong>{sec.adviser}</strong><br />
                                Room: {sec.room} • Capacity: {sec.currentStudents}/{sec.maxStudents}
                            </p>
                            <a href={`/registrar/section_students.html?id=${sec.id}`} style={{ display: 'block', textAlign: 'center', padding: '8px 12px', background: '#1B2A4A', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
                                View Student List
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
