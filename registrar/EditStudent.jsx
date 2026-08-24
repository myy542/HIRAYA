// registrar/EditStudent.jsx - Converted from registrar/edit_student.html & registrar/js/edit_student.js
import React, { useState } from 'react';

export default function RegistrarEditStudent() {
    const [formData, setFormData] = useState({
        lrn: '123456789012',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        grade: 'Grade 7',
        section: 'Diamond',
        contact: '09123456789'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Student record updated successfully!');
        window.location.href = '/registrar/students.html';
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 30, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Edit Student Info</h2>
                    <a href="/registrar/students.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to List
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>LRN</label>
                        <input type="text" value={formData.lrn} onChange={(e) => setFormData({ ...formData, lrn: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>First Name</label>
                            <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Last Name</label>
                            <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Grade</label>
                            <input type="text" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Section</label>
                            <input type="text" value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }} />
                        </div>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#1B2A4A', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
