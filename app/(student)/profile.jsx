// app/(student)/profile.jsx - Student Profile Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { updatePassword } from 'firebase/auth';
import { useAuth } from '../../src/context/AuthContext';
import { colors, spacing, shadows } from '../../src/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, userData, logout } = useAuth();

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);

  const displayName = userData?.fullName || userData?.firstName || user?.displayName || user?.email?.split('@')[0] || 'Student';
  const initial = displayName.charAt(0).toUpperCase();

  const handleUpdatePassword = async () => {
    if (!newPwd || newPwd.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long.');
      return;
    }
    if (newPwd !== confirmPwd) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }

    if (!user) return;

    setChangingPwd(true);
    try {
      await updatePassword(user, newPwd);
      setChangingPwd(false);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setShowPasswordSection(false);
      Alert.alert('Success', 'Your password has been updated successfully.');
    } catch (error) {
      setChangingPwd(false);
      Alert.alert('Password Update Failed', error.message || 'Please log in again before changing password.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out of your student portal?', [
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
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Student ID Profile Card */}
      <View style={[styles.idCard, shadows.md]}>
        <View style={styles.idCardHeader}>
          <View style={styles.schoolBadgeSmall}>
            <Text style={styles.schoolBadgeSmallText}>P</Text>
          </View>
          <View>
            <Text style={styles.idCardSchoolName}>PLACIDO L. SEÑOR NHS</Text>
            <Text style={styles.idCardSub}>STUDENT IDENTIFICATION CARD</Text>
          </View>
        </View>

        <View style={styles.idCardBody}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{initial}</Text>
          </View>
          <View style={styles.idCardDetails}>
            <Text style={styles.studentFullName}>{displayName}</Text>
            <Text style={styles.idNumberText}>LRN: {userData?.lrn || '123456789012'}</Text>
            <View style={styles.roleTag}>
              <Text style={styles.roleTagText}>OFFICIALLY ENROLLED</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Personal Information Section */}
      <Text style={styles.sectionHeading}>Personal Information</Text>
      <View style={[styles.infoCard, shadows.sm]}>
        <View style={styles.infoRow}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="mail-outline" size={16} color={colors.primary} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoVal}>{user?.email || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Birthdate</Text>
            <Text style={styles.infoVal}>{userData?.birthdate || 'August 15, 2009'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="male-female-outline" size={16} color={colors.primary} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoVal}>{userData?.gender || 'Male'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="school-outline" size={16} color={colors.primary} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>Current Grade & Section</Text>
            <Text style={styles.infoVal}>Grade 7 - Diamond</Text>
          </View>
        </View>
      </View>

      {/* Change Password Card */}
      <Text style={styles.sectionHeading}>Account Security</Text>
      <View style={[styles.infoCard, shadows.sm]}>
        <TouchableOpacity
          style={styles.toggleSecurityRow}
          onPress={() => setShowPasswordSection(!showPasswordSection)}
        >
          <View style={styles.securityIconRow}>
            <Ionicons name="key-outline" size={20} color={colors.primary} />
            <Text style={styles.securityTitle}>Change Account Password</Text>
          </View>
          <Ionicons
            name={showPasswordSection ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {showPasswordSection && (
          <View style={styles.pwdForm}>
            <View style={styles.pwdInputGroup}>
              <Text style={styles.pwdLabel}>New Password</Text>
              <TextInput
                style={styles.pwdInput}
                placeholder="Enter new password (min. 8 characters)"
                placeholderTextColor={colors.textMuted}
                value={newPwd}
                onChangeText={setNewPwd}
                secureTextEntry
              />
            </View>

            <View style={styles.pwdInputGroup}>
              <Text style={styles.pwdLabel}>Confirm New Password</Text>
              <TextInput
                style={styles.pwdInput}
                placeholder="Re-enter new password"
                placeholderTextColor={colors.textMuted}
                value={confirmPwd}
                onChangeText={setConfirmPwd}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.savePwdBtn}
              onPress={handleUpdatePassword}
              disabled={changingPwd}
            >
              {changingPwd ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.savePwdBtnText}>Update Password</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Logout Action */}
      <TouchableOpacity style={[styles.logoutBtn, shadows.sm]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={styles.logoutBtnText}>Log Out from Account</Text>
      </TouchableOpacity>
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
  idCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  idCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    marginBottom: 14,
  },
  schoolBadgeSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  schoolBadgeSmallText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  idCardSchoolName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  idCardSub: {
    fontSize: 9,
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  idCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLargeText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  idCardDetails: {
    flex: 1,
  },
  studentFullName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  idNumberText: {
    fontSize: 12,
    color: colors.border,
    marginBottom: 6,
  },
  roleTag: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  roleTagText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 1,
  },
  toggleSecurityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securityIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  pwdForm: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  pwdInputGroup: {
    marginBottom: 10,
  },
  pwdLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  pwdInput: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.text,
  },
  savePwdBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  savePwdBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.dangerLight,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutBtnText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
});
