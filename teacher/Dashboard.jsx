// teacher/Dashboard.jsx - Converted from teacher/dashboard.html & teacher/js/dashboard.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function TeacherDashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                window.location.href = '/auth/login.html';
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = '/auth/login.html';
    };

    const classes = [
        { id: 1, grade: 'Grade 7', section: 'Diamond', subject: 'Mathematics', room: 'Room 201', students: 45 },
        { id: 2, grade: 'Grade 8', section: 'Ruby', subject: 'Mathematics', room: 'Room 203', students: 42 },
        { id: 3, grade: 'Grade 9', section: 'Emerald', subject: 'Advanced Algebra', room: 'Room 305', students: 40 }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: 250, background: '#1B2A4A', color: '#fff', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>P</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: 14 }}>PLSNHS Portal</h4>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Faculty Portal</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <a href="/teacher/dashboard.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#FFD700', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-th-large"></i> Dashboard
                    </a>
                    <a href="/teacher/classes.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-chalkboard-teacher"></i> My Classes
                    </a>
                    <a href="/teacher/attendance-qr.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-qrcode"></i> Attendance QR
                    </a>
                    <a href="/teacher/grades.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-edit"></i> Encode Grades
                    </a>
                    <a href="/teacher/schedule.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-calendar-alt"></i> Teaching Schedule
                    </a>
                    <a href="/teacher/profile.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user"></i> My Profile
                    </a>
                </nav>

                <button onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </aside>

            {/* Content */}
            <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1E293B', fontSize: 22 }}>Teacher Dashboard</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Manage your assigned classes and student attendance</span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 30 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Total Students</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>127</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Assigned Sections</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>3</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Today's Attendance</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#10b981', marginTop: 4 }}>96.8%</div>
                    </div>
                </div>

                {/* Assigned Classes */}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 14 }}>My Classes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {classes.map(c => (
                        <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#1B2A4A' }}>{c.grade} - {c.section}</h4>
                            <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: 13 }}>{c.subject} • {c.room}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{c.students} Enrolled</span>
                                <a href={`/teacher/view-section.html?id=${c.id}`} style={{ fontSize: 12, color: '#1B2A4A', textDecoration: 'none', fontWeight: 700 }}>
                                    View Class →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
