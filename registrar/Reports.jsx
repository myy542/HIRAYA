// registrar/Reports.jsx - Converted from registrar/reports.html & registrar/js/reports.js
import React from 'react';

export default function RegistrarReports() {
    const handleDownload = (reportType) => {
        alert(`Generating official ${reportType} report for SY 2026-2027... Download will start shortly.`);
    };

    return (
        <div style={{ padding: 30, background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: 850, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#1B2A4A', fontSize: 22 }}>Official School Reports</h2>
                        <span style={{ fontSize: 13, color: '#64748b' }}>Generate and export DepEd statistical reports</span>
                    </div>
                    <a href="/registrar/dashboard.html" style={{ textDecoration: 'none', color: '#1B2A4A', fontWeight: 600, fontSize: 13 }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                        <i className="fas fa-file-excel" style={{ fontSize: 28, color: '#10b981', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: 15 }}>SF1 - School Register</h4>
                        <p style={{ margin: '0 0 14px 0', color: '#64748b', fontSize: 12 }}>Masterlist of learner profile, address, and birth records.</p>
                        <button onClick={() => handleDownload('SF1 (School Register)')} style={{ width: '100%', padding: '8px 12px', background: '#1B2A4A', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                            Export SF1
                        </button>
                    </div>

                    <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                        <i className="fas fa-file-pdf" style={{ fontSize: 28, color: '#ef4444', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: 15 }}>SF2 - Daily Attendance</h4>
                        <p style={{ margin: '0 0 14px 0', color: '#64748b', fontSize: 12 }}>Monthly summary of attendance, absences, and dropouts.</p>
                        <button onClick={() => handleDownload('SF2 (Attendance)')} style={{ width: '100%', padding: '8px 12px', background: '#1B2A4A', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                            Export SF2
                        </button>
                    </div>

                    <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                        <i className="fas fa-chart-pie" style={{ fontSize: 28, color: '#4F46E5', marginBottom: 10 }}></i>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: 15 }}>Enrollment Breakdown</h4>
                        <p style={{ margin: '0 0 14px 0', color: '#64748b', fontSize: 12 }}>Demographic report by gender, grade level, and track.</p>
                        <button onClick={() => handleDownload('Enrollment Breakdown')} style={{ width: '100%', padding: '8px 12px', background: '#1B2A4A', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                            Export Breakdown
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
