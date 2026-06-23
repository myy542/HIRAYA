/**
 * Registrar Dashboard - Firebase Integration
 */

import { auth, db } from '../../firebase/config.js';
import { 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

(function() {
    'use strict';

    console.log('📊 Registrar Dashboard ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const adminName = document.getElementById('adminName');
    const avatarInitial = document.getElementById('avatarInitial');
    const logoutBtn = document.getElementById('logoutBtn');
    const currentDate = document.getElementById('currentDate');
    const alertContainer = document.getElementById('alertContainer');

    // Stats
    const totalEl = document.getElementById('totalEnrollments');
    const pendingEl = document.getElementById('pendingCount');
    const enrolledEl = document.getElementById('enrolledCount');
    const rejectedEl = document.getElementById('rejectedCount');

    // Notifications
    const notifBtn = document.getElementById('notificationBtn');
    const notifDropdown = document.getElementById('notificationDropdown');
    const notifList = document.getElementById('notificationList');
    const notifCount = document.getElementById('notifCount');
    const markAllBtn = document.getElementById('markAllReadBtn');

    // Recent
    const recentEnrollments = document.getElementById('recentEnrollments');
    const recentActivities = document.getElementById('recentActivities');

    // ============================================
    // SET CURRENT DATE
    // ============================================

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);

    // ============================================
    // AUTH STATE
    // ============================================

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('✅ User logged in:', user.email);
            const displayName = user.displayName || user.email || 'Registrar';
            adminName.textContent = displayName.split('@')[0];
            avatarInitial.textContent = displayName.charAt(0).toUpperCase();
            
            // Load dashboard data
            loadDashboardData();
            loadNotifications();
            loadRecentEnrollments();
            loadRecentActivities();
        } else {
            console.log('❌ User logged out - redirecting to login');
            window.location.href = '../auth/login.html';
        }
    });

    // ============================================
    // LOGOUT
    // ============================================

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = '../auth/login.html';
            }).catch((error) => {
                console.error('Logout error:', error);
            });
        });
    }

    // ============================================
    // LOAD DASHBOARD DATA
    // ============================================

    async function loadDashboardData() {
        try {
            const enrollmentsRef = collection(db, 'enrollments');
            const snapshot = await getDocs(enrollmentsRef);
            
            let total = 0;
            let pending = 0;
            let enrolled = 0;
            let rejected = 0;
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                total++;
                if (data.status === 'pending' || data.status === 'Pending') pending++;
                else if (data.status === 'enrolled' || data.status === 'Enrolled') enrolled++;
                else if (data.status === 'rejected' || data.status === 'Rejected') rejected++;
            });
            
            totalEl.textContent = total;
            pendingEl.textContent = pending;
            enrolledEl.textContent = enrolled;
            rejectedEl.textContent = rejected;
            
            console.log('📊 Dashboard stats loaded:', { total, pending, enrolled, rejected });
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            showAlert('Error loading dashboard data', 'error');
        }
    }

    // ============================================
    // LOAD NOTIFICATIONS
    // ============================================

    function loadNotifications() {
        const notifications = [
            { id: 1, type: 'update', title: '📢 New Enrollment Period Open', message: 'The enrollment period for SY 2026-2027 is now open. Please review pending applications.', time: '2 hours ago', read: false },
            { id: 2, type: 'reminder', title: '⏰ Pending Applications', message: 'You have 5 pending enrollment applications waiting for review.', time: '5 hours ago', read: false },
            { id: 3, type: 'action', title: '✅ Enrollment Approved', message: 'Student Juan Dela Cruz has been successfully enrolled in Grade 7.', time: '1 day ago', read: false },
            { id: 4, type: 'alert', title: '⚠️ Section Capacity Alert', message: 'Grade 7 - Narra section is almost full (42/45 students).', time: '2 days ago', read: true },
            { id: 5, type: 'message', title: '💬 Message from Admin', message: 'Please prepare the enrollment summary report for this week.', time: '3 days ago', read: true },
        ];
        
        renderNotifications(notifications);
        updateNotificationCount(notifications.filter(n => !n.read).length);
    }

    function renderNotifications(notifications) {
        if (notifications.length === 0) {
            notifList.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>No notifications yet</p>
                </div>
            `;
            return;
        }
        
        const icons = {
            update: 'fa-megaphone',
            action: 'fa-check-circle',
            reminder: 'fa-clock',
            alert: 'fa-exclamation-triangle',
            message: 'fa-envelope'
        };
        
        notifList.innerHTML = notifications.map(notif => `
            <div class="notif-item ${notif.read ? 'read' : 'unread'}" data-id="${notif.id}">
                <div class="notif-icon notif-${notif.type}">
                    <i class="fas ${icons[notif.type] || 'fa-bell'}"></i>
                </div>
                <div class="notif-content">
                    <div class="notif-title">${notif.title}</div>
                    <div class="notif-message">${notif.message}</div>
                    <div class="notif-time">${notif.time}</div>
                </div>
                ${!notif.read ? `<button class="mark-read-btn" data-id="${notif.id}"><i class="fas fa-check"></i></button>` : ''}
            </div>
        `).join('');
        
        // Mark as read functionality
        document.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.notif-item');
                item.classList.remove('unread');
                item.classList.add('read');
                this.remove();
                const unread = document.querySelectorAll('.notif-item.unread').length;
                updateNotificationCount(unread);
            });
        });
    }

    function updateNotificationCount(count) {
        if (count > 0) {
            notifCount.textContent = count;
            notifCount.style.display = 'flex';
        } else {
            notifCount.style.display = 'none';
        }
    }

    // ============================================
    // NOTIFICATION DROPDOWN
    // ============================================

    if (notifBtn) {
        notifBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', function(e) {
        if (notifDropdown && notifBtn) {
            if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                notifDropdown.classList.remove('show');
            }
        }
    });

    // Mark all as read
    if (markAllBtn) {
        markAllBtn.addEventListener('click', function() {
            document.querySelectorAll('.notif-item.unread').forEach(item => {
                item.classList.remove('unread');
                item.classList.add('read');
                const btn = item.querySelector('.mark-read-btn');
                if (btn) btn.remove();
            });
            updateNotificationCount(0);
        });
    }

    // ============================================
    // LOAD RECENT ENROLLMENTS
    // ============================================

    async function loadRecentEnrollments() {
        try {
            const enrollmentsRef = collection(db, 'enrollments');
            const q = query(enrollmentsRef, orderBy('createdAt', 'desc'), limit(5));
            const snapshot = await getDocs(q);
            
            if (snapshot.empty) {
                recentEnrollments.innerHTML = `
                    <div class="no-data">
                        <i class="fas fa-file-signature"></i>
                        <p>No recent enrollments</p>
                    </div>
                `;
                return;
            }
            
            const enrollments = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                enrollments.push({ id: doc.id, ...data });
            });
            
            recentEnrollments.innerHTML = enrollments.map(entry => `
                <div class="enrollment-item">
                    <div class="enrollment-avatar">${entry.name ? entry.name.charAt(0).toUpperCase() : 'S'}</div>
                    <div class="enrollment-info">
                        <h4>${entry.name || 'Unknown Student'}</h4>
                        <p>
                            <span>${entry.grade || 'N/A'}</span>
                            <span class="status-badge status-${(entry.status || 'pending').toLowerCase()}">
                                ${entry.status || 'Pending'}
                            </span>
                        </p>
                        <div class="activity-time">
                            <i class="far fa-calendar"></i>
                            ${entry.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading recent enrollments:', error);
        }
    }

    // ============================================
    // LOAD RECENT ACTIVITIES
    // ============================================

    async function loadRecentActivities() {
        try {
            const activities = [
                { type: 'enrollment', description: 'New enrollment from Juan Dela Cruz', time: '2 hours ago' },
                { type: 'status_change', description: 'Enrollment Approved for Maria Santos', time: '5 hours ago' },
                { type: 'enrollment', description: 'New enrollment from Pedro Reyes', time: '1 day ago' },
                { type: 'status_change', description: 'Enrollment Rejected for Ana Cruz', time: '2 days ago' },
                { type: 'enrollment', description: 'New enrollment from Jose Rizal', time: '3 days ago' },
            ];
            
            recentActivities.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-${activity.type === 'enrollment' ? 'user-plus' : 'sync-alt'}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">${activity.description}</div>
                        <div class="activity-time">
                            <i class="far fa-clock"></i>
                            ${activity.time}
                        </div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading recent activities:', error);
        }
    }

    // ============================================
    // SHOW ALERT
    // ============================================

    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        alertContainer.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }

    // ============================================
    // CHARTS
    // ============================================

    // Trends Chart
    const trendsCtx = document.getElementById('trendsChart');
    if (trendsCtx) {
        new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Pending',
                        data: [8, 12, 15, 10, 7, 5],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                    },
                    {
                        label: 'Enrolled',
                        data: [5, 8, 12, 18, 22, 28],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                    },
                    {
                        label: 'Rejected',
                        data: [2, 3, 4, 3, 2, 1],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 12,
                            font: { size: 11 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 5 }
                    }
                }
            }
        });
    }

    // Grade Distribution Chart
    const gradeCtx = document.getElementById('gradeChart');
    if (gradeCtx) {
        new Chart(gradeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
                datasets: [{
                    data: [45, 38, 42, 40, 35, 30],
                    backgroundColor: [
                        '#0b2b4a',
                        '#1a3d5f',
                        '#2a4f74',
                        '#3a6189',
                        '#4a739e',
                        '#5a85b3'
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 10,
                            font: { size: 11 }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }

    console.log('✅ Dashboard ready!');

})();