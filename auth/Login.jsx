// auth/Login.jsx - Converted from auth/login.html & admin/js/login.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../src/firebase/config.js';
import { 
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [toast, setToast] = useState(null);

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    useEffect(() => {
        // Check saved cookie
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const savedEmailCookie = cookies.find(row => row.startsWith('user_email='));
        if (savedEmailCookie) {
            const val = savedEmailCookie.split('=')[1];
            if (val) {
                setEmail(decodeURIComponent(val));
                setRemember(true);
            }
        }

        // Check if already logged in
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('✅ User already logged in:', user.email);
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        const role = data.role || 'Student';
                        const paths = {
                            'Admin': '/logs/dashboard.html',
                            'Registrar': '/registrar/dashboard.html',
                            'Teacher': '/teacher/dashboard.html',
                            'Student': '/student/dashboard.html',
                            'Parent': '/parents/dashboard.html',
                            'Parents': '/parents/dashboard.html'
                        };
                        window.location.href = paths[role] || '/student/dashboard.html';
                    }
                } catch (error) {
                    console.error('Error getting user role:', error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const cleanEmail = email.trim();

        if (!cleanEmail) {
            showAlert('⚠️ Please enter your email address', 'error');
            return;
        }

        if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
            showAlert('⚠️ Please enter a valid email address', 'error');
            return;
        }

        if (!password) {
            showAlert('⚠️ Please enter your password', 'error');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            let userData = {};
            if (userDoc.exists()) {
                userData = userDoc.data();
            }

            const role = userData.role || 'Student';
            const emailVerified = user.emailVerified || userData.emailVerified || false;

            if (role === 'Student' && !emailVerified) {
                await sendEmailVerification(user);
                showAlert('⚠️ Please verify your email address first. Check your inbox for the verification link.', 'error');
                showToast('📧 Verification email sent to ' + cleanEmail, 'warning');
                setLoading(false);
                return;
            }

            if (remember) {
                document.cookie = `user_email=${encodeURIComponent(cleanEmail)}; path=/; max-age=${60 * 60 * 24 * 30}`;
            } else {
                document.cookie = 'user_email=; path=/; max-age=0';
            }

            const paths = {
                'Admin': '/logs/dashboard.html',
                'Registrar': '/registrar/dashboard.html',
                'Teacher': '/teacher/dashboard.html',
                'Student': '/student/dashboard.html',
                'Parent': '/parents/dashboard.html',
                'Parents': '/parents/dashboard.html'
            };
            const targetPath = paths[role] || '/student/dashboard.html';

            showToast('✅ Login successful! Welcome back!', 'success');
            setTimeout(() => {
                window.location.href = targetPath;
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            if (error.code === 'auth/user-not-found') {
                showAlert('❌ Email not registered. Please create an account.', 'error');
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                showAlert('❌ Incorrect email or password. Please try again.', 'error');
            } else if (error.code === 'auth/invalid-email') {
                showAlert('❌ Invalid email address.', 'error');
            } else if (error.code === 'auth/too-many-requests') {
                showAlert('⚠️ Too many failed attempts. Please try again later.', 'error');
            } else if (error.code === 'auth/user-disabled') {
                showAlert('❌ Your account has been disabled. Please contact administrator.', 'error');
            } else {
                showAlert('❌ Login failed: ' + error.message, 'error');
            }
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {toast && (
                <div className={`toast show ${toast.type}`}>
                    <i className={`fas fa-${toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
                    <span>{toast.message}</span>
                </div>
            )}
            <div className="login-container">
                {/* Left Panel - Login Form */}
                <div className="login-panel">
                    <div className="logo-section">
                        <div className="school-logo">
                            <img src="/pictures/logo sa skwelahan.jpg" alt="School Logo" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230B4F2E' /%3E%3Ctext x='50' y='65' text-anchor='middle' fill='white' font-size='30' font-weight='bold'%3EPLS%3C/text%3E%3C/svg%3E";
                            }} />
                        </div>
                        <div className="school-name">
                            <h1>Placido L. Señor</h1>
                            <p>National High School</p>
                        </div>
                    </div>

                    <h2>Welcome <span className="highlight">Back</span></h2>
                    <p className="subtitle">Login to your account to continue</p>

                    {alert && (
                        <div className={`alert alert-${alert.type}`}>
                            <i className={`fas fa-${alert.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                            {alert.message}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <i className="fas fa-envelope input-icon"></i>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="forgot-password">
                            <a href="/auth/forgot_password.html">
                                <i className="fas fa-key"></i> Forgot Password?
                            </a>
                        </div>

                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
                            ) : (
                                <><i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i> LOGIN</>
                            )}
                        </button>
                    </form>

                    <div className="signup-link">
                        Don't have an account? <a href="/auth/enrollment.html">Enroll Now</a>
                    </div>

                    <div className="form-footer">
                        <a href="/auth/homepage.html" className="back-home">
                            <i className="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                </div>

                {/* Right Panel - Information */}
                <div className="info-panel">
                    <div className="motto">
                        <h3>VIRTUS<br /><span>EXCELLENTIA</span><br />SERVITIUM</h3>
                    </div>

                    <div className="school-level">
                        <h4>SENIOR HIGH SCHOOL</h4>
                        <p>Grades 11-12 · Academic & Technical-Vocational Tracks</p>
                    </div>

                    <ul className="programs-list">
                        <li><strong>TVL</strong> - Technical Vocational Livelihood (Cookery)</li>
                        <li><strong>HUMSS</strong> - Humanities and Social Sciences</li>
                        <li><strong>GAS</strong> - General Academic Strand</li>
                    </ul>

                    <div className="address">
                        <p><i className="fas fa-map-marker-alt"></i> Placido L. Señor NHS, Langtad, City of Naga, Cebu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
