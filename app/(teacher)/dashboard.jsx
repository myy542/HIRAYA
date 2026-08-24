// app/(teacher)/dashboard.jsx - Teacher Portal Dashboard
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { colors, spacing, shadows } from '../../src/theme';

export default function TeacherDashboard() {
  const router = useRouter();
  const { userData, user, logout } = useAuth();

  const displayName = userData?.fullName || userData?.firstName || user?.email?.split('@')[0] || 'Teacher';

  const sections = [
    { id: '1', grade: 'Grade 7', section: 'Diamond', students: 45, subject: 'Mathematics' },
    { id: '2', grade: 'Grade 8', section: 'Ruby', students: 42, subject: 'Mathematics' },
    { id: '3', grade: 'Grade 9', section: 'Emerald', students: 40, subject: 'Advanced Algebra' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Teacher Profile Banner */}
      <View style={[styles.profileCard, shadows.sm]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.nameText}>{displayName}</Text>
          <Text style={styles.roleText}>Faculty / Subject Teacher</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Logout', 'Log out of teacher portal?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                  await logout();
                  router.replace('/');
                },
              },
            ]);
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, shadows.sm]}>
          <Text style={styles.statVal}>127</Text>
          <Text style={styles.statLbl}>Total Students</Text>
        </View>
        <View style={[styles.statBox, shadows.sm]}>
          <Text style={styles.statVal}>3</Text>
          <Text style={styles.statLbl}>Sections</Text>
        </View>
        <View style={[styles.statBox, shadows.sm]}>
          <Text style={styles.statVal}>96%</Text>
          <Text style={styles.statLbl}>Attendance</Text>
        </View>
      </View>

      {/* Quick Tools */}
      <Text style={styles.heading}>Class Management</Text>
      <View style={styles.toolsRow}>
        <TouchableOpacity
          style={[styles.toolCard, shadows.sm]}
          onPress={() => Alert.alert('Attendance QR', 'QR Code generated for today\'s class attendance.')}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="qr-code-outline" size={22} color={colors.primary} />
          </View>
          <Text style={styles.toolTitle}>Attendance QR</Text>
          <Text style={styles.toolSub}>Scan & record student attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolCard, shadows.sm]}
          onPress={() => Alert.alert('Grades Encoder', 'Quarterly grade encoder module active.')}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.successLight }]}>
            <Ionicons name="create-outline" size={22} color={colors.success} />
          </View>
          <Text style={styles.toolTitle}>Encode Grades</Text>
          <Text style={styles.toolSub}>Input Q1-Q4 quarterly grades</Text>
        </TouchableOpacity>
      </View>

      {/* Assigned Sections */}
      <Text style={styles.heading}>Assigned Classes</Text>
      <View style={styles.sectionList}>
        {sections.map((sec) => (
          <View key={sec.id} style={[styles.sectionCard, shadows.sm]}>
            <View style={styles.secIcon}>
              <Ionicons name="people-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.secInfo}>
              <Text style={styles.secTitle}>{sec.grade} - {sec.section}</Text>
              <Text style={styles.secSub}>{sec.subject} • {sec.students} Students</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
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
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  profileText: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  roleText: {
    fontSize: 12,
    color: colors.border,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  statLbl: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  toolCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  toolSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionList: {
    gap: 10,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  secInfo: {
    flex: 1,
  },
  secTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  secSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
