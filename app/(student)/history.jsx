// app/(student)/history.jsx - Enrollment History Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../src/firebase/config';
import { useAuth } from '../../src/context/AuthContext';
import { colors, spacing, shadows } from '../../src/theme';

export default function HistoryScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const fetchHistory = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'enrollments'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const items = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        let dateStr = 'Recently';
        if (data.createdAt?.toDate) {
          dateStr = data.createdAt.toDate().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        } else if (data.createdAt?.seconds) {
          dateStr = new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        }

        items.push({
          id: doc.id,
          ...data,
          formattedDate: dateStr,
        });
      });

      // Sort in memory by createdAt descending
      items.sort((a, b) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (new Date(a.createdAt || 0).getTime() || 0));
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (new Date(b.createdAt || 0).getTime() || 0));
        return timeB - timeA;
      });

      setHistoryList(items);
    } catch (err) {
      console.log('Error fetching enrollment history:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const sampleFallback = [
    {
      id: 'h1',
      schoolYear: '2026-2027',
      grade: 'Grade 7',
      strand: null,
      section: 'Diamond',
      status: 'Enrolled',
      formattedDate: 'Aug 15, 2026',
    },
  ];

  const displayList = historyList.length > 0 ? historyList : sampleFallback;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading history records...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Header Stat Card */}
      <View style={[styles.summaryCard, shadows.sm]}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{displayList.length}</Text>
          <Text style={styles.summaryLabel}>Total Records</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: colors.success }]}>
            {displayList.filter((d) => d.status === 'Enrolled' || d.status === 'Approved').length}
          </Text>
          <Text style={styles.summaryLabel}>Enrolled</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: colors.warning }]}>
            {displayList.filter((d) => d.status === 'Pending').length}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
      </View>

      <Text style={styles.timelineHeading}>Enrollment Timeline</Text>

      {/* Timeline Cards */}
      <View style={styles.timelineContainer}>
        {displayList.map((item, index) => {
          const isApp = item.status === 'Enrolled' || item.status === 'Approved';
          const isPend = item.status === 'Pending';

          return (
            <View key={item.id || index} style={styles.timelineRow}>
              {/* Left Line & Dot */}
              <View style={styles.trackCol}>
                <View
                  style={[
                    styles.trackDot,
                    { backgroundColor: isApp ? colors.success : isPend ? colors.warning : colors.danger },
                  ]}
                />
                {index < displayList.length - 1 && <View style={styles.trackLine} />}
              </View>

              {/* Card */}
              <View style={[styles.historyCard, shadows.sm]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.schoolYearTitle}>School Year {item.schoolYear || '2026-2027'}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: isApp
                          ? colors.successLight
                          : isPend
                          ? colors.warningLight
                          : colors.dangerLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        { color: isApp ? colors.success : isPend ? colors.warning : colors.danger },
                      ]}
                    >
                      {item.status || 'Pending'}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="school-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.detailText}>Grade: {item.grade || 'N/A'}</Text>
                  </View>
                  {item.strand && (
                    <View style={styles.detailItem}>
                      <Ionicons name="ribbon-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.detailText}>Track: {item.strand}</Text>
                    </View>
                  )}
                  {item.section && (
                    <View style={styles.detailItem}>
                      <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.detailText}>Section: {item.section}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.footerRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.dateText}>Submitted on {item.formattedDate}</Text>
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNum: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    height: '70%',
    alignSelf: 'center',
  },
  timelineHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  trackCol: {
    alignItems: 'center',
    marginRight: 12,
    width: 16,
  },
  trackDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
  },
  trackLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  historyCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  schoolYearTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailsRow: {
    gap: 4,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dateText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
