// registrar/VerifyEmail.jsx - Converted from registrar/verify_email.html
import React, { useState } from 'react';

export default function RegistrarVerifyEmail() {
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        setVerified(true);
    };

    return (
        <div style={{ padding: 40, background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 450, background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 30, background: '#d1fae5', color: '#065f46', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 24 }}>
                    <i className="fas fa-envelope-open-text"></i>
                </div>
                <h2 style={{ margin: '0 0 8px 0', color: '#1B2A4A', fontSize: 22 }}>Email Verification</h2>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Verify student account status in the admission database</p>

                {verified ? (
                    <div style={{ padding: 16, background: '#d1fae5', color: '#065f46', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                        ✅ {email} is verified in the system!
                    </div>
                ) : (
                    <form onSubmit={handleVerify}>
                        <input type="email" placeholder="Enter student email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, marginBottom: 14 }} />
                        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                            Verify Account
                        </button>
                    </form>
                )}

                <div style={{ marginTop: 20 }}>
                    <a href="/registrar/dashboard.html" style={{ color: '#1B2A4A', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
