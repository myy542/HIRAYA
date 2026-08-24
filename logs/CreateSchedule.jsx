// logs/CreateSchedule.jsx - Converted from logs/create_schedule.html
import React, { useState } from 'react';

export default function AdminCreateSchedule() {
    const [section, setSection] = useState('Grade 7 - Diamond');
    const [subject, setSubject] = useState('Mathematics');
    const [teacher, setTeacher] = useState('Mrs. Santos');
    const [day, setDay] = useState('Monday');
    const [time, setTime] = useState('07:30 AM - 08:30 AM');
    const [room, setRoom] = useState('Room 201');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('✅ Timetable slot added successfully!');
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Create Schedule Slot</h2>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Section</label>
                        <select value={section} onChange={(e) => setSection(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="Grade 7 - Diamond">Grade 7 - Diamond</option>
                            <option value="Grade 8 - Ruby">Grade 8 - Ruby</option>
                            <option value="Grade 9 - Emerald">Grade 9 - Emerald</option>
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Subject</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Teacher</label>
                            <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Day</label>
                            <select value={day} onChange={(e) => setDay(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Time Range</label>
                            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Save Timetable Slot
                    </button>
                </form>
            </div>
        </div>
    );
}
