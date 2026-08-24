// student/Schedule.jsx - Converted from student/schedule.html & student/js/schedule.js
import React, { useState } from 'react';

export default function StudentSchedule() {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const scheduleData = {
        Monday: [
            { time: '07:30 AM - 08:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
            { time: '08:30 AM - 09:30 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
            { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess' },
            { time: '10:00 AM - 11:00 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
            { time: '11:00 AM - 12:00 PM', subject: 'Filipino', teacher: 'Mr. Garcia', room: 'Room 201', code: 'FIL-7' }
        ],
        Tuesday: [
            { time: '07:30 AM - 08:30 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
            { time: '08:30 AM - 09:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
            { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess' },
            { time: '10:00 AM - 11:00 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
            { time: '11:00 AM - 12:00 PM', subject: 'TLE', teacher: 'Mr. Villanueva', room: 'TLE Workshop', code: 'TLE-7' }
        ],
        Wednesday: [
            { time: '07:30 AM - 08:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
            { time: '08:30 AM - 09:30 AM', subject: 'Filipino', teacher: 'Mr. Garcia', room: 'Room 201', code: 'FIL-7' },
            { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess' },
            { time: '10:00 AM - 11:00 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
            { time: '11:00 AM - 12:00 PM', subject: 'Araling Panlipunan', teacher: 'Mrs. Bautista', room: 'Room 201', code: 'AP-7' }
        ],
        Thursday: [
            { time: '07:30 AM - 08:30 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
            { time: '08:30 AM - 09:30 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
            { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess' },
            { time: '10:00 AM - 11:00 AM', subject: 'MAPEH', teacher: 'Coach Ramirez', room: 'Gym', code: 'MAPEH-7' }
        ],
        Friday: [
            { time: '07:30 AM - 08:30 AM', subject: 'Homeroom Guidance', teacher: 'Mrs. Santos', room: 'Room 201', code: 'HR-7' },
            { time: '08:30 AM - 09:30 AM', subject: 'EsP', teacher: 'Mrs. Ramos', room: 'Room 201', code: 'ESP-7' },
            { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess' },
            { time: '10:00 AM - 11:30 AM', subject: 'Club Activities', teacher: 'Advisers', room: 'Campus', code: 'CLUB' }
        ]
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const currentClasses = scheduleData[selectedDay] || [];

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Class Schedule</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Grade 7 - Diamond • Room 201</span>
                    </div>
                    <a href="/student/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                {/* Day Selector */}
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

                {/* Classes Table / Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {currentClasses.map((c, i) => (
                        c.isBreak ? (
                            <div key={i} style={{ padding: '10px 16px', background: '#fef3c7', borderRadius: 8, color: '#92400e', fontWeight: 600, fontSize: 13 }}>
                                <i className="fas fa-coffee" style={{ marginRight: 8 }}></i> {c.time} • {c.label}
                            </div>
                        ) : (
                            <div key={i} style={{ background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', borderLeft: '4px solid #1B2A4A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{c.time}</div>
                                    <h4 style={{ margin: '4px 0', fontSize: 16, color: '#1E293B' }}>{c.subject}</h4>
                                    <span style={{ fontSize: 12, color: '#64748b' }}>Teacher: {c.teacher} • Location: {c.room}</span>
                                </div>
                                <span style={{ padding: '4px 8px', borderRadius: 6, background: '#f1f5f9', color: '#1B2A4A', fontWeight: 700, fontSize: 11 }}>
                                    {c.code}
                                </span>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
