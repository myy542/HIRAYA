// student/Dashboard.jsx - Converted from student/dashboard.html & student/js/dashboard.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../src/firebase/config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export default function StudentDashboard() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Enrollment Submitted', time: 'Just now', read: false },
        { id: 2, title: 'Welcome to PLSNHS Portal', time: '1 day ago', read: true }
    ]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    // Get user doc
                    const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userSnap.exists()) {
                        setUserData(userSnap.data());
                    }

                    // Get enrollments
                    const q = query(collection(db, 'enrollments'), where('userId', '==', currentUser.uid));
                    const snapshot = await getDocs(q);
                    const list = [];
                    snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));

                    // In-memory sort
                    list.sort((a, b) => {
                        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (new Date(a.createdAt || 0).getTime() || 0));
                        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (new Date(b.createdAt || 0).getTime() || 0));
                        return timeB - timeA;
                    });

                    setEnrollments(list);
                } catch (err) {
                    console.error('Dashboard load error:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                window.location.href = '/auth/login.html';
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/auth/login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const latest = enrollments[0] || null;
    const isEnrolled = latest && (latest.status === 'Enrolled' || latest.status === 'Approved');
    const isPending = latest && latest.status === 'Pending';
    const isNew = enrollments.length <= 1;
    const displayName = userData?.firstName || userData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Student';
    const initial = displayName.charAt(0).toUpperCase();

    if (loading) {
        return <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* SIDEBAR */}
            <aside className="sidebar" style={{ width: 250, background: '#1B2A4A', color: '#fff', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>P</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: 14 }}>PLSNHS Portal</h4>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Student Portal</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <a href="/student/dashboard.html" style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#FFD700', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-th-large"></i> Dashboard
                    </a>
                    <a href="/student/schedule.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-calendar-alt"></i> Class Schedule
                    </a>
                    <a href="/student/grades.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-graduation-cap"></i> My Grades
                    </a>
                    <a href="/student/requirements.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-clipboard-check"></i> Requirements
                    </a>
                    <a href="/student/enrollment-form.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-pen-alt"></i> Enrollment Form
                    </a>
                    <a href="/student/enrollment-history.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-history"></i> Enrollment History
                    </a>
                    <a href="/student/profile.html" style={{ padding: '10px 14px', borderRadius: 8, color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fas fa-user"></i> My Profile
                    </a>
                </nav>

                <button onClick={handleLogout} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                {/* Header bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1E293B', fontSize: 22 }}>Welcome back, {displayName}! 👋</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Here is an overview of your academic status</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: '#fff', border: '1px solid #e2e8f0', width: 38, height: 38, borderRadius: 19, cursor: 'pointer' }}>
                                <i className="fas fa-bell" style={{ color: '#64748b' }}></i>
                            </button>
                            {notifOpen && (
                                <div style={{ position: 'absolute', right: 0, top: 45, width: 280, background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: 14, zIndex: 10 }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: 13 }}>Notifications</h4>
                                    {notifications.map(n => (
                                        <div key={n.id} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 12 }}>
                                            <div style={{ fontWeight: 600 }}>{n.title}</div>
                                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{n.time}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 19, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{initial}</div>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{displayName}</span>
                        </div>
                    </div>
                </div>

                {/* Status Banner */}
                <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 16, padding: 24, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,215,0,0.2)', color: '#FFD700', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
                            <i className="fas fa-star"></i> {isNew ? 'New Student Enrollee' : 'Continuing Student'}
                        </div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: 20 }}>SY 2026-2027 Admission</h3>
                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: 13 }}>{latest?.grade || 'Grade 7'} {latest?.strand ? `(${latest.strand})` : ''}</p>
                    </div>
                    <div>
                        <span style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 8, background: isEnrolled ? '#10b981' : isPending ? '#f59e0b' : '#64748b', fontWeight: 700, fontSize: 14 }}>
                            {latest?.status || 'No Application'}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 30 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>Enrollment Status</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>{latest?.status || 'None'}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{latest?.schoolYear || '2026-2027'}</div>
                    </div>

                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>Enrolled Subjects</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>{latest ? 8 : 0} Subjects</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Standard DepEd load</div>
                    </div>

                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>General Average</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981', marginTop: 4 }}>89.5%</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>With Honors Standing</div>
                    </div>

                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>Total Records</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#1B2A4A', marginTop: 4 }}>{enrollments.length}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Applications submitted</div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 14 }}>Quick Shortcuts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 30 }}>
                    <a href="/student/schedule.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-calendar-alt" style={{ fontSize: 24, color: '#1B2A4A', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>View Timetable</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Check your daily subjects & teachers</p>
                    </a>

                    <a href="/student/grades.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-graduation-cap" style={{ fontSize: 24, color: '#10b981', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Check Report Card</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Quarterly ratings (Q1 - Q4)</p>
                    </a>

                    <a href="/student/requirements.html" style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#1E293B' }}>
                        <i className="fas fa-file-upload" style={{ fontSize: 24, color: '#f59e0b', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Upload Requirements</h4>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Submit PSA, Form 138 & photos</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
