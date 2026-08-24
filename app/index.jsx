// app/index.jsx - Portal Gateway & Landing Screen
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';
import { colors, spacing, shadows } from '../src/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { user, userData } = useAuth();

  useEffect(() => {
    if (user && userData) {
      const role = (userData.role || 'Student').toLowerCase();
      if (role === 'teacher') {
        router.replace('/(teacher)/dashboard');
      } else if (role === 'parent' || role === 'parents') {
        router.replace('/(parent)/dashboard');
      } else {
        router.replace('/(student)/dashboard');
      }
    }
  }, [user, userData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Bar */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandTitle}>PLSNHS</Text>
              <Text style={styles.brandSubtitle}>Placido L. Señor NHS</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginHeaderBtn}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginHeaderBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.heroLogoImage}
            resizeMode="contain"
          />
          <View style={styles.tagBadge}>
            <Ionicons name="sparkles" size={14} color={colors.accent} />
            <Text style={styles.tagBadgeText}>Official Enrollment & Academic Portal</Text>
          </View>
          <Text style={styles.heroTitle}>Welcome to PLSNHS</Text>
          <Text style={styles.heroSubtitle}>
            Your seamless gateway to high school enrollment, grades tracking, class schedules, and academic management.
          </Text>

          {/* Action Buttons */}
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity
              style={[styles.primaryBtn, shadows.md]}
              onPress={() => router.push('/enrollment')}
            >
              <Ionicons name="pencil" size={18} color={colors.primary} />
              <Text style={styles.primaryBtnText}>Enroll Online Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryBtn, shadows.sm]}
              onPress={() => router.push('/login')}
            >
              <Ionicons name="log-in-outline" size={18} color="#fff" />
              <Text style={styles.secondaryBtnText}>Access Portal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics Banner */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>500+</Text>
            <Text style={styles.statLabel}>Students Enrolled</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>50+</Text>
            <Text style={styles.statLabel}>Faculty & Staff</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>98%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Why Choose PLSNHS Portal?</Text>
          <Text style={styles.sectionSub}>Everything you need for your high school journey in one place</Text>

          <View style={styles.featureGrid}>
            <View style={[styles.featureCard, shadows.sm]}>
              <View style={[styles.iconCircle, { backgroundColor: colors.successLight }]}>
                <Ionicons name="document-text" size={24} color={colors.success} />
              </View>
              <Text style={styles.featureTitle}>Easy Online Enrollment</Text>
              <Text style={styles.featureDesc}>
                Complete student admission form with real-time requirement tracking and submission verification.
              </Text>
            </View>

            <View style={[styles.featureCard, shadows.sm]}>
              <View style={[styles.iconCircle, { backgroundColor: colors.accentLight }]}>
                <Ionicons name="calendar" size={24} color={colors.warning} />
              </View>
              <Text style={styles.featureTitle}>Class Schedules</Text>
              <Text style={styles.featureDesc}>
                View daily and weekly timetables, assigned subject teachers, and room assignments.
              </Text>
            </View>

            <View style={[styles.featureCard, shadows.sm]}>
              <View style={[styles.iconCircle, { backgroundColor: '#E0E7FF' }]}>
                <Ionicons name="school" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.featureTitle}>Quarterly Grades & Progress</Text>
              <Text style={styles.featureDesc}>
                Monitor subject performance, general averages, and quarterly report cards instantly.
              </Text>
            </View>

            <View style={[styles.featureCard, shadows.sm]}>
              <View style={[styles.iconCircle, { backgroundColor: colors.dangerLight }]}>
                <Ionicons name="shield-checkmark" size={24} color={colors.danger} />
              </View>
              <Text style={styles.featureTitle}>Secure Cloud System</Text>
              <Text style={styles.featureDesc}>
                Powered by Firebase with protected authentication for students, parents, and teachers.
              </Text>
            </View>
          </View>
        </View>

        {/* About School Section */}
        <View style={[styles.aboutCard, shadows.md]}>
          <View style={styles.aboutHeaderRow}>
            <Ionicons name="information-circle" size={24} color={colors.accent} />
            <Text style={styles.aboutTitle}>About Placido L. Señor NHS</Text>
          </View>
          <Text style={styles.aboutText}>
            Placido L. Señor National High School is committed to delivering quality basic secondary education (Junior & Senior High School). We provide holistic academic tracks (GAS, HUMMS, TVL-Cookery) to equip students with knowledge and life skills.
          </Text>

          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.bulletText}>Paperless admission and requirement submission</Text>
            </View>
            <View style={styles.bulletItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.bulletText}>Real-time status alerts and enrollment confirmations</Text>
            </View>
            <View style={styles.bulletItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.bulletText}>Accessible anywhere on iOS, Android, and Web</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Placido L. Señor National High School. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  heroLogoImage: {
    width: 90,
    height: 90,
    marginBottom: spacing.md,
    borderRadius: 45,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },
  loginHeaderBtn: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  loginHeaderBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    textAlign: 'center',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  tagBadgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.border,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
    maxWidth: 500,
  },
  heroButtonsRow: {
    flexDirection: width > 500 ? 'row' : 'column',
    gap: 12,
    width: '100%',
    maxWidth: 450,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: spacing.md,
    ...shadows.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '70%',
    alignSelf: 'center',
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  featureGrid: {
    gap: 14,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryLight,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  aboutCard: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  aboutHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  aboutText: {
    fontSize: 13,
    color: colors.border,
    lineHeight: 20,
    marginBottom: 14,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletText: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
});
