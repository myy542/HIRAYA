// student/Grades.jsx - Converted from student/grades.html & student/js/grades.js
import React, { useState } from 'react';

export default function StudentGrades() {
    const [selectedSubject, setSelectedSubject] = useState(null);

    const subjects = [
        { id: 1, name: 'Mathematics', teacher: 'Mrs. Santos', q1: 88, q2: 90, q3: 92, q4: 91, final: 90.25, remarks: 'Passed' },
        { id: 2, name: 'Science', teacher: 'Mr. Dela Cruz', q1: 85, q2: 87, q3: 89, q4: 90, final: 87.75, remarks: 'Passed' },
        { id: 3, name: 'English', teacher: 'Ms. Reyes', q1: 91, q2: 92, q3: 90, q4: 93, final: 91.50, remarks: 'Passed' },
        { id: 4, name: 'Filipino', teacher: 'Mr. Garcia', q1: 89, q2: 91, q3: 88, q4: 92, final: 90.00, remarks: 'Passed' },
        { id: 5, name: 'Araling Panlipunan', teacher: 'Mrs. Bautista', q1: 87, q2: 89, q3: 91, q4: 90, final: 89.25, remarks: 'Passed' },
        { id: 6, name: 'MAPEH', teacher: 'Coach Ramirez', q1: 94, q2: 95, q3: 92, q4: 96, final: 94.25, remarks: 'Passed' },
        { id: 7, name: 'TLE', teacher: 'Mr. Villanueva', q1: 86, q2: 88, q3: 90, q4: 89, final: 88.25, remarks: 'Passed' },
        { id: 8, name: 'EsP', teacher: 'Mrs. Ramos', q1: 92, q2: 94, q3: 95, q4: 93, final: 93.50, remarks: 'Passed' }
    ];

    const generalAverage = (subjects.reduce((sum, s) => sum + s.final, 0) / subjects.length).toFixed(2);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Quarterly Report Card</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Grade 7 - Diamond • SY 2026-2027</span>
                    </div>
                    <a href="/student/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                {/* Overall GPA Card */}
                <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: 12, color: '#cbd5e1' }}>General Weighted Average</span>
                        <div style={{ fontSize: 32, fontWeight: 800, color: '#FFD700' }}>{generalAverage}%</div>
                        <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>Academic Standing: With Honors</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'inline-block', padding: '6px 14px', background: '#10b981', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>
                            Eligible for Promotion
                        </span>
                    </div>
                </div>

                {/* Grades Table */}
                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px' }}>Subject</th>
                                <th style={{ padding: '12px 16px' }}>Teacher</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q1</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q2</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q3</th>
                                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Q4</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Final</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.teacher}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q1}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q2}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q3}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>{s.q4}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#1B2A4A' }}>{s.final.toFixed(2)}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: '#d1fae5', color: '#065f46', fontWeight: 700, fontSize: 11 }}>
                                            {s.remarks}
                                        </span>
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
