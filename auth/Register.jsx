// auth/Register.jsx - Converted from auth/register.html & admin/js/register.js
import React, { useState } from 'react';
import { auth, db } from '../src/firebase/config.js';
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [toast, setToast] = useState(null);

    const validatePassword = (pwd) => {
        return {
            length: pwd.length >= 8,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
        };
    };

    const validation = validatePassword(password);
    const validCount = Object.values(validation).filter(Boolean).length;
    const strengthPercent = (validCount / 5) * 100;
    const isStrong = Object.values(validation).every(Boolean);
    const passwordsMatch = confirmPassword !== '' && password === confirmPassword;

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const first = firstName.trim();
        const middle = middleName.trim();
        const last = lastName.trim();
        const birth = birthdate;
        const gen = gender;
        const em = email.trim();
        const pwd = password;
        const confirm = confirmPassword;

        if (!first) {
            showAlert('⚠️ Please enter your first name', 'error');
            return;
        }

        if (!last) {
            showAlert('⚠️ Please enter your last name', 'error');
            return;
        }

        if (!birth) {
            showAlert('⚠️ Please select your birthdate', 'error');
            return;
        }

        const birthDate = new Date(birth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 15) {
            showAlert('⚠️ You must be at least 15 years old to register', 'error');
            return;
        }

        if (age > 30) {
            showAlert('⚠️ Age exceeds maximum allowed (30 years)', 'error');
            return;
        }

        if (!gen) {
            showAlert('⚠️ Please select your gender', 'error');
            return;
        }

        if (!em) {
            showAlert('⚠️ Please enter your email address', 'error');
            return;
        }

        if (!em.includes('@') || !em.includes('.')) {
            showAlert('⚠️ Please enter a valid email address', 'error');
            return;
        }

        if (!isStrong) {
            showAlert('⚠️ Please make sure your password meets all requirements', 'error');
            return;
        }

        if (pwd !== confirm) {
            showAlert('⚠️ Passwords do not match!', 'error');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, em, pwd);
            const user = userCredential.user;

            await sendEmailVerification(user);

            const fullName = middle ? `${first} ${middle} ${last}` : `${first} ${last}`;

            await setDoc(doc(db, 'users', user.uid), {
                firstName: first,
                middleName: middle || null,
                lastName: last,
                fullName: fullName,
                birthdate: birth,
                gender: gen,
                email: em,
                role: 'Student',
                status: 'pending',
                emailVerified: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            showAlert('✅ Registration successful! A verification code has been sent to your email.', 'success');
            showToast('📧 Please check your email to verify your account', 'success');

            setTimeout(() => {
                window.location.href = '/auth/login.html';
            }, 2500);

        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === 'auth/email-already-in-use') {
                showAlert('❌ Email already registered. Please use a different email or login.', 'error');
            } else if (error.code === 'auth/weak-password') {
                showAlert('❌ Password is too weak. Please create a stronger password.', 'error');
            } else if (error.code === 'auth/invalid-email') {
                showAlert('❌ Invalid email address.', 'error');
            } else {
                showAlert('❌ Registration failed: ' + error.message, 'error');
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
            <div className="login-container register-container">
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

                    <h2>Create <span className="highlight">Account</span></h2>
                    <p className="subtitle">Register to access the student portal</p>

                    {alert && (
                        <div className={`alert alert-${alert.type}`}>
                            <i className={`fas fa-${alert.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                            {alert.message}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="regFirstname">First Name <span>*</span></label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="regFirstname"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <i className="fas fa-user input-icon"></i>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="regMiddlename">Middle Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="regMiddlename"
                                        placeholder="Middle name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                    <i className="fas fa-user input-icon"></i>
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="regLastname">Last Name <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="regLastname"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                <i className="fas fa-user input-icon"></i>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="regBirthdate">Birthdate <span>*</span></label>
                                <div className="input-wrapper">
                                    <input
                                        type="date"
                                        id="regBirthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="regGender">Gender <span>*</span></label>
                                <div className="input-wrapper">
                                    <select
                                        id="regGender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="regEmail">Email Address <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="regEmail"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <i className="fas fa-envelope input-icon"></i>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="regPassword">Password <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="regPassword"
                                    placeholder="Create password"
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

                            {password && (
                                <div className="strength-meter">
                                    <div
                                        className={`strength-fill ${strengthPercent <= 25 ? 'weak' : strengthPercent <= 50 ? 'fair' : strengthPercent <= 75 ? 'good' : 'strong'}`}
                                        style={{ width: `${strengthPercent}%` }}
                                    ></div>
                                </div>
                            )}

                            <ul className="password-requirements">
                                <li className={validation.length ? 'valid' : ''}>
                                    <i className={`fas fa-${validation.length ? 'check-circle' : 'circle'}`}></i> At least 8 characters
                                </li>
                                <li className={validation.uppercase ? 'valid' : ''}>
                                    <i className={`fas fa-${validation.uppercase ? 'check-circle' : 'circle'}`}></i> At least 1 uppercase letter
                                </li>
                                <li className={validation.lowercase ? 'valid' : ''}>
                                    <i className={`fas fa-${validation.lowercase ? 'check-circle' : 'circle'}`}></i> At least 1 lowercase letter
                                </li>
                                <li className={validation.number ? 'valid' : ''}>
                                    <i className={`fas fa-${validation.number ? 'check-circle' : 'circle'}`}></i> At least 1 number
                                </li>
                                <li className={validation.special ? 'valid' : ''}>
                                    <i className={`fas fa-${validation.special ? 'check-circle' : 'circle'}`}></i> At least 1 special character
                                </li>
                            </ul>
                        </div>

                        <div className="input-group">
                            <label htmlFor="regConfirmPassword">Confirm Password <span>*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="regConfirmPassword"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {confirmPassword && (
                                <div className={`confirm-match ${passwordsMatch ? 'match' : 'no-match'}`}>
                                    <i className={`fas fa-${passwordsMatch ? 'check-circle' : 'exclamation-circle'}`}></i>
                                    {passwordsMatch ? ' Passwords match!' : ' Passwords do not match!'}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn-login"
                            disabled={loading || !(isStrong && passwordsMatch)}
                        >
                            {loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Creating account...</>
                            ) : (
                                <><i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i> Create Account</>
                            )}
                        </button>
                    </form>

                    <div className="signup-link">
                        Already have an account? <a href="/auth/login.html">Login here</a>
                    </div>
                </div>

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
                </div>
            </div>
        </div>
    );
}
