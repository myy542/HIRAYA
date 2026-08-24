// auth/Logout.jsx - Converted from auth/logout.html
import React, { useState, useEffect } from 'react';
import { auth } from '../src/firebase/config.js';
import { signOut } from 'firebase/auth';

export default function Logout() {
    const [timer, setTimer] = useState(10);
    const [loggingOut, setLoggingOut] = useState(false);
    const [alert, setAlert] = useState(null);

    const performLogout = async () => {
        setLoggingOut(true);
        try {
            await signOut(auth);
            // Clear cookies & storage
            document.cookie.split(";").forEach((c) => {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            sessionStorage.clear();
            setAlert({ message: '✅ You have been logged out successfully.', type: 'success' });
            setTimeout(() => {
                window.location.href = '/auth/homepage.html';
            }, 1500);
        } catch (error) {
            console.error('Logout error:', error);
            window.location.href = '/auth/homepage.html';
        }
    };

    useEffect(() => {
        if (loggingOut) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    performLogout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [loggingOut]);

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1B2A4A, #2a3d6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, padding: '45px 40px 40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 32 }}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>

                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1B2A4A', marginBottom: 8 }}>Logging Out</h1>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Are you sure you want to end your current session?</p>

                {alert && (
                    <div style={{ padding: 12, borderRadius: 8, background: '#d1fae5', color: '#065f46', marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
                        {alert.message}
                    </div>
                )}

                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#64748b' }}>
                    Auto redirect in <span style={{ fontWeight: 700, color: timer <= 5 ? '#ef4444' : '#1B2A4A' }}>{timer}</span> seconds
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loggingOut}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1E293B', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={performLogout}
                        disabled={loggingOut}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                    >
                        {loggingOut ? 'Logging out...' : 'Confirm Logout'}
                    </button>
                </div>
            </div>
        </div>
    );
}
