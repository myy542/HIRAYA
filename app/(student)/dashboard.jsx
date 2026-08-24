// app/(student)/dashboard.jsx - Student Dashboard Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../src/firebase/config';
import { useAuth } from '../../src/context/AuthContext';
import { colors, spacing, shadows } from '../../src/theme';

export default function StudentDashboard() {
  const router = useRouter();
  const { user, userData } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [enrollments, setEnrollments] = useState([]);

  const fetchDashboardData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'enrollments'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const list = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));

      // Sort in memory by createdAt descending
      list.sort((a, b) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (new Date(a.createdAt || 0).getTime() || 0));
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (new Date(b.createdAt || 0).getTime() || 0));
        return timeB - timeA;
      });

      setEnrollments(list);
    } catch (err) {
      console.log('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const displayName = userData?.firstName || userData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Student';
  const initial = displayName.charAt(0).toUpperCase();
  const latest = enrollments[0] || null;
  const isEnrolled = latest && (latest.status === 'Enrolled' || latest.status === 'Approved');
  const isPending = latest && latest.status === 'Pending';
  const isNewStudent = enrollments.length <= 1;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading student dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Student Welcome Header Card */}
      <View style={[styles.welcomeCard, shadows.sm]}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.welcomeInfo}>
          <Text style={styles.greetingText}>Welcome back,</Text>
          <Text style={styles.studentNameText}>{displayName}!</Text>
          <View style={styles.studentTypePill}>
            <Ionicons name="star" size={12} color={colors.accent} />
            <Text style={styles.studentTypePillText}>
              {isNewStudent ? 'New Enrollee' : 'Continuing Student'}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Statistics Grid */}
      <View style={styles.statsGrid}>
        {/* Enrollment Status */}
        <View style={[styles.statCard, shadows.sm]}>
          <View style={styles.statHeaderRow}>
            <Text style={styles.statCardTitle}>Enrollment</Text>
            <Ionicons name="school-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.statMainVal}>{latest ? (latest.grade || 'Grade 7') : 'Not Enrolled'}</Text>
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: isEnrolled
                  ? colors.successLight
                  : isPending
                  ? colors.warningLight
                  : colors.border,
              },
            ]}
          >
            <Ionicons
              name="ellipse"
              size={8}
              color={isEnrolled ? colors.success : isPending ? colors.warning : colors.textMuted}
            />
            <Text
              style={[
                styles.statusPillText,
                { color: isEnrolled ? colors.success : isPending ? colors.warning : colors.textMuted },
              ]}
            >
              {latest?.status || 'No Record'}
            </Text>
          </View>
        </View>

        {/* Subjects */}
        <View style={[styles.statCard, shadows.sm]}>
          <View style={styles.statHeaderRow}>
            <Text style={styles.statCardTitle}>Subjects</Text>
            <Ionicons name="book-outline" size={18} color={colors.warning} />
          </View>
          <Text style={styles.statMainVal}>{latest ? 8 : 0}</Text>
          <Text style={styles.statSubText}>Curriculum Load</Text>
        </View>

        {/* Average Grade */}
        <View style={[styles.statCard, shadows.sm]}>
          <View style={styles.statHeaderRow}>
            <Text style={styles.statCardTitle}>Avg Grade</Text>
            <Ionicons name="star-outline" size={18} color={colors.success} />
          </View>
          <Text style={styles.statMainVal}>{latest ? '89.5%' : '--'}</Text>
          <Text style={styles.statSubText}>General Average</Text>
        </View>

        {/* Total Enrollments */}
        <View style={[styles.statCard, shadows.sm]}>
          <View style={styles.statHeaderRow}>
            <Text style={styles.statCardTitle}>Records</Text>
            <Ionicons name="time-outline" size={18} color="#4F46E5" />
          </View>
          <Text style={styles.statMainVal}>{enrollments.length}</Text>
          <Text style={styles.statSubText}>Total Applications</Text>
        </View>
      </View>

      {/* Quick Action Buttons */}
      <Text style={styles.sectionHeader}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={[styles.actionCard, shadows.sm]}
          onPress={() => router.push('/enrollment')}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="pencil" size={22} color={colors.primary} />
          </View>
          <Text style={styles.actionTitle}>Online Enrollment</Text>
          <Text style={styles.actionSub}>Submit or re-enroll for new SY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, shadows.sm]}
          onPress={() => router.push('/(student)/schedule')}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: '#E0E7FF' }]}>
            <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
          </View>
          <Text style={styles.actionTitle}>Class Schedule</Text>
          <Text style={styles.actionSub}>View timetable and teachers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, shadows.sm]}
          onPress={() => router.push('/(student)/grades')}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: colors.successLight }]}>
            <Ionicons name="school-outline" size={22} color={colors.success} />
          </View>
          <Text style={styles.actionTitle}>My Grades</Text>
          <Text style={styles.actionSub}>Check quarterly report card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, shadows.sm]}
          onPress={() => router.push('/(student)/requirements')}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: colors.dangerLight }]}>
            <Ionicons name="document-attach-outline" size={22} color={colors.danger} />
          </View>
          <Text style={styles.actionTitle}>Requirements</Text>
          <Text style={styles.actionSub}>Upload PSA, Form 138, etc.</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Enrollment Activities */}
      <Text style={styles.sectionHeader}>Recent Activity</Text>
      <View style={[styles.activityCard, shadows.sm]}>
        {enrollments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={36} color={colors.textMuted} />
            <Text style={styles.emptyText}>No enrollment applications yet</Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push('/enrollment')}
            >
              <Text style={styles.emptyBtnText}>Start Enrollment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          enrollments.slice(0, 3).map((item, idx) => (
            <View key={item.id || idx} style={styles.activityItem}>
              <View
                style={[
                  styles.activityDot,
                  {
                    backgroundColor:
                      item.status === 'Enrolled' || item.status === 'Approved'
                        ? colors.success
                        : item.status === 'Pending'
                        ? colors.warning
                        : colors.danger,
                  },
                ]}
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  SY {item.schoolYear || '2026-2027'} - {item.grade || 'Grade 7'}
                </Text>
                <Text style={styles.activitySub}>
                  {item.strand ? `Track: ${item.strand}` : 'Junior High'} • Status: {item.status || 'Pending'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </View>
          ))
        )}
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  welcomeInfo: {
    flex: 1,
  },
  greetingText: {
    fontSize: 12,
    color: colors.border,
  },
  studentNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  studentTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  studentTypePillText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statMainVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statSubText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.lg,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  actionSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 8,
    marginBottom: 12,
  },
  emptyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  activitySub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
