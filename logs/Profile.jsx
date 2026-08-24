// logs/Profile.jsx - Converted from logs/profile.html
import React, { useState } from 'react';

export default function AdminProfile() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        alert('Admin password updated successfully!');
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Admin Security Settings</h2>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#0F172A', color: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 28, background: '#FFD700', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22 }}>A</div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: 18 }}>System Administrator</h3>
                        <p style={{ margin: '2px 0 0 0', color: '#cbd5e1', fontSize: 12 }}>Root Access • Placido L. Señor NHS</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#1B2A4A' }}>Update Admin Password</h4>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Confirm Password</label>
                        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0F172A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Save Password
                    </button>
                </form>
            </div>
        </div>
    );
}
