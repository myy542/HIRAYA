// logs/AddAccount.jsx - Converted from logs/add_account.html
import React, { useState } from 'react';
import { db } from '../src/firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminAddAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Student');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'users'), {
                fullName: name,
                email,
                role,
                status: 'Active',
                createdAt: serverTimestamp()
            });
            alert('✅ Account created successfully!');
            window.location.href = '/logs/manage_accounts.html';
        } catch (error) {
            console.error(error);
            alert('Failed to add account');
        }
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Add New Account</h2>
                    <a href="/logs/manage_accounts.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Accounts
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>System Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="Admin">Admin</option>
                            <option value="Registrar">Registrar</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                            <option value="Parent">Parent</option>
                        </select>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Create User Account
                    </button>
                </form>
            </div>
        </div>
    );
}
