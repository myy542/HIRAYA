// teacher/Classes.jsx - Converted from teacher/classes.html & teacher/js/classes.js
import React, { useState } from 'react';

export default function TeacherClasses() {
    const classes = [
        { id: 1, grade: 'Grade 7', section: 'Diamond', subject: 'Mathematics', room: 'Room 201', students: 45, schedule: 'MWF 7:30 AM - 8:30 AM' },
        { id: 2, grade: 'Grade 8', section: 'Ruby', subject: 'Mathematics', room: 'Room 203', students: 42, schedule: 'TTH 8:30 AM - 10:00 AM' },
        { id: 3, grade: 'Grade 9', section: 'Emerald', subject: 'Advanced Algebra', room: 'Room 305', students: 40, schedule: 'MWF 1:00 PM - 2:00 PM' }
    ];

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Assigned Classes</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Manage sections and view student rosters</span>
                    </div>
                    <a href="/teacher/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                    {classes.map(c => (
                        <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <h3 style={{ margin: 0, fontSize: 18, color: '#1B2A4A' }}>{c.grade} - {c.section}</h3>
                                <span style={{ padding: '3px 8px', borderRadius: 4, background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700 }}>
                                    {c.students} Students
                                </span>
                            </div>
                            <p style={{ margin: '0 0 6px 0', color: '#334155', fontWeight: 600, fontSize: 14 }}>{c.subject}</p>
                            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: 12 }}>
                                <i className="fas fa-clock" style={{ marginRight: 6 }}></i> {c.schedule}<br />
                                <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }}></i> {c.room}
                            </p>

                            <div style={{ display: 'flex', gap: 8 }}>
                                <a href={`/teacher/view-section.html?id=${c.id}`} style={{ flex: 1, textAlign: 'center', padding: '8px 12px', borderRadius: 6, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
                                    Roster
                                </a>
                                <a href={`/teacher/grades.html?section=${c.id}`} style={{ flex: 1, textAlign: 'center', padding: '8px 12px', borderRadius: 6, background: '#f1f5f9', color: '#1E293B', textDecoration: 'none', fontSize: 12, fontWeight: 600, border: '1px solid #cbd5e1' }}>
                                    Grades
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
