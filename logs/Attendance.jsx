// logs/Attendance.jsx - Converted from logs/attendance.html
import React, { useState } from 'react';

export default function AdminAttendance() {
    const [records] = useState([
        { id: 1, student: 'Juan Dela Cruz', section: 'Grade 7 - Diamond', date: 'Aug 24, 2026', time: '7:25 AM', status: 'Present' },
        { id: 2, student: 'Maria Santos', section: 'Grade 8 - Ruby', date: 'Aug 24, 2026', time: '7:28 AM', status: 'Present' },
        { id: 3, student: 'Pedro Bautista', section: 'Grade 9 - Emerald', date: 'Aug 24, 2026', time: '7:45 AM', status: 'Late' }
    ]);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Schoolwide Attendance Logs</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Real-time student check-in feed</span>
                    </div>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Section</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Time In</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(r => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.student}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.section}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.date}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.time}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: r.status === 'Present' ? '#d1fae5' : '#fef3c7', color: r.status === 'Present' ? '#065f46' : '#92400e', fontSize: 11, fontWeight: 700 }}>
                                            {r.status}
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
