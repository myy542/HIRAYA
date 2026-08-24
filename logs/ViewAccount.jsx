// logs/ViewAccount.jsx - Converted from logs/view_account.html
import React from 'react';

export default function AdminViewAccount() {
    const account = {
        name: 'Juan Dela Cruz',
        email: 'juan@example.com',
        role: 'Student',
        status: 'Active',
        createdAt: 'August 15, 2026'
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>User Account Details</h2>
                    <a href="/logs/manage_accounts.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Accounts
                    </a>
                </div>

                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        <h3 style={{ margin: 0, color: '#1B2A4A' }}>{account.name}</h3>
                        <span style={{ padding: '3px 8px', borderRadius: 4, background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700 }}>{account.status}</span>
                    </div>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Email: <strong>{account.email}</strong></p>
                    <p style={{ margin: '0 0 6px 0', fontSize: 13, color: '#64748b' }}>Role: <strong>{account.role}</strong></p>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Created: <strong>{account.createdAt}</strong></p>
                </div>

                <a href="/logs/edit_account.html?id=1" style={{ display: 'block', textAlign: 'center', padding: 12, borderRadius: 8, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
                    Edit Account
                </a>
            </div>
        </div>
    );
}
