// logs/CreateSection.jsx - Converted from logs/create_section.html
import React, { useState } from 'react';
import { db } from '../src/firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminCreateSection() {
    const [grade, setGrade] = useState('Grade 7');
    const [name, setName] = useState('');
    const [adviser, setAdviser] = useState('');
    const [room, setRoom] = useState('');
    const [maxStudents, setMaxStudents] = useState(45);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'sections'), {
                grade,
                name,
                adviser,
                room,
                maxStudents: parseInt(maxStudents) || 45,
                createdAt: serverTimestamp()
            });
            alert('✅ Section created successfully!');
            window.location.href = '/logs/sections.html';
        } catch (err) {
            console.error(err);
            alert('Failed to create section');
        }
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Create Section</h2>
                    <a href="/logs/sections.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Sections
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Grade Level</label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="Grade 7">Grade 7</option>
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Section Name</label>
                        <input type="text" placeholder="e.g. Diamond, Ruby, Emerald" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Adviser Name</label>
                        <input type="text" placeholder="e.g. Mrs. Santos" value={adviser} onChange={(e) => setAdviser(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Room Number</label>
                            <input type="text" placeholder="e.g. Room 201" value={room} onChange={(e) => setRoom(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Capacity</label>
                            <input type="number" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Save Section
                    </button>
                </form>
            </div>
        </div>
    );
}
