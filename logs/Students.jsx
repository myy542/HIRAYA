// logs/Students.jsx - Converted from logs/students.html
import React, { useState } from 'react';

export default function AdminStudents() {
    const [students] = useState([
        { id: 1, name: 'Juan Dela Cruz', lrn: '123456789012', grade: 'Grade 7 - Diamond', status: 'Enrolled' },
        { id: 2, name: 'Maria Santos', lrn: '123456789013', grade: 'Grade 8 - Ruby', status: 'Enrolled' },
        { id: 3, name: 'Pedro Bautista', lrn: '123456789014', grade: 'Grade 9 - Emerald', status: 'Enrolled' }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Student Registry</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>All student records in database</span>
                    </div>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LRN</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade & Section</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.lrn}</td>
                                    <td style={{ padding: '12px 16px' }}>{s.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.grade}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700 }}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <a href={`/logs/view_student.html?id=${s.id}`} style={{ padding: '4px 10px', borderRadius: 4, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
