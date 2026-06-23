/**
 * Student Schedule - Firebase Integration
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
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

(function() {
    'use strict';

    console.log('📅 Schedule page ready');

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const studentName = document.getElementById('studentName');
    const studentInitial = document.getElementById('studentInitial');
    const logoutBtn = document.getElementById('logoutBtn');

    // Section info
    const sectionName = document.getElementById('sectionName');
    const gradeDisplay = document.getElementById('gradeDisplay');
    const schoolYearDisplay = document.getElementById('schoolYearDisplay');

    // Stats
    const totalClasses = document.getElementById('totalClasses');
    const totalSubjects = document.getElementById('totalSubjects');
    const totalTeachers = document.getElementById('totalTeachers');
    const freePeriods = document.getElementById('freePeriods');

    // Today's classes
    const todayClasses = document.getElementById('todayClasses');
    const todayName = document.getElementById('todayName');

    // Schedule table
    const scheduleBody = document.getElementById('scheduleBody');
    const timeSlotsHeader = document.getElementById('timeSlotsHeader');

    // Summary
    const subjectsList = document.getElementById('subjectsList');
    const teachersList = document.getElementById('teachersList');
    const sectionInfo = document.getElementById('sectionInfo');

    // Alert container
    const alertContainer = document.getElementById('alertContainer');

    // ============================================
    // STATE
    // ============================================

    let currentUser = null;
    let currentEnrollment = null;
    let schedules = [];
    let timeSlots = [];
    let daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let weeklySchedule = {};
    let uniqueSubjects = {};
    let uniqueTeachers = {};

    // ============================================
    // AUTH STATE
    // ============================================

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            console.log('✅ User logged in:', user.email);
            const displayName = user.displayName || user.email || 'Student';
            const firstName = displayName.split('@')[0];
            studentName.textContent = firstName;
            studentInitial.textContent = firstName.charAt(0).toUpperCase();
            
            // Load schedule data
            await loadScheduleData(user.uid);
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
                showAlert('❌ Error logging out: ' + error.message, 'error');
            });
        });
    }

    // ============================================
    // LOAD SCHEDULE DATA
    // ============================================

    async function loadScheduleData(userId) {
        try {
            // Get current enrollment
            const enrollmentsRef = collection(db, 'enrollments');
            const q = query(
                enrollmentsRef, 
                where('userId', '==', userId), 
                where('status', 'in', ['Enrolled', 'Approved']),
                orderBy('createdAt', 'desc'),
                limit(1)
            );
            const snapshot = await getDocs(q);
            
            if (snapshot.empty) {
                showAlert('⚠️ No enrollment found. Please enroll first.', 'error');
                document.querySelector('.schedule-container').style.display = 'none';
                return;
            }

            const doc = snapshot.docs[0];
            currentEnrollment = { id: doc.id, ...doc.data() };
            console.log('📚 Enrollment data loaded:', currentEnrollment);

            // Load time slots
            await loadTimeSlots();

            // Load schedules based on section
            if (currentEnrollment.sectionId) {
                await loadSchedules(currentEnrollment.sectionId);
            } else {
                showAlert('⚠️ No section assigned yet.', 'warning');
            }

            // Update UI
            updateUI();

        } catch (error) {
            console.error('Error loading schedule data:', error);
            showAlert('❌ Error loading schedule: ' + error.message, 'error');
        }
    }

    // ============================================
    // LOAD TIME SLOTS
    // ============================================

    async function loadTimeSlots() {
        try {
            const timeSlotsRef = collection(db, 'timeSlots');
            const q = query(timeSlotsRef, orderBy('startTime', 'asc'));
            const snapshot = await getDocs(q);
            
            timeSlots = [];
            snapshot.forEach((doc) => {
                timeSlots.push({ id: doc.id, ...doc.data() });
            });
            
            console.log('⏰ Time slots loaded:', timeSlots.length);
        } catch (error) {
            console.error('Error loading time slots:', error);
            // Use default time slots if none exist
            timeSlots = [
                { id: '1', startTime: '07:30', endTime: '08:30', slotName: '1st Period' },
                { id: '2', startTime: '08:30', endTime: '09:30', slotName: '2nd Period' },
                { id: '3', startTime: '09:30', endTime: '10:30', slotName: '3rd Period' },
                { id: '4', startTime: '10:30', endTime: '11:30', slotName: '4th Period' },
                { id: '5', startTime: '13:00', endTime: '14:00', slotName: '5th Period' },
                { id: '6', startTime: '14:00', endTime: '15:00', slotName: '6th Period' },
                { id: '7', startTime: '15:00', endTime: '16:00', slotName: '7th Period' },
            ];
        }
    }

    // ============================================
    // LOAD SCHEDULES
    // ============================================

    async function loadSchedules(sectionId) {
        try {
            const schedulesRef = collection(db, 'classSchedules');
            const q = query(
                schedulesRef,
                where('sectionId', '==', sectionId),
                where('status', '==', 'active')
            );
            const snapshot = await getDocs(q);
            
            schedules = [];
            snapshot.forEach((doc) => {
                schedules.push({ id: doc.id, ...doc.data() });
            });
            
            console.log('📋 Schedules loaded:', schedules.length);
            
            // Organize schedules by day and time slot
            organizeSchedules();
            
        } catch (error) {
            console.error('Error loading schedules:', error);
            schedules = [];
        }
    }

    // ============================================
    // ORGANIZE SCHEDULES
    // ============================================

    function organizeSchedules() {
        weeklySchedule = {};
        uniqueSubjects = {};
        uniqueTeachers = {};
        let totalClassesCount = 0;

        // Initialize weekly schedule structure
        daysOrder.forEach(day => {
            weeklySchedule[day] = {};
            timeSlots.forEach(slot => {
                weeklySchedule[day][slot.id] = null;
            });
        });

        // Populate schedules
        schedules.forEach(schedule => {
            const day = schedule.dayName || schedule.day;
            const timeSlotId = schedule.timeSlotId;
            const subjectName = schedule.subjectName || 'Unknown Subject';
            const teacherName = schedule.teacherName || 'Unknown Teacher';
            
            if (day && timeSlotId) {
                weeklySchedule[day][timeSlotId] = {
                    subjectName: subjectName,
                    subjectId: schedule.subjectId,
                    teacherName: teacherName,
                    teacherId: schedule.teacherId,
                    room: schedule.room || 'N/A',
                    startTime: schedule.startTime || 'N/A',
                    endTime: schedule.endTime || 'N/A',
                    color: schedule.color || '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
                };
                
                totalClassesCount++;
                
                // Track unique subjects
                if (schedule.subjectId) {
                    uniqueSubjects[schedule.subjectId] = subjectName;
                }
                
                // Track unique teachers
                if (schedule.teacherId) {
                    uniqueTeachers[schedule.teacherId] = teacherName;
                }
            }
        });

        // Calculate stats
        const totalTimeSlots = timeSlots.length * daysOrder.length;
        const freePeriodsCount = totalTimeSlots - totalClassesCount;

        // Update stats
        totalClasses.textContent = totalClassesCount;
        totalSubjects.textContent = Object.keys(uniqueSubjects).length;
        totalTeachers.textContent = Object.keys(uniqueTeachers).length;
        freePeriods.textContent = freePeriodsCount;

        // Update section info
        sectionName.textContent = currentEnrollment.section || 'Not Assigned';
        gradeDisplay.textContent = currentEnrollment.grade || 'N/A';
        schoolYearDisplay.textContent = currentEnrollment.schoolYear || 'N/A';

        // Update today's classes
        updateTodayClasses();

        // Render schedule table
        renderScheduleTable();

        // Update summary
        updateSummary();
    }

    // ============================================
    // UPDATE TODAY'S CLASSES
    // ============================================

    function updateTodayClasses() {
        const today = new Date();
        const todayNameStr = today.toLocaleDateString('en-US', { weekday: 'long' });
        const todayNameEl = document.getElementById('todayName');
        if (todayNameEl) todayNameEl.textContent = todayNameStr;

        const todaySchedule = weeklySchedule[todayNameStr] || {};
        const todayItems = Object.values(todaySchedule).filter(item => item !== null);

        if (todayItems.length === 0) {
            todayClasses.innerHTML = `
                <div style="color: var(--gray-400); font-size: 0.9rem; padding: 0.5rem 0;">
                    <i class="fas fa-coffee"></i> No classes for today.
                </div>
            `;
            return;
        }

        todayClasses.innerHTML = todayItems.map(item => `
            <div class="today-class-item">
                <i class="fas fa-book"></i>
                <span>${item.subjectName}</span>
                <span class="time"><i class="far fa-clock"></i> ${item.startTime}</span>
                <span class="room"><i class="fas fa-door-open"></i> ${item.room}</span>
            </div>
        `).join('');
    }

    // ============================================
    // RENDER SCHEDULE TABLE
    // ============================================

    function renderScheduleTable() {
        if (!scheduleBody) return;

        const today = new Date();
        const todayName = today.toLocaleDateString('en-US', { weekday: 'long' });

        // Render table rows
        scheduleBody.innerHTML = timeSlots.map(slot => {
            const startTime = slot.startTime || 'N/A';
            const endTime = slot.endTime || 'N/A';
            const slotName = slot.slotName || '';

            const timeDisplay = `${formatTime(startTime)} - ${formatTime(endTime)}`;

            return `
                <tr>
                    <td class="time-column">
                        <strong>${formatTime(startTime)}</strong>
                        ${slotName ? `<small class="slot-name">${slotName}</small>` : ''}
                        <br>
                        <span>${formatTime(endTime)}</span>
                    </td>
                    ${daysOrder.map(day => {
                        const isToday = day === todayName;
                        const classData = weeklySchedule[day]?.[slot.id] || null;
                        const isTodayClass = isToday && classData !== null;

                        if (classData) {
                            return `
                                <td class="${isToday ? 'today-highlight' : ''}">
                                    <div class="class-item" style="border-left-color: ${classData.color || 'var(--primary)'};">
                                        <div class="subject-name">${classData.subjectName}</div>
                                        <div class="teacher-name">
                                            <i class="fas fa-chalkboard-user"></i>
                                            ${classData.teacherName}
                                        </div>
                                        ${classData.room && classData.room !== 'N/A' ? `
                                            <div class="room">
                                                <i class="fas fa-door-open"></i>
                                                ${classData.room}
                                            </div>
                                        ` : ''}
                                    </div>
                                </td>
                            `;
                        } else {
                            return `
                                <td class="${isToday ? 'today-highlight' : ''}">
                                    <div class="empty-cell">
                                        <i class="fas fa-minus-circle"></i>
                                        <span>Free</span>
                                    </div>
                                </td>
                            `;
                        }
                    }).join('')}
                </tr>
            `;
        }).join('');
    }

    // ============================================
    // UPDATE SUMMARY
    // ============================================

    function updateSummary() {
        // Subjects
        const subjectsArray = Object.values(uniqueSubjects);
        if (subjectsList) {
            if (subjectsArray.length === 0) {
                subjectsList.innerHTML = `<div class="no-data-message"><i class="fas fa-info-circle"></i> No subjects assigned</div>`;
            } else {
                subjectsList.innerHTML = subjectsArray.map(subject => `
                    <span class="summary-tag">
                        <i class="fas fa-book-open"></i>
                        ${subject}
                    </span>
                `).join('');
            }
        }

        // Teachers
        const teachersArray = Object.values(uniqueTeachers);
        if (teachersList) {
            if (teachersArray.length === 0) {
                teachersList.innerHTML = `<div class="no-data-message"><i class="fas fa-info-circle"></i> No teachers assigned</div>`;
            } else {
                teachersList.innerHTML = teachersArray.map(teacher => `
                    <span class="summary-tag">
                        <i class="fas fa-user"></i>
                        ${teacher}
                    </span>
                `).join('');
            }
        }

        // Section info
        if (sectionInfo) {
            sectionInfo.innerHTML = `
                <div class="info-row">
                    <i class="fas fa-layer-group"></i>
                    <strong>Grade Level:</strong> ${currentEnrollment.grade || 'N/A'}
                </div>
                <div class="info-row">
                    <i class="fas fa-calendar-alt"></i>
                    <strong>School Year:</strong> ${currentEnrollment.schoolYear || 'N/A'}
                </div>
                <div class="info-row">
                    <i class="fas fa-clock"></i>
                    <strong>Total Classes:</strong> ${totalClasses.textContent} per week
                </div>
            `;
        }
    }

    // ============================================
    // HELPERS
    // ============================================

    function formatTime(timeStr) {
        if (!timeStr || timeStr === 'N/A') return 'N/A';
        try {
            const [hours, minutes] = timeStr.split(':');
            const h = parseInt(hours);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${minutes} ${ampm}`;
        } catch {
            return timeStr;
        }
    }

    // ============================================
    // SET CURRENT DATE
    // ============================================

    const dateBadge = document.querySelector('.date-badge');
    if (dateBadge) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateBadge.innerHTML = `<i class="fas fa-calendar-alt"></i> ${now.toLocaleDateString('en-US', options)}`;
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

    console.log('✅ Schedule page ready!');

})();