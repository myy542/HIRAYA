// registrar/Enrollments.jsx - Converted from registrar/enrollments.html & registrar/js/enrollments.js
import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase/config.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function RegistrarEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, 'enrollments', id), { status: newStatus });
            setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
            alert(`Application ${newStatus.toLowerCase()} successfully!`);
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    const filtered = enrollments.filter(e => {
        const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
        const matchesSearch = !searchTerm || (e.fullName && e.fullName.toLowerCase().includes(searchTerm.toLowerCase())) || (e.lrn && e.lrn.includes(searchTerm));
        return matchesStatus && matchesSearch;
    });

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Enrollment Management</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Review and approve student applications</span>
                    </div>
                    <a href="/registrar/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder="Search student by name or LRN..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, background: '#fff' }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Table */}
                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Student Name</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Grade Level</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Guardian Contact</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{item.fullName}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{item.grade} {item.strand ? `(${item.strand})` : ''}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{item.guardianContact || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 4, background: item.status === 'Enrolled' || item.status === 'Approved' ? '#d1fae5' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2', color: item.status === 'Enrolled' || item.status === 'Approved' ? '#065f46' : item.status === 'Pending' ? '#92400e' : '#991b1b', fontSize: 11, fontWeight: 700 }}>
                                            {item.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                            <button onClick={() => handleUpdateStatus(item.id, 'Approved')} style={{ padding: '4px 8px', borderRadius: 4, border: 'none', background: '#10b981', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                                                Approve
                                            </button>
                                            <button onClick={() => handleUpdateStatus(item.id, 'Rejected')} style={{ padding: '4px 8px', borderRadius: 4, border: 'none', background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                                                Reject
                                            </button>
                                        </div>
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
