// teacher/Grades.jsx - Converted from teacher/grades.html & teacher/js/grades.js
import React, { useState } from 'react';

export default function TeacherGrades() {
    const [students, setStudents] = useState([
        { id: 1, name: 'Juan Dela Cruz', lrn: '123456789012', q1: 88, q2: 90, q3: 92, q4: 91 },
        { id: 2, name: 'Maria Santos', lrn: '123456789013', q1: 91, q2: 93, q3: 90, q4: 94 },
        { id: 3, name: 'Pedro Bautista', lrn: '123456789014', q1: 82, q2: 85, q3: 84, q4: 86 }
    ]);

    const handleGradeChange = (id, quarter, val) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, [quarter]: parseFloat(val) || 0 } : s));
    };

    const handleSave = () => {
        alert('✅ Grades successfully encoded and updated to school database!');
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Quarterly Grade Encoder</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Grade 7 - Diamond • Mathematics</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={handleSave} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                            <i className="fas fa-save" style={{ marginRight: 6 }}></i> Save Grades
                        </button>
                        <a href="/teacher/dashboard.html" style={{ textDecoration: 'none', padding: '8px 14px', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                            Back
                        </a>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LRN</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center', width: 90 }}>Q1</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center', width: 90 }}>Q2</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center', width: 90 }}>Q3</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center', width: 90 }}>Q4</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Final</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => {
                                const finalGrade = ((s.q1 + s.q2 + s.q3 + s.q4) / 4).toFixed(2);
                                const isPassed = finalGrade >= 75;

                                return (
                                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.name}</td>
                                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.lrn}</td>
                                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                            <input type="number" value={s.q1} onChange={(e) => handleGradeChange(s.id, 'q1', e.target.value)} style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1', textAlign: 'center' }} />
                                        </td>
                                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                            <input type="number" value={s.q2} onChange={(e) => handleGradeChange(s.id, 'q2', e.target.value)} style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1', textAlign: 'center' }} />
                                        </td>
                                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                            <input type="number" value={s.q3} onChange={(e) => handleGradeChange(s.id, 'q3', e.target.value)} style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1', textAlign: 'center' }} />
                                        </td>
                                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                            <input type="number" value={s.q4} onChange={(e) => handleGradeChange(s.id, 'q4', e.target.value)} style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1', textAlign: 'center' }} />
                                        </td>
                                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#1B2A4A' }}>{finalGrade}</td>
                                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                            <span style={{ padding: '3px 8px', borderRadius: 4, background: isPassed ? '#d1fae5' : '#fee2e2', color: isPassed ? '#065f46' : '#991b1b', fontWeight: 700, fontSize: 11 }}>
                                                {isPassed ? 'Passed' : 'Failed'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
