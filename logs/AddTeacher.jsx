// logs/AddTeacher.jsx - Converted from logs/add_teacher.html
import React, { useState } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminAddTeacher() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('Mathematics');
    const [advisory, setAdvisory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'teachers'), {
                name,
                email,
                department,
                advisory: advisory || 'None',
                createdAt: serverTimestamp()
            });
            alert('✅ Teacher account created successfully!');
            window.location.href = '/logs/teachers.html';
        } catch (error) {
            console.error(error);
            alert('Failed to add teacher');
        }
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Add Faculty Member</h2>
                    <a href="/logs/teachers.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to List
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
                        <input type="text" placeholder="e.g. Maria Santos" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Official Email</label>
                        <input type="email" placeholder="teacher@plsnhs.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Department</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                            <option value="Filipino">Filipino</option>
                            <option value="Social Studies">Social Studies (AP)</option>
                            <option value="MAPEH">MAPEH</option>
                            <option value="TLE/TVL">TLE / TVL</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Advisory Section (Optional)</label>
                        <input type="text" placeholder="e.g. Grade 7 - Diamond" value={advisory} onChange={(e) => setAdvisory(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Register Teacher
                    </button>
                </form>
            </div>
        </div>
    );
}
