// app/(student)/requirements.jsx - Document Requirements Checklist
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, shadows } from '../../src/theme';

export default function RequirementsScreen() {
  const [requirements, setRequirements] = useState([
    {
      id: 'psa_birth_cert',
      title: 'PSA Birth Certificate',
      desc: 'Original or certified true copy of PSA/NSO birth certificate',
      required: true,
      submitted: true,
      fileName: 'juan_psa_birth_cert.pdf',
      date: '2026-06-12',
    },
    {
      id: 'form_138',
      title: 'SF9 / Form 138 (Report Card)',
      desc: 'Final report card with general average and passing remarks',
      required: true,
      submitted: true,
      fileName: 'form138_grade6_card.pdf',
      date: '2026-06-14',
    },
    {
      id: 'good_moral',
      title: 'Certificate of Good Moral',
      desc: 'Signed by the previous school principal or guidance counselor',
      required: true,
      submitted: false,
      fileName: null,
      date: null,
    },
    {
      id: 'id_pictures',
      title: '2x2 ID Pictures (2 Copies)',
      desc: 'Recent formal photo with white background and name tag',
      required: true,
      submitted: true,
      fileName: '2x2_id_picture.jpg',
      date: '2026-06-15',
    },
    {
      id: 'brgy_clearance',
      title: 'Barangay Residency Certificate',
      desc: 'Proof of residence within school catchment area',
      required: false,
      submitted: false,
      fileName: null,
      date: null,
    },
  ]);

  const total = requirements.length;
  const submittedCount = requirements.filter((r) => r.submitted).length;
  const missingCount = total - submittedCount;
  const percent = Math.round((submittedCount / total) * 100);

  const handleUpload = (id, title) => {
    Alert.alert(
      'Upload Document',
      `Select a document file (PDF or Image) to upload for ${title}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upload File',
          onPress: () => {
            setRequirements((prev) =>
              prev.map((r) =>
                r.id === id
                  ? {
                      ...r,
                      submitted: true,
                      fileName: `${id}_uploaded_${Date.now()}.pdf`,
                      date: new Date().toISOString().split('T')[0],
                    }
                  : r
              )
            );
            Alert.alert('Success', `${title} has been uploaded successfully!`);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Progress Card */}
      <View style={[styles.progressCard, shadows.sm]}>
        <View style={styles.progressTop}>
          <View>
            <Text style={styles.progressHeading}>Submission Progress</Text>
            <Text style={styles.progressSub}>Grade 7 Enrollment Documents</Text>
          </View>
          <Text style={styles.progressPercentage}>{percent}%</Text>
        </View>

        {/* Bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>

        {/* Counters */}
        <View style={styles.countersRow}>
          <View style={styles.counterItem}>
            <Text style={[styles.counterNum, { color: colors.success }]}>{submittedCount}</Text>
            <Text style={styles.counterLabel}>Submitted</Text>
          </View>
          <View style={styles.counterDivider} />
          <View style={styles.counterItem}>
            <Text style={[styles.counterNum, { color: colors.danger }]}>{missingCount}</Text>
            <Text style={styles.counterLabel}>Missing</Text>
          </View>
          <View style={styles.counterDivider} />
          <View style={styles.counterItem}>
            <Text style={styles.counterNum}>{total}</Text>
            <Text style={styles.counterLabel}>Total Required</Text>
          </View>
        </View>
      </View>

      {/* Status Notice Banner */}
      <View style={[styles.noticeBanner, missingCount > 0 ? styles.noticeWarning : styles.noticeSuccess]}>
        <Ionicons
          name={missingCount > 0 ? 'time-outline' : 'checkmark-circle-outline'}
          size={20}
          color={missingCount > 0 ? colors.warning : colors.success}
        />
        <Text style={[styles.noticeText, { color: missingCount > 0 ? '#92400E' : '#065F46' }]}>
          {missingCount > 0
            ? `You have ${missingCount} pending requirement(s). Please submit to finalize your enrollment.`
            : 'All required documents submitted! Awaiting registrar validation.'}
        </Text>
      </View>

      {/* Requirements List */}
      <Text style={styles.listHeader}>Document Checklist</Text>

      <View style={styles.reqList}>
        {requirements.map((req) => (
          <View key={req.id} style={[styles.reqCard, shadows.sm]}>
            <View style={styles.reqHeaderRow}>
              <View style={styles.titleArea}>
                <View style={styles.reqTitleWrap}>
                  <Text style={styles.reqTitle}>{req.title}</Text>
                  {req.required && <Text style={styles.reqBadge}>Required</Text>}
                </View>
                <Text style={styles.reqDesc}>{req.desc}</Text>
              </View>

              <View
                style={[
                  styles.statusIconCircle,
                  { backgroundColor: req.submitted ? colors.successLight : colors.dangerLight },
                ]}
              >
                <Ionicons
                  name={req.submitted ? 'checkmark' : 'close'}
                  size={16}
                  color={req.submitted ? colors.success : colors.danger}
                />
              </View>
            </View>

            {req.submitted ? (
              <View style={styles.submittedInfoBox}>
                <Ionicons name="document-attach" size={16} color={colors.primary} />
                <Text style={styles.fileNameText} numberOfLines={1}>
                  {req.fileName}
                </Text>
                <Text style={styles.uploadedDateText}>Uploaded: {req.date}</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={() => handleUpload(req.id, req.title)}
              >
                <Ionicons name="cloud-upload-outline" size={16} color={colors.primary} />
                <Text style={styles.uploadBtnText}>Upload Document</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  progressSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressPercentage: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.inputBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  countersRow: {
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingVertical: 10,
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  counterNum: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  counterLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  counterDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '70%',
    alignSelf: 'center',
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  noticeWarning: {
    backgroundColor: colors.warningLight,
  },
  noticeSuccess: {
    backgroundColor: colors.successLight,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  reqList: {
    gap: 10,
  },
  reqCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleArea: {
    flex: 1,
    marginRight: 10,
  },
  reqTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  reqTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  reqBadge: {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reqDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  statusIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittedInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  fileNameText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
  },
  uploadedDateText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.inputBg,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  uploadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});
