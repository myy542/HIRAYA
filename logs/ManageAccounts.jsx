// logs/ManageAccounts.jsx - Converted from logs/manage_accounts.html
import React, { useState } from 'react';

export default function AdminManageAccounts() {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Principal Office', email: 'admin@plsnhs.edu.ph', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Registrar Office', email: 'registrar@plsnhs.edu.ph', role: 'Registrar', status: 'Active' },
        { id: 3, name: 'Mrs. Santos', email: 'santos@plsnhs.edu.ph', role: 'Teacher', status: 'Active' },
        { id: 4, name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'Student', status: 'Active' }
    ]);

    const handleToggleStatus = (id) => {
        setAccounts(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' } : a));
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 950, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>User Account Management</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Manage roles, credentials, and access control</span>
                    </div>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>User Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(a => (
                                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{a.name}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{a.email}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#1E293B', fontWeight: 700, fontSize: 11 }}>
                                            {a.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: a.status === 'Active' ? '#d1fae5' : '#fee2e2', color: a.status === 'Active' ? '#065f46' : '#991b1b', fontSize: 11, fontWeight: 700 }}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <button onClick={() => handleToggleStatus(a.id)} style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #cbd5e1', background: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                                            {a.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
