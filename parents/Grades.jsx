// parents/Grades.jsx - Converted from parents/grades.html & parents/js/grades.js
import React from 'react';

export default function ParentGrades() {
    const subjects = [
        { name: 'Mathematics', q1: 88, q2: 90, q3: 92, q4: 91, final: 90.25 },
        { name: 'Science', q1: 85, q2: 87, q3: 89, q4: 90, final: 87.75 },
        { name: 'English', q1: 91, q2: 92, q3: 90, q4: 93, final: 91.50 },
        { name: 'Filipino', q1: 89, q2: 91, q3: 88, q4: 92, final: 90.00 }
    ];

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 850, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Student Grades Overview</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Juan Dela Cruz • Grade 7 - Diamond</span>
                    </div>
                    <a href="/parents/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subject</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q1</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q2</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q3</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q4</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((s, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.name}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q1}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q2}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q3}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q4}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#1B2A4A' }}>{s.final.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
