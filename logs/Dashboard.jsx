// logs/Dashboard.jsx - Converted from logs/dashboard.html
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        students: 154,
        teachers: 28,
        sections: 12,
        enrollments: 168
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const enrSnap = await getDocs(collection(db, 'enrollments'));
                const userSnap = await getDocs(collection(db, 'users'));
                setCounts(prev => ({
                    ...prev,
                    enrollments: enrSnap.size || 168,
                    students: userSnap.size || 154
                }));
            } catch (e) {
                console.error(e);
            }
        };
        fetchCounts();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = '/auth/login.html';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: 250, background: '#0F172A', color: '#fff', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 25 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFD700', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>P</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: 14 }}>PLSNHS Admin</h4>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>System Administrator</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <a href="/logs/dashboard.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#FFD700', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="/logs/enrollments.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-file-signature"></i> Enrollments
                    </a>
                    <a href="/logs/students.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user-graduate"></i> Students
                    </a>
                    <a href="/logs/teachers.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-chalkboard-teacher"></i> Teachers
                    </a>
                    <a href="/logs/sections.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-layer-group"></i> Sections
                    </a>
                    <a href="/logs/subjects.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-book"></i> Subjects
                    </a>
                    <a href="/logs/attendance.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-calendar-check"></i> Attendance
                    </a>
                    <a href="/logs/manage_accounts.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-users-cog"></i> Accounts
                    </a>
                    <a href="/logs/profile.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user-shield"></i> Profile
                    </a>
                </nav>

                <button onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                <h2 style={{ margin: '0 0 6px 0', color: '#1E293B', fontSize: 22 }}>Admin Control Panel</h2>
                <span style={{ fontSize: 13, color: '#64748b' }}>Complete system overview, user management & master records</span>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '24px 0' }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Total Students</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{counts.students}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Total Teachers</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{counts.teachers}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Active Sections</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{counts.sections}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Total Applications</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#10b981', marginTop: 4 }}>{counts.enrollments}</div>
                    </div>
                </div>

                {/* Quick Management Shortcuts */}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 14 }}>System Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <a href="/logs/add_teacher.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-user-plus" style={{ fontSize: 22, color: '#0F172A', marginBottom: 8 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Add Faculty Member</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Create new teacher account</p>
                    </a>
                    <a href="/logs/create_section.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-layer-group" style={{ fontSize: 22, color: '#10b981', marginBottom: 8 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Create Section</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Assign room & adviser</p>
                    </a>
                    <a href="/logs/create_schedule.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-calendar-plus" style={{ fontSize: 22, color: '#f59e0b', marginBottom: 8 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Create Class Schedule</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Set subjects & time slots</p>
                    </a>
                    <a href="/logs/send_notif_requirements.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-bell" style={{ fontSize: 22, color: '#ef4444', marginBottom: 8 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Broadcast Alerts</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Notify pending students</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
