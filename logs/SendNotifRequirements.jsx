// logs/SendNotifRequirements.jsx - Converted from logs/send_notif_requirements.html
import React, { useState } from 'react';

export default function AdminSendNotifRequirements() {
    const [targetGroup, setTargetGroup] = useState('All Pending Students');
    const [subject, setSubject] = useState('Urgent: Incomplete Admission Requirements');
    const [message, setMessage] = useState('Please submit your PSA Birth Certificate and Report Card (Form 138) to finalize your enrollment.');

    const handleSend = (e) => {
        e.preventDefault();
        alert('📢 Notification broadcast successfully dispatched to all target recipients!');
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Send Notification Broadcast</h2>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <form onSubmit={handleSend}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Target Group</label>
                        <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
                            <option value="All Pending Students">All Pending Students</option>
                            <option value="Incomplete Documents">Students with Incomplete Documents</option>
                            <option value="All Enrolled">All Officially Enrolled</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Subject Title</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Message Content</label>
                        <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, fontFamily: 'inherit' }}></textarea>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        <i className="fas fa-paper-plane" style={{ marginRight: 6 }}></i> Send Broadcast Alert
                    </button>
                </form>
            </div>
        </div>
    );
}
