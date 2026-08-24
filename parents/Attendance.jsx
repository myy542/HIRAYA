// parents/Attendance.jsx - Converted from parents/attendance.html & parents/js/attendance.js
import React from 'react';

export default function ParentAttendance() {
    const records = [
        { date: 'Aug 24, 2026', time: '7:25 AM', status: 'Present', remarks: 'On Time' },
        { date: 'Aug 23, 2026', time: '7:28 AM', status: 'Present', remarks: 'On Time' },
        { date: 'Aug 22, 2026', time: '7:40 AM', status: 'Late', remarks: '10 mins late' },
        { date: 'Aug 21, 2026', time: '7:20 AM', status: 'Present', remarks: 'On Time' }
    ];

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Attendance Log</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Daily check-in history for Juan Dela Cruz</span>
                    </div>
                    <a href="/parents/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Time In</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.date}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.time}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: r.status === 'Present' ? '#d1fae5' : '#fef3c7', color: r.status === 'Present' ? '#065f46' : '#92400e', fontSize: 11, fontWeight: 700 }}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
