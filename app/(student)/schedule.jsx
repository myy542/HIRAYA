// app/(student)/schedule.jsx - Student Class Schedule Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, shadows } from '../../src/theme';

export default function StudentScheduleScreen() {
  const [activeDay, setActiveDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const scheduleData = {
    Monday: [
      { time: '07:30 AM - 08:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
      { time: '08:30 AM - 09:30 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
      { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess / Morning Break' },
      { time: '10:00 AM - 11:00 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
      { time: '11:00 AM - 12:00 PM', subject: 'Filipino', teacher: 'Mr. Garcia', room: 'Room 201', code: 'FIL-7' },
      { time: '12:00 PM - 01:00 PM', isBreak: true, label: 'Lunch Break' },
      { time: '01:00 PM - 02:00 PM', subject: 'Araling Panlipunan (AP)', teacher: 'Mrs. Bautista', room: 'Room 201', code: 'AP-7' },
      { time: '02:00 PM - 03:00 PM', subject: 'MAPEH', teacher: 'Coach Ramirez', room: 'Gymnasium', code: 'MAPEH-7' },
    ],
    Tuesday: [
      { time: '07:30 AM - 08:30 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
      { time: '08:30 AM - 09:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
      { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess / Morning Break' },
      { time: '10:00 AM - 11:00 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
      { time: '11:00 AM - 12:00 PM', subject: 'TLE (Technology & Livelihood)', teacher: 'Mr. Villanueva', room: 'TLE Workshop', code: 'TLE-7' },
      { time: '12:00 PM - 01:00 PM', isBreak: true, label: 'Lunch Break' },
      { time: '01:00 PM - 02:00 PM', subject: 'Edukasyon sa Pagpapakatao (EsP)', teacher: 'Mrs. Ramos', room: 'Room 201', code: 'ESP-7' },
    ],
    Wednesday: [
      { time: '07:30 AM - 08:30 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
      { time: '08:30 AM - 09:30 AM', subject: 'Filipino', teacher: 'Mr. Garcia', room: 'Room 201', code: 'FIL-7' },
      { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess / Morning Break' },
      { time: '10:00 AM - 11:00 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
      { time: '11:00 AM - 12:00 PM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
      { time: '12:00 PM - 01:00 PM', isBreak: true, label: 'Lunch Break' },
      { time: '01:00 PM - 02:00 PM', subject: 'Araling Panlipunan (AP)', teacher: 'Mrs. Bautista', room: 'Room 201', code: 'AP-7' },
    ],
    Thursday: [
      { time: '07:30 AM - 08:30 AM', subject: 'Science', teacher: 'Mr. Dela Cruz', room: 'Science Lab 1', code: 'SCI-7' },
      { time: '08:30 AM - 09:30 AM', subject: 'English', teacher: 'Ms. Reyes', room: 'Room 201', code: 'ENG-7' },
      { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess / Morning Break' },
      { time: '10:00 AM - 11:00 AM', subject: 'Mathematics', teacher: 'Mrs. Santos', room: 'Room 201', code: 'MATH-7' },
      { time: '11:00 AM - 12:00 PM', subject: 'MAPEH', teacher: 'Coach Ramirez', room: 'Gymnasium', code: 'MAPEH-7' },
      { time: '12:00 PM - 01:00 PM', isBreak: true, label: 'Lunch Break' },
      { time: '01:00 PM - 02:00 PM', subject: 'TLE (Technology & Livelihood)', teacher: 'Mr. Villanueva', room: 'TLE Workshop', code: 'TLE-7' },
    ],
    Friday: [
      { time: '07:30 AM - 08:30 AM', subject: 'Homeroom Guidance', teacher: 'Mrs. Santos', room: 'Room 201', code: 'HR-7' },
      { time: '08:30 AM - 09:30 AM', subject: 'Filipino', teacher: 'Mr. Garcia', room: 'Room 201', code: 'FIL-7' },
      { time: '09:30 AM - 10:00 AM', isBreak: true, label: 'Recess / Morning Break' },
      { time: '10:00 AM - 11:00 AM', subject: 'Edukasyon sa Pagpapakatao (EsP)', teacher: 'Mrs. Ramos', room: 'Room 201', code: 'ESP-7' },
      { time: '11:00 AM - 12:00 PM', subject: 'Club / Extracurriculars', teacher: 'Faculty Staff', room: 'Campus Grounds', code: 'CLUB' },
    ],
  };

  const currentList = scheduleData[activeDay] || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Section Header Card */}
      <View style={[styles.sectionCard, shadows.sm]}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="people" size={24} color="#fff" />
          </View>
          <View style={styles.sectionTextWrap}>
            <Text style={styles.sectionName}>Grade 7 - Diamond</Text>
            <Text style={styles.sectionMeta}>Adviser: Mrs. Santos • Room 201</Text>
          </View>
        </View>
      </View>

      {/* Summary Badges */}
      <View style={styles.badgeRow}>
        <View style={styles.miniBadge}>
          <Ionicons name="book-outline" size={14} color={colors.primary} />
          <Text style={styles.miniBadgeText}>8 Subjects</Text>
        </View>
        <View style={styles.miniBadge}>
          <Ionicons name="person-outline" size={14} color={colors.primary} />
          <Text style={styles.miniBadgeText}>6 Teachers</Text>
        </View>
        <View style={styles.miniBadge}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.miniBadgeText}>28 hrs/wk</Text>
        </View>
      </View>

      {/* Day Selector Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysScroll}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayPill, activeDay === day && styles.dayPillActive]}
            onPress={() => setActiveDay(day)}
          >
            <Text style={[styles.dayPillText, activeDay === day && styles.dayPillTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Class Schedule Cards */}
      <Text style={styles.dayHeading}>{activeDay}'s Schedule</Text>

      <View style={styles.scheduleList}>
        {currentList.map((item, index) => {
          if (item.isBreak) {
            return (
              <View key={index} style={styles.breakCard}>
                <Ionicons name="cafe-outline" size={16} color={colors.warning} />
                <Text style={styles.breakText}>
                  {item.time} • {item.label}
                </Text>
              </View>
            );
          }

          return (
            <View key={index} style={[styles.classCard, shadows.sm]}>
              <View style={styles.timeIndicator}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <View style={styles.classMain}>
                <View style={styles.subjectRow}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <View style={styles.codePill}>
                    <Text style={styles.codePillText}>{item.code}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="person-outline" size={13} color={colors.textSecondary} />
                    <Text style={styles.metaText}>{item.teacher}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
                    <Text style={styles.metaText}>{item.room}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 30,
  },
  sectionCard: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTextWrap: {
    flex: 1,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  sectionMeta: {
    fontSize: 12,
    color: colors.border,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  miniBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  daysScroll: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: spacing.md,
  },
  dayPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayPillTextActive: {
    color: '#fff',
  },
  dayHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  scheduleList: {
    gap: 10,
  },
  breakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.warningLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  breakText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  classCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  timeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  classMain: {},
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  codePill: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  codePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
