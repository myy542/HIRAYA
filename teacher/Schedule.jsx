// teacher/Schedule.jsx - Converted from teacher/schedule.html & teacher/js/schedule.js
import React, { useState } from 'react';

export default function TeacherSchedule() {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const teachingSchedule = {
        Monday: [
            { time: '07:30 AM - 08:30 AM', section: 'Grade 7 - Diamond', subject: 'Mathematics', room: 'Room 201' },
            { time: '08:30 AM - 09:30 AM', section: 'Grade 8 - Ruby', subject: 'Mathematics', room: 'Room 203' },
            { time: '01:00 PM - 02:00 PM', section: 'Grade 9 - Emerald', subject: 'Advanced Algebra', room: 'Room 305' }
        ],
        Tuesday: [
            { time: '08:30 AM - 09:30 AM', section: 'Grade 7 - Diamond', subject: 'Mathematics', room: 'Room 201' },
            { time: '10:00 AM - 11:00 AM', section: 'Grade 8 - Ruby', subject: 'Mathematics', room: 'Room 203' }
        ],
        Wednesday: [
            { time: '07:30 AM - 08:30 AM', section: 'Grade 7 - Diamond', subject: 'Mathematics', room: 'Room 201' },
            { time: '01:00 PM - 02:00 PM', section: 'Grade 9 - Emerald', subject: 'Advanced Algebra', room: 'Room 305' }
        ],
        Thursday: [
            { time: '10:00 AM - 11:00 AM', section: 'Grade 7 - Diamond', subject: 'Mathematics', room: 'Room 201' },
            { time: '01:00 PM - 02:00 PM', section: 'Grade 8 - Ruby', subject: 'Mathematics', room: 'Room 203' }
        ],
        Friday: [
            { time: '07:30 AM - 08:30 AM', section: 'Grade 7 - Diamond', subject: 'Homeroom Guidance', room: 'Room 201' },
            { time: '10:00 AM - 12:00 PM', section: 'Faculty Meeting', subject: 'Department Collaboration', room: 'Faculty Lounge' }
        ]
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const currentList = teachingSchedule[selectedDay] || [];

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 850, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Teaching Schedule</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Faculty weekly timetable and load</span>
                    </div>
                    <a href="/teacher/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    {days.map(d => (
                        <button
                            key={d}
                            onClick={() => setSelectedDay(d)}
                            style={{
                                padding: '10px 18px',
                                borderRadius: 20,
                                border: selectedDay === d ? 'none' : '1px solid #cbd5e1',
                                background: selectedDay === d ? '#1B2A4A' : '#fff',
                                color: selectedDay === d ? '#fff' : '#475569',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {currentList.map((c, i) => (
                        <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{c.time}</span>
                                <h4 style={{ margin: '4px 0', fontSize: 16, color: '#1E293B' }}>{c.section}</h4>
                                <span style={{ fontSize: 12, color: '#64748b' }}>{c.subject} • {c.room}</span>
                            </div>
                            <span style={{ padding: '4px 10px', borderRadius: 6, background: '#d1fae5', color: '#065f46', fontWeight: 700, fontSize: 11 }}>
                                Active Class
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
