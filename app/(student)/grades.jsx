// app/(student)/grades.jsx - Student Grades Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, shadows } from '../../src/theme';

export default function StudentGradesScreen() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: '1',
      name: 'Mathematics',
      teacher: 'Mrs. Santos',
      code: 'MATH-7',
      q1: 88,
      q2: 90,
      q3: 92,
      q4: 91,
      final: 90.25,
      status: 'Passed',
    },
    {
      id: '2',
      name: 'Science',
      teacher: 'Mr. Dela Cruz',
      code: 'SCI-7',
      q1: 85,
      q2: 87,
      q3: 89,
      q4: 90,
      final: 87.75,
      status: 'Passed',
    },
    {
      id: '3',
      name: 'English',
      teacher: 'Ms. Reyes',
      code: 'ENG-7',
      q1: 91,
      q2: 92,
      q3: 90,
      q4: 93,
      final: 91.5,
      status: 'Passed',
    },
    {
      id: '4',
      name: 'Filipino',
      teacher: 'Mr. Garcia',
      code: 'FIL-7',
      q1: 89,
      q2: 91,
      q3: 88,
      q4: 92,
      final: 90.0,
      status: 'Passed',
    },
    {
      id: '5',
      name: 'Araling Panlipunan (AP)',
      teacher: 'Mrs. Bautista',
      code: 'AP-7',
      q1: 87,
      q2: 89,
      q3: 91,
      q4: 90,
      final: 89.25,
      status: 'Passed',
    },
    {
      id: '6',
      name: 'MAPEH',
      teacher: 'Coach Ramirez',
      code: 'MAPEH-7',
      q1: 94,
      q2: 95,
      q3: 92,
      q4: 96,
      final: 94.25,
      status: 'Passed',
    },
    {
      id: '7',
      name: 'Technology & Livelihood (TLE)',
      teacher: 'Mr. Villanueva',
      code: 'TLE-7',
      q1: 86,
      q2: 88,
      q3: 90,
      q4: 89,
      final: 88.25,
      status: 'Passed',
    },
    {
      id: '8',
      name: 'Edukasyon sa Pagpapakatao (EsP)',
      teacher: 'Mrs. Ramos',
      code: 'ESP-7',
      q1: 92,
      q2: 94,
      q3: 95,
      q4: 93,
      final: 93.5,
      status: 'Passed',
    },
  ];

  const overallAverage = (
    subjects.reduce((sum, s) => sum + s.final, 0) / subjects.length
  ).toFixed(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Top Academic Summary Card */}
      <View style={[styles.academicCard, shadows.md]}>
        <View style={styles.academicHeader}>
          <View>
            <Text style={styles.gradeTitle}>Grade 7 - Diamond</Text>
            <Text style={styles.schoolYearText}>School Year 2026-2027</Text>
          </View>
          <View style={styles.gpaBadge}>
            <Text style={styles.gpaLabel}>General Average</Text>
            <Text style={styles.gpaValue}>{overallAverage}%</Text>
          </View>
        </View>

        <View style={styles.standingRow}>
          <View style={styles.standingItem}>
            <Ionicons name="ribbon" size={16} color={colors.accent} />
            <Text style={styles.standingText}>Academic Standing: With Honors</Text>
          </View>
          <View style={styles.standingItem}>
            <Ionicons name="checkmark-done" size={16} color={colors.success} />
            <Text style={styles.standingText}>Status: Eligible for Promotion</Text>
          </View>
        </View>
      </View>

      {/* Subjects Header */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.listTitle}>Enrolled Subjects ({subjects.length})</Text>
        <Text style={styles.listTip}>Tap card for breakdown</Text>
      </View>

      {/* Subject Grades List */}
      <View style={styles.subjectList}>
        {subjects.map((sub) => (
          <TouchableOpacity
            key={sub.id}
            style={[styles.subjectCard, shadows.sm]}
            onPress={() => setSelectedSubject(sub)}
          >
            <View style={styles.subjectHeader}>
              <View style={styles.titleWrap}>
                <Text style={styles.subjectName}>{sub.name}</Text>
                <Text style={styles.teacherName}>{sub.teacher}</Text>
              </View>
              <View style={styles.finalGradeBadge}>
                <Text style={styles.finalGradeVal}>{sub.final}</Text>
                <Text style={styles.finalGradeLabel}>Final</Text>
              </View>
            </View>

            {/* Quarter Pills */}
            <View style={styles.quartersRow}>
              <View style={styles.quarterBox}>
                <Text style={styles.quarterLabel}>Q1</Text>
                <Text style={styles.quarterVal}>{sub.q1}</Text>
              </View>
              <View style={styles.quarterBox}>
                <Text style={styles.quarterLabel}>Q2</Text>
                <Text style={styles.quarterVal}>{sub.q2}</Text>
              </View>
              <View style={styles.quarterBox}>
                <Text style={styles.quarterLabel}>Q3</Text>
                <Text style={styles.quarterVal}>{sub.q3}</Text>
              </View>
              <View style={styles.quarterBox}>
                <Text style={styles.quarterLabel}>Q4</Text>
                <Text style={styles.quarterVal}>{sub.q4}</Text>
              </View>
              <View style={[styles.quarterBox, { backgroundColor: colors.successLight }]}>
                <Text style={[styles.quarterLabel, { color: colors.success }]}>Status</Text>
                <Text style={[styles.quarterVal, { color: colors.success, fontSize: 11 }]}>Passed</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Detailed Modal */}
      {selectedSubject && (
        <Modal
          visible={!!selectedSubject}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedSubject(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, shadows.lg]}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>{selectedSubject.name}</Text>
                  <Text style={styles.modalSub}>{selectedSubject.teacher} • {selectedSubject.code}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedSubject(null)}>
                  <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.gradeGridModal}>
                  <View style={styles.modalGradeItem}>
                    <Text style={styles.mQuarter}>1st Quarter</Text>
                    <Text style={styles.mScore}>{selectedSubject.q1}</Text>
                    <Text style={styles.mRemark}>Passed</Text>
                  </View>
                  <View style={styles.modalGradeItem}>
                    <Text style={styles.mQuarter}>2nd Quarter</Text>
                    <Text style={styles.mScore}>{selectedSubject.q2}</Text>
                    <Text style={styles.mRemark}>Passed</Text>
                  </View>
                  <View style={styles.modalGradeItem}>
                    <Text style={styles.mQuarter}>3rd Quarter</Text>
                    <Text style={styles.mScore}>{selectedSubject.q3}</Text>
                    <Text style={styles.mRemark}>Passed</Text>
                  </View>
                  <View style={styles.modalGradeItem}>
                    <Text style={styles.mQuarter}>4th Quarter</Text>
                    <Text style={styles.mScore}>{selectedSubject.q4}</Text>
                    <Text style={styles.mRemark}>Passed</Text>
                  </View>
                </View>

                <View style={styles.modalFinalBox}>
                  <Text style={styles.mfLabel}>Final Computed Rating</Text>
                  <Text style={styles.mfScore}>{selectedSubject.final}%</Text>
                  <Text style={styles.mfRemark}>Remarks: Officially Passed</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedSubject(null)}
              >
                <Text style={styles.modalCloseBtnText}>Close Breakdown</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  academicCard: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  academicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  schoolYearText: {
    fontSize: 12,
    color: colors.border,
    marginTop: 2,
  },
  gpaBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  gpaLabel: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: '600',
  },
  gpaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accent,
  },
  standingRow: {
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  standingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  standingText: {
    color: '#fff',
    fontSize: 12,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  listTip: {
    fontSize: 11,
    color: colors.textMuted,
  },
  subjectList: {
    gap: 10,
  },
  subjectCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWrap: {
    flex: 1,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  teacherName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  finalGradeBadge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  finalGradeVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.accent,
  },
  finalGradeLabel: {
    fontSize: 9,
    color: '#fff',
  },
  quartersRow: {
    flexDirection: 'row',
    gap: 6,
  },
  quarterBox: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  quarterLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  quarterVal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  modalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalBody: {
    marginBottom: spacing.lg,
  },
  gradeGridModal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.md,
  },
  modalGradeItem: {
    width: '48%',
    backgroundColor: colors.inputBg,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  mQuarter: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  mScore: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 2,
  },
  mRemark: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
  },
  modalFinalBox: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  mfLabel: {
    color: colors.border,
    fontSize: 12,
  },
  mfScore: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 4,
  },
  mfRemark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalCloseBtn: {
    backgroundColor: colors.inputBg,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
});
