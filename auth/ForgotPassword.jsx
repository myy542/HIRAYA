// auth/ForgotPassword.jsx - Converted from auth/forgot_password.html & admin/js/forgot_password.js
import React, { useState } from 'react';
import { auth } from '../src/firebase/config.js';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanEmail = email.trim();
        const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

        if (!cleanEmail) {
            showAlert('Please enter your email address', 'error');
            return;
        }

        if (!emailPattern.test(cleanEmail)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, cleanEmail);
            showAlert('✅ If your email is registered and verified, you will receive a reset code/link.', 'success');
            setEmail('');
        } catch (error) {
            console.error('Reset error:', error);
            showAlert('✅ If your email is registered and verified, you will receive a reset code/link.', 'success');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: 450, margin: '60px auto', padding: '30px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            <div className="logo-section" style={{ textAlign: 'center', marginBottom: 24 }}>
                <div className="logo-icon" style={{ width: 60, height: 60, borderRadius: 30, background: '#eef2ff', color: '#0a015c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: 24 }}>
                    <i className="fas fa-key"></i>
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0a015c', margin: '0 0 6px 0' }}>Forgot Password?</h1>
                <div className="subtitle" style={{ fontSize: 13, color: '#64748b' }}>
                    Enter your email address and we'll send you a password reset code.
                </div>
            </div>

            {alert && (
                <div className={`alert alert-${alert.type}`} style={{ padding: 12, borderRadius: 8, marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center', background: alert.type === 'success' ? '#d1fae5' : '#fee2e2', color: alert.type === 'success' ? '#065f46' : '#991b1b', fontSize: 13 }}>
                    <i className={`fas fa-${alert.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                    <span>{alert.message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="input-group" style={{ marginBottom: 16 }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-envelope" style={{ position: 'absolute', left: 14, color: '#94a3b8' }}></i>
                        <input
                            type="email"
                            id="emailInput"
                            placeholder="Enter your registered email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                    style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0a015c', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                    {loading ? (
                        <><i className="fas fa-spinner fa-spin"></i><span>Sending...</span></>
                    ) : (
                        <><i className="fas fa-paper-plane"></i><span>Send Reset Code</span></>
                    )}
                </button>
            </form>

            <div className="back-link" style={{ textAlign: 'center', marginTop: 18 }}>
                <a href="/auth/login.html" style={{ color: '#0a015c', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: 6 }}></i>
                    Back to Login
                </a>
            </div>

            <div className="features" style={{ display: 'flex', justifyContent: 'space-around', marginTop: 30, paddingTop: 20, borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 11 }}>
                <div className="feature" style={{ textAlign: 'center' }}>
                    <i className="fas fa-clock" style={{ display: 'block', fontSize: 16, marginBottom: 4, color: '#0a015c' }}></i>
                    <span>Valid for 1 hour</span>
                </div>
                <div className="feature" style={{ textAlign: 'center' }}>
                    <i className="fas fa-shield-alt" style={{ display: 'block', fontSize: 16, marginBottom: 4, color: '#0a015c' }}></i>
                    <span>Secure & Encrypted</span>
                </div>
                <div className="feature" style={{ textAlign: 'center' }}>
                    <i className="fas fa-envelope" style={{ display: 'block', fontSize: 16, marginBottom: 4, color: '#0a015c' }}></i>
                    <span>Check your inbox</span>
                </div>
            </div>
        </div>
    );
}
