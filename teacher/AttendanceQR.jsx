// teacher/AttendanceQR.jsx - Converted from teacher/attendance-qr.html & teacher/js/attendance-qr.js
import React, { useState } from 'react';

export default function TeacherAttendanceQR() {
    const [selectedSection, setSelectedSection] = useState('Grade 7 - Diamond');
    const [subject, setSubject] = useState('Mathematics');
    const [qrActive, setQrActive] = useState(true);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 750, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Attendance QR Generator</h2>
                    <a href="/teacher/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Section</label>
                        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="Grade 7 - Diamond">Grade 7 - Diamond</option>
                            <option value="Grade 8 - Ruby">Grade 8 - Ruby</option>
                            <option value="Grade 9 - Emerald">Grade 9 - Emerald</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Subject</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                </div>

                {/* QR Code Container */}
                <div style={{ textAlign: 'center', padding: 30, background: '#f8fafc', borderRadius: 12, border: '2px dashed #cbd5e1', marginBottom: 20 }}>
                    <div style={{ width: 220, height: 220, background: '#fff', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <i className="fas fa-qrcode" style={{ fontSize: 140, color: '#1B2A4A' }}></i>
                    </div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#1B2A4A' }}>{selectedSection}</h3>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>{subject} • Active for Today: {new Date().toLocaleDateString()}</p>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => alert('Attendance log exported to CSV!')} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                        Export Attendance Log
                    </button>
                    <button onClick={() => setQrActive(!qrActive)} style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        {qrActive ? 'Refresh QR Token' : 'Generate Token'}
                    </button>
                </div>
            </div>
        </div>
    );
}
