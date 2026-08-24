// logs/Subjects.jsx - Converted from logs/subjects.html
import React, { useState } from 'react';

export default function AdminSubjects() {
    const [subjects] = useState([
        { id: 1, code: 'MATH-7', name: 'Mathematics 7', grade: 'Grade 7', units: 4 },
        { id: 2, code: 'SCI-7', name: 'Science 7', grade: 'Grade 7', units: 4 },
        { id: 3, code: 'ENG-7', name: 'English 7', grade: 'Grade 7', units: 4 },
        { id: 4, code: 'FIL-7', name: 'Filipino 7', grade: 'Grade 7', units: 4 },
        { id: 5, code: 'AP-7', name: 'Araling Panlipunan 7', grade: 'Grade 7', units: 3 },
        { id: 6, code: 'MAPEH-7', name: 'Music, Arts, PE & Health 7', grade: 'Grade 7', units: 4 },
        { id: 7, code: 'TLE-7', name: 'Technology and Livelihood Education 7', grade: 'Grade 7', units: 4 },
        { id: 8, code: 'ESP-7', name: 'Edukasyon sa Pagpapakatao 7', grade: 'Grade 7', units: 2 }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>DepEd Subject Masterlist</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Curriculum subject catalog and units</span>
                    </div>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subject Code</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subject Title</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade Level</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1B2A4A' }}>{s.code}</td>
                                    <td style={{ padding: '12px 16px' }}>{s.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.grade}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>{s.units}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
