// student/EnrollmentHistory.jsx - Converted from student/enrollment-history.html & student/js/enrollment-history.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase/config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function StudentEnrollmentHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(collection(db, 'enrollments'), where('userId', '==', user.uid));
                    const snap = await getDocs(q);
                    const list = [];
                    snap.forEach(d => list.push({ id: d.id, ...d.data() }));

                    list.sort((a, b) => {
                        const tA = a.createdAt?.seconds || 0;
                        const tB = b.createdAt?.seconds || 0;
                        return tB - tA;
                    });
                    setHistory(list);
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const sample = [
        { id: 'h1', schoolYear: '2026-2027', grade: 'Grade 7', strand: null, section: 'Diamond', status: 'Enrolled', date: 'August 15, 2026' }
    ];

    const displayList = history.length > 0 ? history : sample;

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Enrollment History</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Your past enrollment records at PLSNHS</span>
                    </div>
                    <a href="/student/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {displayList.map((item, idx) => (
                        <div key={item.id || idx} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>School Year {item.schoolYear || '2026-2027'}</span>
                                <h3 style={{ margin: '4px 0', fontSize: 18, color: '#1E293B' }}>{item.grade || 'Grade 7'} {item.strand ? `(${item.strand})` : ''}</h3>
                                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Section: {item.section || 'TBD'} • Status: {item.status}</p>
                            </div>
                            <div>
                                <span style={{ padding: '6px 14px', borderRadius: 20, background: item.status === 'Enrolled' || item.status === 'Approved' ? '#d1fae5' : '#fef3c7', color: item.status === 'Enrolled' || item.status === 'Approved' ? '#065f46' : '#92400e', fontWeight: 700, fontSize: 12 }}>
                                    {item.status || 'Pending'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
