// registrar/Students.jsx - Converted from registrar/students.html & registrar/js/students.js
import React, { useState } from 'react';

export default function RegistrarStudents() {
    const [students, setStudents] = useState([
        { id: '1', lrn: '123456789012', name: 'Juan Dela Cruz', grade: 'Grade 7', section: 'Diamond', status: 'Enrolled' },
        { id: '2', lrn: '123456789013', name: 'Maria Santos', grade: 'Grade 7', section: 'Diamond', status: 'Enrolled' },
        { id: '3', lrn: '123456789014', name: 'Pedro Bautista', grade: 'Grade 8', section: 'Ruby', status: 'Enrolled' }
    ]);
    const [search, setSearch] = useState('');

    const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.lrn.includes(search));

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Master Student Directory</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Search and manage officially enrolled students</span>
                    </div>
                    <a href="/registrar/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder="Search student by name or LRN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                    />
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LRN</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Full Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade Level</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Section</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1B2A4A' }}>{s.lrn}</td>
                                    <td style={{ padding: '12px 16px' }}>{s.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.grade}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.section}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <a href={`/registrar/edit_student.html?id=${s.id}`} style={{ padding: '4px 10px', borderRadius: 4, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
                                            Edit
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
