// logs/Enrollments.jsx - Converted from logs/enrollments.html
import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminEnrollments() {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const snap = await getDocs(collection(db, 'enrollments'));
                const list = [];
                snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                setEnrollments(list);
            } catch (e) {
                console.error(e);
            }
        };
        fetchEnrollments();
    }, []);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>All Enrollment Applications</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Complete log of school admission requests</span>
                    </div>
                    <a href="/logs/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Applicant Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade Level</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(enrollments.length > 0 ? enrollments : [
                                { id: '1', fullName: 'Juan Dela Cruz', grade: 'Grade 7', studentType: 'New', status: 'Enrolled' }
                            ]).map((e, idx) => (
                                <tr key={e.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{e.fullName}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{e.grade} {e.strand ? `(${e.strand})` : ''}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{e.studentType || 'New'}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: e.status === 'Enrolled' || e.status === 'Approved' ? '#d1fae5' : '#fef3c7', color: e.status === 'Enrolled' || e.status === 'Approved' ? '#065f46' : '#92400e', fontSize: 11, fontWeight: 700 }}>
                                            {e.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <a href={`/logs/view_enrollment.html?id=${e.id}`} style={{ padding: '4px 10px', borderRadius: 4, background: '#1B2A4A', color: '#fff', textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
                                            View
                                        </a>
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
