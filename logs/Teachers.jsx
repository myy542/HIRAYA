// logs/Teachers.jsx - Converted from logs/teachers.html
import React, { useState } from 'react';

export default function AdminTeachers() {
    const [teachers] = useState([
        { id: 1, name: 'Mrs. Santos', email: 'santos@plsnhs.edu.ph', department: 'Mathematics', advisory: 'Grade 7 - Diamond' },
        { id: 2, name: 'Mr. Dela Cruz', email: 'delacruz@plsnhs.edu.ph', department: 'Science', advisory: 'Grade 8 - Ruby' },
        { id: 3, name: 'Ms. Reyes', email: 'reyes@plsnhs.edu.ph', department: 'English', advisory: 'Grade 9 - Emerald' }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Faculty Directory</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Active teachers and advisory assignments</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <a href="/logs/add_teacher.html" style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: '#10b981', color: '#fff', fontWeight: 700, fontSize: 13 }}>
                            <i className="fas fa-plus" style={{ marginRight: 6 }}></i> Add Teacher
                        </a>
                        <a href="/logs/dashboard.html" style={{ textDecoration: 'none', padding: '8px 14px', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                            Back
                        </a>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Teacher Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Email Address</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Department</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Advisory Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(t => (
                                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{t.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{t.email}</td>
                                    <td style={{ padding: '12px 16px' }}>{t.department}</td>
                                    <td style={{ padding: '12px 16px', color: '#1B2A4A', fontWeight: 600 }}>{t.advisory}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
