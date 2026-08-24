// teacher/Profile.jsx - Converted from teacher/profile.html & teacher/js/profile.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';

export default function TeacherProfile() {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const d = await getDoc(doc(db, 'users', currentUser.uid));
                    if (d.exists()) {
                        setUserData(d.data());
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            if (user) {
                await updatePassword(user, newPassword);
                alert('✅ Password updated successfully!');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const displayName = userData?.fullName || userData?.firstName || user?.email?.split('@')[0] || 'Teacher';

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Faculty Profile</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Teacher credentials and security settings</span>
                    </div>
                    <a href="/teacher/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                {/* ID Card Display */}
                <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 16, padding: 24, marginBottom: 24, border: '2px solid #FFD700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 64, height: 64, borderRadius: 32, background: '#FFD700', color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800 }}>
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: 18 }}>{displayName}</h3>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: 13 }}>Faculty ID: T-2026-0042 • Department of Mathematics</p>
                            <span style={{ display: 'inline-block', marginTop: 8, padding: '3px 8px', background: '#10b981', borderRadius: 4, fontSize: 10, fontWeight: 800 }}>
                                ACTIVE FACULTY
                            </span>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A', marginBottom: 16 }}>Faculty Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13 }}>
                        <div>
                            <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Official Email</span>
                            <strong>{user?.email || 'teacher@plsnhs-portal.edu.ph'}</strong>
                        </div>
                        <div>
                            <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Assigned Advisory</span>
                            <strong>Grade 7 - Diamond</strong>
                        </div>
                        <div>
                            <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Teaching Load</span>
                            <strong>3 Sections (127 Students)</strong>
                        </div>
                        <div>
                            <span style={{ color: '#64748b', display: 'block', fontSize: 11 }}>Role</span>
                            <strong>Subject Teacher / Adviser</strong>
                        </div>
                    </div>
                </div>

                {/* Password Change Form */}
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A', marginBottom: 16 }}>Change Password</h3>
                    <form onSubmit={handleChangePassword}>
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>New Password</label>
                            <input type="password" placeholder="At least 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Confirm New Password</label>
                            <input type="password" placeholder="Re-enter new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <button type="submit" disabled={loading} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
