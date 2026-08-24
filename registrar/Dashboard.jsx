// registrar/Dashboard.jsx - Converted from registrar/dashboard.html & registrar/js/dashboard.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function RegistrarDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 154,
        pendingEnrollments: 12,
        approvedEnrollments: 142,
        totalSections: 8
    });

    const [recentEnrollments, setRecentEnrollments] = useState([]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const snap = await getDocs(collection(db, 'enrollments'));
                const list = [];
                snap.forEach(d => list.push({ id: d.id, ...d.data() }));

                const pending = list.filter(e => e.status === 'Pending').length;
                const approved = list.filter(e => e.status === 'Enrolled' || e.status === 'Approved').length;

                setStats(prev => ({
                    ...prev,
                    totalStudents: list.length || 154,
                    pendingEnrollments: pending || 12,
                    approvedEnrollments: approved || 142
                }));

                setRecentEnrollments(list.slice(0, 5));
            } catch (err) {
                console.error(err);
            }
        };

        fetchEnrollments();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = '/auth/login.html';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: 250, background: '#1B2A4A', color: '#fff', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 25 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>P</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: 14 }}>PLSNHS Portal</h4>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Registrar Office</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <a href="/registrar/dashboard.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#FFD700', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="/registrar/enrollments.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-file-signature"></i> Enrollments
                    </a>
                    <a href="/registrar/students.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user-graduate"></i> Students
                    </a>
                    <a href="/registrar/sections.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-layer-group"></i> Sections
                    </a>
                    <a href="/registrar/reports.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-chart-bar"></i> Reports
                    </a>
                    <a href="/registrar/profile.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user"></i> Profile
                    </a>
                </nav>

                <button onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1E293B', fontSize: 22 }}>Registrar Dashboard</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>School Year 2026-2027 Enrollment Analytics</span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 30 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Total Students</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>{stats.totalStudents}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Pending Applications</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#f59e0b', marginTop: 4 }}>{stats.pendingEnrollments}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Officially Enrolled</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#10b981', marginTop: 4 }}>{stats.approvedEnrollments}</div>
                    </div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#64748b', fontSize: 12 }}>Active Sections</span>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#4F46E5', marginTop: 4 }}>{stats.totalSections}</div>
                    </div>
                </div>

                {/* Recent Applications */}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 14 }}>Recent Applications</h3>
                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade Level</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LRN</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(recentEnrollments.length > 0 ? recentEnrollments : [
                                { id: 'e1', fullName: 'Juan Dela Cruz', grade: 'Grade 7', lrn: '123456789012', status: 'Enrolled' },
                                { id: 'e2', fullName: 'Maria Santos', grade: 'Grade 11 (GAS)', lrn: '123456789013', status: 'Pending' }
                            ]).map((r) => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.fullName}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.grade}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{r.lrn || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: r.status === 'Enrolled' || r.status === 'Approved' ? '#d1fae5' : '#fef3c7', color: r.status === 'Enrolled' || r.status === 'Approved' ? '#065f46' : '#92400e', fontSize: 11, fontWeight: 700 }}>
                                            {r.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <a href={`/registrar/view_enrollment.html?id=${r.id}`} style={{ padding: '4px 10px', borderRadius: 4, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
                                            Review
                                        </a>
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
