// app/(parent)/dashboard.jsx - Parent Portal Dashboard
import React, { useState } from 'react';
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

export default function ParentDashboard() {
  const router = useRouter();
  const { userData, user, logout } = useAuth();
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);

  const displayName = userData?.fullName || userData?.firstName || user?.email?.split('@')[0] || 'Parent';

  const children = [
    {
      name: 'Juan Dela Cruz',
      grade: 'Grade 7 - Diamond',
      lrn: '123456789012',
      attendance: '98%',
      averageGrade: '90.25%',
      standing: 'With Honors',
      status: 'Officially Enrolled',
    },
    {
      name: 'Maria Dela Cruz',
      grade: 'Grade 9 - Ruby',
      lrn: '123456789013',
      attendance: '95%',
      averageGrade: '88.50%',
      standing: 'Good Standing',
      status: 'Officially Enrolled',
    },
  ];

  const currentChild = children[selectedChildIndex] || children[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Parent Greeting Card */}
      <View style={[styles.parentHeaderCard, shadows.sm]}>
        <View style={styles.parentAvatar}>
          <Text style={styles.parentAvatarText}>{displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.parentInfo}>
          <Text style={styles.parentGreeting}>Welcome,</Text>
          <Text style={styles.parentName}>{displayName}</Text>
          <Text style={styles.parentRole}>Verified Parent / Guardian</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Logout', 'Log out of parent portal?', [
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

      {/* Children Selector */}
      <Text style={styles.heading}>Your Children ({children.length})</Text>
      <View style={styles.childrenRow}>
        {children.map((child, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.childChip, selectedChildIndex === idx && styles.childChipActive]}
            onPress={() => setSelectedChildIndex(idx)}
          >
            <Ionicons
              name="person-circle-outline"
              size={18}
              color={selectedChildIndex === idx ? '#fff' : colors.primary}
            />
            <Text style={[styles.childChipText, selectedChildIndex === idx && styles.childChipTextActive]}>
              {child.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Child Academic Overview Card */}
      <View style={[styles.childCard, shadows.md]}>
        <View style={styles.childCardHeader}>
          <View>
            <Text style={styles.childNameTitle}>{currentChild.name}</Text>
            <Text style={styles.childGradeText}>{currentChild.grade} • LRN: {currentChild.lrn}</Text>
          </View>
          <View style={styles.enrolledPill}>
            <Text style={styles.enrolledPillText}>{currentChild.status}</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{currentChild.attendance}</Text>
            <Text style={styles.statLbl}>Attendance Rate</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: colors.accent }]}>{currentChild.averageGrade}</Text>
            <Text style={styles.statLbl}>General Average</Text>
          </View>
        </View>

        <View style={styles.standingBadge}>
          <Ionicons name="ribbon" size={16} color={colors.accent} />
          <Text style={styles.standingBadgeText}>Academic Status: {currentChild.standing}</Text>
        </View>
      </View>

      {/* Parent Quick Actions */}
      <Text style={styles.heading}>Student Services</Text>
      <View style={styles.servicesGrid}>
        <TouchableOpacity
          style={[styles.serviceCard, shadows.sm]}
          onPress={() => Alert.alert('Quarterly Report', `Viewing complete report card for ${currentChild.name}. All 8 subjects passed.`)}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.successLight }]}>
            <Ionicons name="document-text-outline" size={22} color={colors.success} />
          </View>
          <Text style={styles.serviceTitle}>View Report Card</Text>
          <Text style={styles.serviceSub}>Quarterly grades & remarks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceCard, shadows.sm]}
          onPress={() => Alert.alert('Attendance Log', `${currentChild.name} has 98% attendance with 0 unexcused absences.`)}
        >
          <View style={[styles.iconBox, { backgroundColor: '#E0E7FF' }]}>
            <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
          </View>
          <Text style={styles.serviceTitle}>Attendance Log</Text>
          <Text style={styles.serviceSub}>Daily check-ins & records</Text>
        </TouchableOpacity>
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
  parentHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  parentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  parentAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  parentInfo: {
    flex: 1,
  },
  parentGreeting: {
    fontSize: 11,
    color: colors.border,
  },
  parentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  parentRole: {
    fontSize: 11,
    color: colors.accent,
    marginTop: 1,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  childrenRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  childChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  childChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  childChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  childChipTextActive: {
    color: '#fff',
  },
  childCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  childCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  childNameTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  childGradeText: {
    fontSize: 12,
    color: colors.border,
    marginTop: 2,
  },
  enrolledPill: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  enrolledPillText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  statLbl: {
    fontSize: 11,
    color: colors.border,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: '70%',
    alignSelf: 'center',
  },
  standingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  standingBadgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  serviceSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
