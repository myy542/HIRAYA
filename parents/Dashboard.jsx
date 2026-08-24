// parents/Dashboard.jsx - Converted from parents/dashboard.html & parents/js/dashboard.js
import React, { useState } from 'react';

export default function ParentDashboard() {
    const [children] = useState([
        { id: 1, name: 'Juan Dela Cruz', grade: 'Grade 7 - Diamond', lrn: '123456789012', attendance: '98%', avgGrade: '90.25%', status: 'Enrolled' },
        { id: 2, name: 'Maria Dela Cruz', grade: 'Grade 9 - Ruby', lrn: '123456789013', attendance: '95%', avgGrade: '88.50%', status: 'Enrolled' }
    ]);
    const [selectedChild, setSelectedChild] = useState(children[0]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: 250, background: '#1B2A4A', color: '#fff', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 25 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>P</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: 14 }}>PLSNHS Portal</h4>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Parent Gateway</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <a href="/parents/dashboard.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#FFD700', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-th-large"></i> Dashboard
                    </a>
                    <a href="/parents/attendance.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-calendar-check"></i> Attendance
                    </a>
                    <a href="/parents/grades.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-graduation-cap"></i> Academic Grades
                    </a>
                    <a href="/parents/profile.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user"></i> Profile
                    </a>
                </nav>

                <a href="/auth/logout.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.2)', color: '#ef4444', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </a>
            </aside>

            {/* Main */}
            <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                <h2 style={{ margin: '0 0 6px 0', color: '#1E293B', fontSize: 22 }}>Parent Dashboard</h2>
                <span style={{ fontSize: 13, color: '#64748b' }}>Monitor your children's attendance and academic progress</span>

                {/* Child Picker */}
                <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
                    {children.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedChild(c)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: 10,
                                border: selectedChild.id === c.id ? '2px solid #1B2A4A' : '1px solid #cbd5e1',
                                background: selectedChild.id === c.id ? '#1B2A4A' : '#fff',
                                color: selectedChild.id === c.id ? '#fff' : '#1E293B',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-user-graduate" style={{ marginRight: 6 }}></i> {c.name}
                        </button>
                    ))}
                </div>

                {/* Selected Child Info */}
                <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: 11, color: '#FFD700', fontWeight: 700 }}>STUDENT OVERVIEW</span>
                            <h3 style={{ margin: '4px 0', fontSize: 22 }}>{selectedChild.name}</h3>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: 13 }}>{selectedChild.grade} • LRN: {selectedChild.lrn}</p>
                        </div>
                        <span style={{ padding: '6px 14px', borderRadius: 20, background: '#10b981', fontWeight: 700, fontSize: 12 }}>
                            {selectedChild.status}
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Attendance Rate</span>
                        <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981', marginTop: 4 }}>{selectedChild.attendance}</div>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>0 Unexcused Absences</span>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>General Average</span>
                        <div style={{ fontSize: 28, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>{selectedChild.avgGrade}</div>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Standing: With Honors</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
