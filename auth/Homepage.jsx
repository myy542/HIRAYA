// auth/Homepage.jsx - Converted from auth/homepage.html
import React, { useState } from 'react';

export default function Homepage() {
    const [activeSection, setActiveSection] = useState('home');

    return (
        <div className="fullscreen-wrapper">
            {/* ===== NAVBAR ===== */}
            <nav className="navbar">
                <div className="brand">
                    <img
                        src="/pictures/logo sa skwelahan.jpg"
                        alt="PLSNHS Logo"
                        className="brand-logo"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                        }}
                    />
                    <span
                        className="brand-icon-fallback"
                        style={{ display: 'none', background: '#0a015c', color: 'white', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, fontWeight: 700, fontSize: '1rem' }}
                    >
                        P
                    </span>
                    <span className="brand-name">PLSNHS</span>
                </div>
                <div className="nav-menu">
                    <div className="nav-links">
                        <a
                            href="#home"
                            className={activeSection === 'home' ? 'active' : ''}
                            onClick={() => setActiveSection('home')}
                        >
                            Home
                        </a>
                        <a
                            href="#features"
                            className={activeSection === 'features' ? 'active' : ''}
                            onClick={() => setActiveSection('features')}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className={activeSection === 'about' ? 'active' : ''}
                            onClick={() => setActiveSection('about')}
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={() => setActiveSection('contact')}
                        >
                            Contact
                        </a>
                    </div>
                </div>
                <div className="nav-login">
                    <a href="/auth/login.html" className="btn-outline-sm" style={{ textDecoration: 'none' }}>
                        Login
                    </a>
                </div>
            </nav>

            {/* ===== PAGE CONTENT ===== */}
            <main id="pageContent">
                <section id="page-home" className="page-section active">
                    <div className="hero-section">
                        <div className="hero-content">
                            <h1 className="hero-title">Welcome to PLSNHS</h1>
                            <p className="hero-sub">Your seamless gateway to academic enrollment and management</p>
                            <div className="hero-buttons">
                                <a href="/auth/enrollment.html" className="btn-enroll" style={{ textDecoration: 'none' }}>
                                    <i className="fas fa-pen-fancy"></i> Enroll Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FEATURES */}
                    <section className="features-section" id="features">
                        <div className="container">
                            <h2 className="section-title">Why Choose Placido L. Señor National High School</h2>
                            <div className="features-row">
                                <div className="feature-card" data-feature="enrollment">
                                    <i className="fas fa-file-signature"></i>
                                    <h3>Easy Enrollment</h3>
                                    <p>Streamlined online enrollment process for students and parents</p>
                                </div>
                                <div className="feature-card" data-feature="tracking">
                                    <i className="fas fa-chart-line"></i>
                                    <h3>Real-time Tracking</h3>
                                    <p>Monitor enrollment status and requirements in real-time</p>
                                </div>
                                <div className="feature-card" data-feature="security">
                                    <i className="fas fa-shield-alt"></i>
                                    <h3>Secure System</h3>
                                    <p>Your data is protected with industry-standard security</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ABOUT */}
                    <section className="about-section" id="about">
                        <div className="container">
                            <div className="about-stats-wrap">
                                <div className="about-text">
                                    <h2>About PLSNHS</h2>
                                    <p>
                                        PLSNHS is a modern enrollment management system designed specifically for Placido L. Señor National High School. We streamline the admission process, making it easier for students, parents, and administrators to manage enrollments efficiently.
                                    </p>
                                    <ul className="about-list">
                                        <li><i className="fas fa-check-circle"></i> Paperless enrollment process</li>
                                        <li><i className="fas fa-check-circle"></i> Automated status notifications</li>
                                        <li><i className="fas fa-check-circle"></i> Integrated document tracking</li>
                                        <li><i className="fas fa-check-circle"></i> 24/7 accessibility</li>
                                    </ul>
                                </div>
                                <div className="stats-group">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Students Enrolled</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">50+</span>
                                        <span className="stat-label">Staff Members</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">98%</span>
                                        <span className="stat-label">Satisfaction Rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section className="contact-section" id="contact" style={{ padding: '60px 20px', background: '#f8fafc' }}>
                        <div className="container" style={{ maxWidth: 1000, margin: '0 auto' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: 30, color: '#0a015c' }}>Contact Information</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                                <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <i className="fas fa-map-marker-alt" style={{ color: '#0a015c', fontSize: 24, marginBottom: 10 }}></i>
                                    <h4>Location</h4>
                                    <p>Placido L. Señor NHS, Langtad, City of Naga, Cebu</p>
                                </div>
                                <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <i className="fas fa-envelope" style={{ color: '#0a015c', fontSize: 24, marginBottom: 10 }}></i>
                                    <h4>Email Support</h4>
                                    <p>support@plsnhs-portal.edu.ph</p>
                                </div>
                                <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <i className="fas fa-phone" style={{ color: '#0a015c', fontSize: 24, marginBottom: 10 }}></i>
                                    <h4>Contact Numbers</h4>
                                    <p>+63 (032) 123-4567 / 0912-345-6789</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="site-footer">
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Placido L. Señor National High School. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
