/**
 * Registrar Dashboard - Interactive JavaScript
 */

(function() {
    'use strict';

    console.log('📚 Registrar Dashboard ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const adminName = document.getElementById('adminName');
    const adminInitial = document.getElementById('adminInitial');
    const logoutBtn = document.getElementById('logoutBtn');
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationList = document.getElementById('notificationList');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notifCount = document.getElementById('notifCount');
    const alertContainer = document.getElementById('alertContainer');

    // ============================================
    // SET DATE
    // ============================================

    const dateBadge = document.getElementById('dateBadge');
    if (dateBadge) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateBadge.innerHTML = `<i class="fas fa-calendar-alt"></i> ${now.toLocaleDateString('en-US', options)}`;
    }

    // ============================================
    // SET ADMIN NAME
    // ============================================

    // Get name from localStorage or use default
    const storedName = localStorage.getItem('registrarName') || 'Registrar';
    adminName.textContent = storedName;
    adminInitial.textContent = storedName.charAt(0).toUpperCase();

    // ============================================
    // LOGOUT
    // ============================================

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear any stored session data
            localStorage.removeItem('registrarName');
            // Redirect to login
            window.location.href = '../auth/login.html';
        });
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================

    // Sample notifications data
    const sampleNotifications = [
        {
            id: 1,
            type: 'update',
            title: '📢 New Enrollment Period Open',
            message: 'The enrollment period for SY 2026-2027 is now open. Please review pending applications.',
            time: new Date(Date.now() - 3600000).toISOString(),
            isRead: false
        },
        {
            id: 2,
            type: 'action',
            title: '✅ Enrollment Approved',
            message: 'Student John Santos has been successfully enrolled in Grade 7.',
            time: new Date(Date.now() - 7200000).toISOString(),
            isRead: false
        },
        {
            id: 3,
            type: 'reminder',
            title: '⏰ Pending Applications',
            message: 'You have 5 pending enrollment applications waiting for review.',
            time: new Date(Date.now() - 14400000).toISOString(),
            isRead: false
        },
        {
            id: 4,
            type: 'alert',
            title: '⚠️ Section Capacity Alert',
            message: 'Grade 7 - Narra section is almost full (42/45 students).',
            time: new Date(Date.now() - 86400000).toISOString(),
            isRead: true
        },
        {
            id: 5,
            type: 'message',
            title: '💬 Message from Admin',
            message: 'Please prepare the enrollment summary report for this week.',
            time: new Date(Date.now() - 172800000).toISOString(),
            isRead: true
        }
    ];

    let notifications = [];
    let unreadCount = 0;

    // Load notifications from localStorage or use samples
    function loadNotifications() {
        const stored = localStorage.getItem('registrarNotifications');
        if (stored) {
            try {
                notifications = JSON.parse(stored);
            } catch {
                notifications = [...sampleNotifications];
            }
        } else {
            notifications = [...sampleNotifications];
            localStorage.setItem('registrarNotifications', JSON.stringify(notifications));
        }
        updateUnreadCount();
        renderNotifications();
        updateBadge();
    }

    function updateUnreadCount() {
        unreadCount = notifications.filter(n => !n.isRead).length;
    }

    function updateBadge() {
        if (notifCount) {
            if (unreadCount > 0) {
                notifCount.textContent = unreadCount;
                notifCount.style.display = 'flex';
            } else {
                notifCount.style.display = 'none';
            }
        }
    }

    function renderNotifications() {
        if (!notificationList) return;

        if (notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>No notifications yet</p>
                </div>
            `;
            return;
        }

        const typeIcons = {
            update: 'fa-megaphone',
            action: 'fa-check-circle',
            reminder: 'fa-clock',
            alert: 'fa-exclamation-triangle',
            message: 'fa-envelope'
        };

        notificationList.innerHTML = notifications.map(notif => `
            <div class="notif-item ${notif.isRead ? 'read' : 'unread'}" data-id="${notif.id}">
                <div class="notif-icon notif-${notif.type}">
                    <i class="fas ${typeIcons[notif.type] || 'fa-bell'}"></i>
                </div>
                <div class="notif-content">
                    <div class="notif-title">${notif.title}</div>
                    <div class="notif-message">${notif.message}</div>
                    <div class="notif-time">${formatTime(notif.time)}</div>
                </div>
                ${!notif.isRead ? `
                    <button class="mark-read-btn" data-id="${notif.id}">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
            </div>
        `).join('');

        // Add event listeners to mark read buttons
        document.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                markAsRead(id);
            });
        });

        // Add click event to notification items
        document.querySelectorAll('.notif-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const notif = notifications.find(n => n.id === id);
                if (notif && !notif.isRead) {
                    markAsRead(id);
                }
            });
        });
    }

    function markAsRead(id) {
        const notif = notifications.find(n => n.id === id);
        if (notif && !notif.isRead) {
            notif.isRead = true;
            localStorage.setItem('registrarNotifications', JSON.stringify(notifications));
            updateUnreadCount();
            updateBadge();
            renderNotifications();
        }
    }

    function markAllAsRead() {
        notifications.forEach(n => n.isRead = true);
        localStorage.setItem('registrarNotifications', JSON.stringify(notifications));
        updateUnreadCount();
        updateBadge();
        renderNotifications();
        showAlert('✅ All notifications marked as read', 'success');
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
               ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Toggle notification dropdown
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (notificationDropdown && notificationBtn) {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        }
    });

    // Mark all as read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            markAllAsRead();
        });
    }

    // ============================================
    // ALERT SYSTEM
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

    function initCharts() {
        // Enrollment Trends Chart
        const trendsCtx = document.getElementById('trendsChart');
        if (trendsCtx) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Pending',
                            data: [5, 8, 12, 7, 10, 6],
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Enrolled',
                            data: [15, 22, 18, 25, 30, 28],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Rejected',
                            data: [2, 3, 1, 4, 2, 1],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 10
                            }
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
                        data: [35, 28, 30, 25, 20, 15],
                        backgroundColor: [
                            '#0b2b4a',
                            '#1a3d5f',
                            '#2a4f74',
                            '#3a6189',
                            '#4a739e',
                            '#5a85b3'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    }

    // ============================================
    // RENDER RECENT ENROLLMENTS
    // ============================================

    function renderRecentEnrollments() {
        const container = document.getElementById('recentEnrollments');
        if (!container) return;

        const enrollments = [
            { name: 'Maria Santos', grade: 'Grade 7', status: 'Enrolled', date: new Date(Date.now() - 3600000) },
            { name: 'Juan Dela Cruz', grade: 'Grade 10', status: 'Pending', date: new Date(Date.now() - 7200000) },
            { name: 'Ana Reyes', grade: 'Grade 8', status: 'Enrolled', date: new Date(Date.now() - 14400000) },
            { name: 'Pedro Lopez', grade: 'Grade 11', status: 'Pending', date: new Date(Date.now() - 28800000) },
            { name: 'Elena Gomez', grade: 'Grade 9', status: 'Enrolled', date: new Date(Date.now() - 86400000) }
        ];

        if (enrollments.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-file-signature"></i>
                    <p>No recent enrollments</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="enrollment-list">
                ${enrollments.map(e => `
                    <div class="enrollment-item">
                        <div class="enrollment-avatar">${e.name.charAt(0)}</div>
                        <div class="enrollment-info">
                            <h4>${e.name}</h4>
                            <p>
                                <span>${e.grade}</span>
                                <span class="status-badge status-${e.status.toLowerCase()}">${e.status}</span>
                            </p>
                            <div class="activity-time">
                                <i class="far fa-calendar"></i>
                                ${e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ============================================
    // RENDER RECENT ACTIVITIES
    // ============================================

    function renderRecentActivities() {
        const container = document.getElementById('recentActivities');
        if (!container) return;

        const activities = [
            { description: 'New enrollment from Maria Santos', time: new Date(Date.now() - 3600000) },
            { description: 'Enrollment Enrolled for Juan Dela Cruz', time: new Date(Date.now() - 7200000) },
            { description: 'Section "Mahogany" created for Grade 10', time: new Date(Date.now() - 14400000) },
            { description: 'Enrollment Pending for Ana Reyes', time: new Date(Date.now() - 28800000) },
            { description: 'Student records updated for Pedro Lopez', time: new Date(Date.now() - 86400000) }
        ];

        if (activities.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-bell-slash"></i>
                    <p>No recent activities</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="activity-list">
                ${activities.map(a => `
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-sync-alt"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-text">${a.description}</div>
                            <div class="activity-time">
                                <i class="far fa-clock"></i>
                                ${a.time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                ${a.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ============================================
    // UPDATE STATS
    // ============================================

    function updateStats() {
        const totalEnrollments = document.getElementById('totalEnrollments');
        const pendingCount = document.getElementById('pendingCount');
        const enrolledCount = document.getElementById('enrolledCount');
        const rejectedCount = document.getElementById('rejectedCount');

        if (totalEnrollments) totalEnrollments.textContent = '42';
        if (pendingCount) pendingCount.textContent = '6';
        if (enrolledCount) enrolledCount.textContent = '28';
        if (rejectedCount) rejectedCount.textContent = '8';
    }

    // ============================================
    // INITIALIZE
    // ============================================

    loadNotifications();
    initCharts();
    renderRecentEnrollments();
    renderRecentActivities();
    updateStats();

    // Auto-hide alerts after 5 seconds
    setTimeout(() => {
        document.querySelectorAll('.alert').forEach(alert => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        });
    }, 5000);

    // Notification count refresh every 30 seconds
    setInterval(() => {
        // In a real app, you'd fetch from server
        // For demo, just reload from localStorage
        loadNotifications();
    }, 30000);

    console.log('✅ Registrar Dashboard ready!');

})();