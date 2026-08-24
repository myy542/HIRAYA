// student/Requirements.jsx - Converted from student/requirements.html & student/js/requirements.js
import React, { useState } from 'react';

export default function StudentRequirements() {
    const [requirements, setRequirements] = useState([
        { id: 1, name: 'PSA / NSO Birth Certificate', required: true, status: 'Submitted', file: 'juan_psa.pdf', date: '2026-06-12' },
        { id: 2, name: 'SF9 / Form 138 (Report Card)', required: true, status: 'Submitted', file: 'grade6_card.pdf', date: '2026-06-14' },
        { id: 3, name: 'Certificate of Good Moral Character', required: true, status: 'Pending', file: null, date: null },
        { id: 4, name: '2x2 ID Pictures (2 copies)', required: true, status: 'Submitted', file: '2x2_photo.jpg', date: '2026-06-15' },
        { id: 5, name: 'Barangay Residency Clearance', required: false, status: 'Pending', file: null, date: null }
    ]);

    const handleSimulateUpload = (id) => {
        setRequirements(prev => prev.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    status: 'Submitted',
                    file: `doc_${id}_${Date.now()}.pdf`,
                    date: new Date().toISOString().split('T')[0]
                };
            }
            return r;
        }));
        alert('File uploaded successfully!');
    };

    const submittedCount = requirements.filter(r => r.status === 'Submitted').length;
    const progress = Math.round((submittedCount / requirements.length) * 100);

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 850, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Document Requirements</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Track and upload your required admission documents</span>
                    </div>
                    <a href="/student/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                {/* Progress banner */}
                <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>
                        <span>Submission Progress</span>
                        <span>{progress}% ({submittedCount}/{requirements.length})</span>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#10b981' }}></div>
                    </div>
                </div>

                {/* List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {requirements.map(r => (
                        <div key={r.id} style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <h4 style={{ margin: 0, fontSize: 15, color: '#1e293b' }}>{r.name}</h4>
                                    {r.required && <span style={{ fontSize: 10, background: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>Required</span>}
                                </div>
                                {r.file ? (
                                    <span style={{ fontSize: 12, color: '#10b981', display: 'block', marginTop: 4 }}>
                                        <i className="fas fa-check-circle"></i> {r.file} (Submitted on {r.date})
                                    </span>
                                ) : (
                                    <span style={{ fontSize: 12, color: '#f59e0b', display: 'block', marginTop: 4 }}>
                                        <i className="fas fa-clock"></i> Pending submission
                                    </span>
                                )}
                            </div>

                            <div>
                                {r.status === 'Submitted' ? (
                                    <button onClick={() => handleSimulateUpload(r.id)} style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                        Re-upload
                                    </button>
                                ) : (
                                    <button onClick={() => handleSimulateUpload(r.id)} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#1B2A4A', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                                        <i className="fas fa-upload" style={{ marginRight: 6 }}></i> Upload
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
